import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync("_site/index.html", "utf8");
assert.ok(html.includes('webawesome@3.14.0/styles/themes/default.css'), "Web Awesome theme missing");
assert.ok(html.includes('webawesome@3.14.0/webawesome.loader.js'), "Web Awesome loader missing");
assert.match(html, /<wa-callout[^>]*class="notice"[^>]*>.*<\/wa-callout>/s, "home callout missing");
assert.ok(html.includes('<wa-tag variant="neutral" appearance="outlined" size="s">非公式</wa-tag>'), "header tag missing");
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
  "Eleventy v3 日本語ガイド",
  "非公式",
  "CMSは使いません。",
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
  assert.ok(article.includes('aria-label="パンくずリスト"'), `missing breadcrumbs: ${route}`);
  assert.ok(article.includes('<li><a href="/">ホーム</a></li>'), `missing home crumb: ${route}`);
  assert.ok(article.includes('aria-label="目次"'), `missing sidebar: ${route}`);
  assert.ok(article.includes(`href="${route}" aria-current="page"`), `missing current page in sidebar: ${route}`);
  for (const section of routes) {
    assert.ok(article.includes(`href="${section}"`), `sidebar lacks ${section} on ${route}`);
  }
  if (route !== "/v4/") {
    const main = article.match(/<main id="main" class="content">([\s\S]*?)<\/main>/)?.[1];
    assert.ok(main && !/Build Awesome|\bv4\b/.test(main), `v4 comparison leaked into v3 article: ${route}`);
  }
}
const comparison = readFileSync("_site/v4/index.html", "utf8");
const concepts = readFileSync("_site/concepts/index.html", "utf8");
assert.match(concepts, /<figure class="build-flow">[\s\S]*?<ol role="list">[\s\S]*?Eleventyでビルド[\s\S]*?<code>_site\/<\/code>[\s\S]*?<\/ol>[\s\S]*?<\/figure>/, "v3 build diagram missing");
const configuration = readFileSync("_site/configuration/index.html", "utf8");
assert.match(configuration, /<h2>コードの読み方<\/h2>[\s\S]*?<h2>設定で変えられること<\/h2>[\s\S]*?<h3>入出力先と対象ファイル<\/h3>[\s\S]*?<h2>設定ファイルの外で指定すること<\/h2>/, "configuration syntax and effects are not separated");
for (const marker of ["eleventy.config.mjs", "addPassthroughCopy", "markdownTemplateEngine", "templateFormats", "addGlobalData", "addCollection", "addFilter", "addShortcode", "addTransform", "addWatchTarget", "eleventy.before", "フロントマターやデータファイル"]) {
  assert.ok(configuration.includes(marker), `configuration guide lacks ${marker}`);
}
for (const marker of ["Eleventy v3とBuild Awesome v4の違い", "@11ty/eleventy", "@awesome.me/buildawesome", "Node.js 18以上", "Node.js 22.15以上", "WebCはどちらもプラグインを使う"]) {
  assert.ok(comparison.includes(marker), `v4 comparison lacks ${marker}`);
}
const webc = readFileSync("_site/templates/webc/index.html", "utf8");
assert.match(webc, /<li><a href="\/templates\/">テンプレート<\/a><\/li>\s*<li aria-current="page">WebCの使い方<\/li>/);
assert.ok(!html.includes('aria-label="パンくずリスト"'), "home should not show breadcrumbs");
assert.ok(html.includes('href="/v4/"'), "v4 page not linked");
assert.ok(readFileSync("_site/templates/index.html", "utf8").includes('href="/templates/webc/"'), "WebC guide not linked");
assert.ok(readFileSync("_site/templates/index.html", "utf8").includes("{{ content | safe }}"), "Nunjucks code example was interpolated");
console.log(`Generated homepage and ${routes.length + 2} article checks passed.`);
