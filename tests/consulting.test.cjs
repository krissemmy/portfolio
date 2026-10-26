const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

// Compile the actual route in isolation; no real provider calls or credentials.
function load(file, overrides = {}, env = {}, globals = {}) {
	const filename = path.resolve(root, file);
	const exports = {};
	const code = ts.transpileModule(readFileSync(filename, "utf8"), {
		compilerOptions: {
			module: ts.ModuleKind.CommonJS,
			target: ts.ScriptTarget.ES2022,
		},
	}).outputText;
	vm.runInNewContext(
		code,
		{
			exports,
			Request,
			Response,
			URL,
			Uint8Array,
			TextDecoder,
			process: { env },
			console: { warn() {}, error() {} },
			fetch: globals.fetch ?? fetch,
			require(name) {
				if (overrides[name]) return overrides[name];
				const target = name.startsWith("@/")
					? path.join(root, name.slice(2))
					: path.resolve(path.dirname(filename), name);
				return load(`${target}.ts`, overrides, env, globals);
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

function route(send, configured = true, extraEnv = {}) {
	const env = {
		...(configured ? { RESEND_API_KEY: "test-only-key" } : {}),
		CONSULTING_RATE_LIMITER: {
			async limit() {
				return { success: true };
			},
		},
		...extraEnv,
	};
	const worker = load("src/worker.ts", {}, env, {
		async fetch(_url, init) {
			const payload = JSON.parse(init.body);
			const result = await send(payload);
			if (result?.error) {
				return new Response(
					JSON.stringify({
						name: "validation_error",
						message: result.error.message || "Rejected",
					}),
					{ status: 422, headers: { "content-type": "application/json" } },
				);
			}
			return new Response(JSON.stringify({ id: "email_test" }), {
				status: 200,
				headers: { "content-type": "application/json" },
			});
		},
	}).default;
	return (request) => worker.fetch(request, env);
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

test("the rate limit blocks delivery and other API methods stay closed", async () => {
	let calls = 0;
	const limited = route(
		async () => {
			calls += 1;
			return { error: null };
		},
		true,
		{
			CONSULTING_RATE_LIMITER: {
				async limit() {
					return { success: false };
				},
			},
		},
	);
	const response = await limited(request(minimum));
	assert.equal(response.status, 429);
	assert.equal((await response.json()).ok, undefined);
	assert.equal(response.headers.get("retry-after"), "60");
	assert.equal(calls, 0);

	const worker = load("src/worker.ts", {}, {}, {
		fetch() {
			throw new Error("no email");
		},
	}).default;
	assert.equal(
		(await worker.fetch(new Request("https://example.com/api/consulting"))).status,
		405,
	);
	assert.equal(
		(
			await worker.fetch(
				new Request("https://example.com/api/incr", {
					method: "POST",
					body: "{}",
				}),
			)
		).status,
		404,
	);
});

test("page metadata points at one pre-rendered png per path", () => {
	const { ogImageSlug, pageMetadata } = load("util/metadata.ts");
	assert.equal(ogImageSlug("/"), "home");
	assert.equal(ogImageSlug("/projects"), "projects");
	assert.equal(ogImageSlug("/projects/krainode/"), "krainode");
	const home = pageMetadata("Cloud Platform / DevOps Engineer", "d", "/");
	assert.equal(
		home.openGraph.images[0].url,
		"https://www.krissemmy.com/og/home.png",
	);
	assert.equal(home.twitter.images[0], "https://www.krissemmy.com/og/home.png");
	const project = pageMetadata("T", "d", "/projects/krainode");
	assert.equal(
		project.openGraph.images[0].url,
		"https://www.krissemmy.com/og/krainode.png",
	);
});
