import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "og");

// Titles match the pageMetadata() / consulting metadata arguments.
// Slugs match ogImageSlug() in util/metadata.ts.
const staticPages = [
	{ slug: "home", kind: "page", title: "Cloud Platform / DevOps Engineer" },
	{ slug: "projects", kind: "page", title: "Selected Work & Project Archive" },
	{ slug: "consulting", kind: "consulting", title: "" },
	{
		slug: "resume",
		kind: "page",
		title: "DevOps / Cloud Infrastructure & Technical Support Resumes",
	},
	{
		slug: "contact",
		kind: "page",
		title: "Contact for Infrastructure Roles & Consulting",
	},
];

function unquote(value) {
	const trimmed = value.trim().replace(/,$/, "");
	if (
		(trimmed.startsWith('"') && trimmed.endsWith('"')) ||
		(trimmed.startsWith("'") && trimmed.endsWith("'"))
	) {
		return trimmed.slice(1, -1);
	}
	return trimmed;
}

function readField(source, key) {
	const match = source.match(new RegExp(`^\\s*${key}:\\s*(.+)$`, "m"));
	return match ? unquote(match[1]) : "";
}

function frontmatter(source) {
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) throw new Error("MDX file is missing frontmatter");
	const data = {};
	for (const line of match[1].split(/\r?\n/)) {
		const field = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
		if (!field) continue;
		data[field[1]] = unquote(field[2]);
	}
	return data;
}

async function projectPages() {
	const dir = path.join(root, "content", "projects");
	const files = [];
	async function walk(current) {
		for (const entry of await readdir(current, { withFileTypes: true })) {
			const full = path.join(current, entry.name);
			if (entry.isDirectory()) await walk(full);
			else if (entry.name.endsWith(".mdx")) files.push(full);
		}
	}
	await walk(dir);
	const pages = [];
	for (const file of files.sort()) {
		const data = frontmatter(await readFile(file, "utf8"));
		if (data.published !== "true") continue;
		const slug = path
			.relative(dir, file)
			.replace(/\.mdx$/, "")
			.split(path.sep)
			.join("/");
		if (!data.title) throw new Error(`${file} is missing a title`);
		pages.push({ slug, kind: "page", title: data.title });
	}
	return pages;
}

function pageCard(title, name, hostname) {
	const shown = title.slice(0, 160) || "Cloud Platform / DevOps Engineer";
	return React.createElement(
		"div",
		{
			style: {
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				padding: 72,
				background: "#09090b",
				color: "#f4f4f5",
			},
		},
		React.createElement(
			"div",
			{ style: { fontSize: 30, color: "#a1a1aa" } },
			name,
		),
		React.createElement(
			"div",
			{ style: { fontSize: shown.length > 70 ? 48 : 64, lineHeight: 1.15 } },
			shown,
		),
		React.createElement(
			"div",
			{
				style: {
					fontSize: 24,
					color: "#a1a1aa",
					borderTop: "1px solid #3f3f46",
					paddingTop: 24,
				},
			},
			hostname,
		),
	);
}

function consultingCard(name) {
	return React.createElement(
		"div",
		{
			style: {
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				padding: "70px",
				background: "#09090b",
				color: "#f4f4f5",
			},
		},
		React.createElement(
			"div",
			{ style: { fontSize: 24, color: "#a1a1aa" } },
			"INFRASTRUCTURE FOR EARLY-STAGE STARTUPS",
		),
		React.createElement(
			"div",
			{ style: { display: "flex", flexDirection: "column" } },
			React.createElement(
				"div",
				{ style: { fontSize: 70, fontWeight: 700 } },
				"Lean. Reliable. Recoverable.",
			),
			React.createElement(
				"div",
				{ style: { fontSize: 32, marginTop: 24, color: "#a1a1aa" } },
				"Before you need a full-time infrastructure engineer.",
			),
		),
		React.createElement(
			"div",
			{
				style: {
					display: "flex",
					justifyContent: "space-between",
					borderTop: "1px solid #3f3f46",
					paddingTop: 24,
					fontSize: 24,
				},
			},
			React.createElement("span", null, name),
			React.createElement("span", null, "krissemmy.com/consulting"),
		),
	);
}

function pngSize(bytes) {
	return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

async function render(element) {
	const image = new ImageResponse(element, { width: 1200, height: 630 });
	const bytes = Buffer.from(await image.arrayBuffer());
	const size = pngSize(bytes);
	if (size.width !== 1200 || size.height !== 630) {
		throw new Error(`expected 1200x630, got ${size.width}x${size.height}`);
	}
	return bytes;
}

const profileSource = await readFile(path.join(root, "data", "profile.ts"), "utf8");
const name = readField(profileSource, "name");
const siteUrl = readField(profileSource, "siteUrl");
if (!name || !siteUrl) throw new Error("Could not read profile name and siteUrl");
const hostname = new URL(siteUrl).hostname;

const pages = [...staticPages, ...(await projectPages())];
const seen = new Set();
for (const page of pages) {
	if (!/^[A-Za-z0-9/_-]+$/.test(page.slug)) {
		throw new Error(`Unsafe OG slug: ${page.slug}`);
	}
	if (seen.has(page.slug)) throw new Error(`Duplicate OG slug: ${page.slug}`);
	seen.add(page.slug);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const page of pages) {
	const element =
		page.kind === "consulting"
			? consultingCard(name)
			: pageCard(page.title, name, hostname);
	const bytes = await render(element);
	const file = path.join(outDir, `${page.slug}.png`);
	await mkdir(path.dirname(file), { recursive: true });
	await writeFile(file, bytes);
}

console.log(`Wrote ${pages.length} Open Graph images to public/og`);
