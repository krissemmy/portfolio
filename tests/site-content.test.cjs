const assert = require("node:assert/strict");
const { readdirSync, readFileSync } = require("node:fs");
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
