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
  assert.ok(html.includes(`href=\"${route}\"`), `missing section link: ${route}`);
  assert.ok(readFileSync(`_site${route}index.html`, "utf8").includes("準備中"), `missing honest placeholder: ${route}`);
}
console.log(`Generated homepage and ${routes.length} section checks passed.`);
