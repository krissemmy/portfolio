const assert = require("node:assert/strict");
const { existsSync, readdirSync, readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

test("every project declares a work context and can be included in the archive", () => {
  const kinds = new Set(["Professional work", "Client engagement", "Personal project", "Personal lab", "Tutorial", "Open-source contribution"]);
  const files = readdirSync(path.join(root, "content/projects")).filter(file => file.endsWith(".mdx"));
  for (const file of files) {
    const source = readFileSync(path.join(root, "content/projects", file), "utf8");
    const frontmatter = source.split(/^---\s*$/m)[1];
    assert.ok(frontmatter, `${file}: frontmatter must have its own closing delimiter`);
    const kind = frontmatter.match(/^kind: (.+)$/m)?.[1];
    assert.ok(kinds.has(kind), `${file}: missing or unrecognized work context`);
    assert.match(frontmatter, /^published: (true|false)$/m, `${file}: explicit publication status required`);
  }
});

test("sitemap includes public pages and published projects, excluding drafts", () => {
  const exports = {};
  const source = readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, {
    exports,
    URL,
    require(name) {
      if (name === "contentlayer/generated") return { allProjects: [
        { slug: "published-work", published: true },
        { slug: "private-draft", published: false },
        { slug: "not-approved" },
      ] };
      if (name === "@/data/profile") return { profile: { siteUrl: "https://www.krissemmy.com" } };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  const urls = Array.from(exports.default(), item => item.url);
  assert.deepEqual(urls, [
    "https://www.krissemmy.com/",
    "https://www.krissemmy.com/projects",
    "https://www.krissemmy.com/consulting",
    "https://www.krissemmy.com/resume",
    "https://www.krissemmy.com/contact",
    "https://www.krissemmy.com/projects/published-work",
  ]);
});

test("static export drops the edge image route, ISR, and the page-view counter", () => {
  for (const file of [
    "pages/api/incr.ts",
    "app/api/consulting/route.ts",
    "app/og/route.tsx",
    "app/consulting/opengraph-image.tsx",
    "app/projects/[slug]/view.tsx",
  ]) {
    assert.equal(existsSync(path.join(root, file)), false, file);
  }
  assert.doesNotMatch(readFileSync(path.join(root, "app/projects/page.tsx"), "utf8"), /revalidate/);
  assert.doesNotMatch(readFileSync(path.join(root, "app/projects/[slug]/page.tsx"), "utf8"), /revalidate/);
  assert.match(readFileSync(path.join(root, "app/consulting/page.tsx"), "utf8"), /\/og\/consulting\.png/);
  assert.doesNotMatch(readFileSync(path.join(root, "app/consulting/page.tsx"), "utf8"), /opengraph-image/);
  const config = readFileSync(path.join(root, "next.config.mjs"), "utf8");
  assert.match(config, /output:\s*"export"/);
  assert.match(config, /unoptimized:\s*true/);
});
