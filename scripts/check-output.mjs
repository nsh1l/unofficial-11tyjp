import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync("_site/index.html", "utf8");
const routes = [
  "/start/",
  "/setup/",
  "/concepts/",
  "/templates/",
  "/content/",
  "/configuration/",
  "/publish/",
  "/troubleshooting/",
];
for (const marker of [
  "Eleventy / Build Awesome",
  "非公式",
  "CMSを使わず",
  "Cloudflare Pages",
  "XServer",
  "本文 CC BY 4.0",
]) {
  assert.ok(html.includes(marker), `missing generated marker: ${marker}`);
}
for (const route of routes) {
  assert.ok(html.includes(`href="${route}"`), `missing section link: ${route}`);
}
for (const route of [...routes, "/templates/webc/", "/v4/"]) {
  const article = readFileSync(`_site${route}index.html`, "utf8");
  assert.ok(article.includes("<h1>"), `missing article heading: ${route}`);
  assert.ok(!article.includes("準備中"), `unfinished article: ${route}`);
}
assert.ok(html.includes('href="/v4/"'), "v4 page not linked");
assert.ok(readFileSync("_site/templates/index.html", "utf8").includes('href="/templates/webc/"'), "WebC guide not linked");
assert.ok(readFileSync("_site/templates/index.html", "utf8").includes("{{ content | safe }}"), "Nunjucks code example was interpolated");
console.log(`Generated homepage and ${routes.length + 2} article checks passed.`);
