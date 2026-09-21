const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

// Compile the actual route in isolation; no real provider calls or credentials.
function load(file, overrides = {}, env = {}) {
	const filename = path.resolve(root, file);
	const exports = {};
	const code = ts.transpileModule(readFileSync(filename, "utf8"), {
		compilerOptions: {
			module: ts.ModuleKind.CommonJS,
			target: ts.ScriptTarget.ES2020,
		},
	}).outputText;
	vm.runInNewContext(
		code,
		{
			exports,
			Request,
			Response,
			URL,
			process: { env },
			console: { warn() {}, error() {} },
			require(name) {
				if (overrides[name]) return overrides[name];
				const target = name.startsWith("@/")
					? path.join(root, name.slice(2))
					: path.resolve(path.dirname(filename), name);
				return load(`${target}.ts`, overrides, env);
			},
		},
		{ filename },
	);
	return exports;
}

const { validateInquiry } = load("util/consulting-inquiry.ts");
const minimum = {
	name: "Founder",
	email: "founder@example.com",
	company: "Example",
};

test("minimum inquiry accepts omitted optional answers and trims text", () => {
	const result = validateInquiry({ ...minimum, name: " Founder " });
	assert.equal(result.ok, true);
	assert.equal(result.fields.name, "Founder");
	assert.equal(result.fields.message, "");
});

test("invalid JSON shapes and non-string inputs fail without throwing", () => {
	for (const body of [
		null,
		[],
		true,
		"text",
		1,
		{ ...minimum, name: 5 },
		{ ...minimum, email: {} },
		{ ...minimum, website: null },
		{ ...minimum, message: [] },
	]) {
		assert.equal(validateInquiry(body).ok, false);
	}
});

test("required values, email, lengths, URLs, and option boundaries are enforced", () => {
	for (const change of [
		{ company: " " },
		{ name: "" },
		{ email: "bad-address" },
		{ message: "a".repeat(5001) },
		{ name: "a".repeat(101) },
		{ name: "Founder\nInjected" },
		{ website: "javascript:alert(1)" },
		{ website: "example.com" },
		{ teamSize: "1000" },
		{ stage: [] },
	]) {
		assert.equal(
			validateInquiry({ ...minimum, ...change }).ok,
			false,
			JSON.stringify(change),
		);
	}
	assert.equal(
		validateInquiry({
			...minimum,
			message: "a".repeat(5000),
			website: "https://example.com",
		}).ok,
		true,
	);
});

function route(send, configured = true) {
	return load(
		"app/api/consulting/route.ts",
		{
			resend: {
				Resend: class {
					emails = { send };
				},
			},
		},
		configured ? { RESEND_API_KEY: "test-only-key" } : {},
	).POST;
}

function request(body) {
	return new Request("https://example.com/api/consulting", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(body),
	});
}

test("all qualification fields reach the provider, with a reply address", async () => {
	let sent;
	const POST = route(async (payload) => {
		sent = payload;
		return { error: null };
	});
	const response = await POST(
		request({
			...minimum,
			website: "https://example.com",
			teamSize: "6–10",
			stage: "Seed",
			productStatus: "Paying customers",
			concern: "Backups/recovery",
			monthlySpend: "$100–$300",
			infrastructure: "Render, Supabase",
			message: "Can we restore?",
		}),
	);
	assert.equal(response.status, 200);
	assert.equal((await response.json()).ok, true);
	assert.equal(sent.reply_to, minimum.email);
	for (const value of [
		"Company: Example",
		"https://example.com",
		"6–10",
		"Seed",
		"Paying customers",
		"Backups/recovery",
		"$100–$300",
		"Render, Supabase",
		"Can we restore?",
	])
		assert.ok(sent.text.includes(value), value);
});

test("malformed requests and honeypot submissions never call the provider", async () => {
	let calls = 0;
	const POST = route(async () => {
		calls += 1;
		return { error: null };
	});
	const malformed = new Request("https://example.com/api/consulting", {
		method: "POST",
		body: "{",
	});
	assert.equal((await POST(malformed)).status, 400);
	assert.equal((await POST(request(null))).status, 400);
	assert.equal((await POST(request({ ...minimum, company: "" }))).status, 400);
	assert.equal((await POST(request({ hp_check: "bot" }))).status, 200);
	assert.equal(calls, 0);
});

test("missing configuration and provider failures never report success", async () => {
	const unavailable = route(async () => {
		throw new Error("Must not send");
	}, false);
	assert.equal((await unavailable(request(minimum))).status, 503);
	for (const send of [
		async () => ({ error: { message: "Rejected" } }),
		async () => {
			throw new Error("Network failure");
		},
	]) {
		const response = await route(send)(request(minimum));
		assert.equal(response.status, 502);
		assert.equal((await response.json()).ok, undefined);
	}
});
