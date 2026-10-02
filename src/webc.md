---
title: WebCの使い方
summary: WebCプラグインを入れ、最初のページを作ります。
layout: base.njk
permalink: /templates/webc/
---
# WebCの使い方

WebCでは、HTMLに近い書き方で繰り返し使う部品を作れます。本文はMarkdownのままで、同じ案内枠やカードを何度も書くようになったらWebCを使えます。

## v3ではプラグインを入れる

Eleventy 3.1.6でWebCを使うには[公式プラグイン](https://www.11ty.dev/docs/languages/webc/)が必要です。npmなら `npm install --save-dev @11ty/eleventy-plugin-webc`、Bunなら `bun add -d @11ty/eleventy-plugin-webc` で入れます。次に `eleventy.config.mjs` へ追加します。

```js
import webcPlugin from "@11ty/eleventy-plugin-webc";
// 既存の設定関数内に追加
// eleventyConfig.addPlugin(webcPlugin);
```

このサイトの設定なら、`eleventyConfig.addPassthroughCopy(...)` の近くに `eleventyConfig.addPlugin(webcPlugin);` を置きます。パッケージを入れるだけでは `.webc` は処理されません。

## まずはWebCページを1つ作る

入力ディレクトリに `hello.webc` を作ります。このサイトと同じ構成なら `src/hello.webc` です。

```html
<!doctype html>
<html lang="ja">
  <head><meta charset="utf-8"><title>WebCの試作</title></head>
  <body><h1>WebCの試作</h1><p>まずはHTMLで書けます。</p></body>
</html>
```

`bun run build` または `npm run build` を実行します。このサイトの設定では `_site/hello/index.html` が出力されます。まずブラウザーでこの1ページを開いてみてください。

## 同じHTMLが増えたら部品にする

部品の登録方法やデータの渡し方は[公式のWebC解説](https://www.11ty.dev/docs/languages/webc/)を参照してください。共通のヘッダーやフッターだけなら、Nunjucksのレイアウトで間に合います。

Build Awesome v4でもWebCにはプラグインを使います。v4を試すときは、v3向けの手順ではなく[v4のWebC文書](https://build.awesome.me/docs/languages/webc/)を参照してください。
