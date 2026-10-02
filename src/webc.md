---
title: WebCの使い方
summary: HTMLに近い記法で部品を作る場合の導入手順です。
layout: base.njk
permalink: /templates/webc/
---
# WebCの使い方

WebCは、HTMLの書き方を土台に、繰り返し使う部品をまとめる仕組みです。記事本文はMarkdownのままにし、ページの一部で同じ見た目を使い回したくなったときに検討してください。使わないサイトには不要です。

## v3ではプラグインを入れる

Eleventy 3.1.6では[公式プラグイン](https://www.11ty.dev/docs/languages/webc/)を導入します。Node.js/npmなら `npm install --save-dev @11ty/eleventy-plugin-webc`、Bunなら `bun add -d @11ty/eleventy-plugin-webc`。既存の `eleventy.config.mjs` に次の2行を加えます。

```js
import webcPlugin from "@11ty/eleventy-plugin-webc";
// 既存の設定関数内に追加
// eleventyConfig.addPlugin(webcPlugin);
```

このリポジトリの設定関数なら `eleventyConfig.addPassthroughCopy(...)` の近くに `eleventyConfig.addPlugin(webcPlugin);` を置きます。インストールしただけでは `.webc` のビルドは始まりません。

## まずはWebCページを1つ作る

入力ディレクトリに `hello.webc` を作ります。

```html
<!doctype html>
<html lang="ja">
  <head><meta charset="utf-8"><title>WebCの試作</title></head>
  <body><h1>WebCの試作</h1><p>まずはHTMLで書けます。</p></body>
</html>
```

`bun run build` または `npm run build` で出力を確認します。このサイトの設定なら `src/hello.webc` が入力で、`_site/hello/index.html` が生成されます。記事一覧やレイアウトと組み合わせる前に、まずこの1ページが出るか確かめましょう。

## 部品に分けるのは繰り返しができてから

同じ構造を複数箇所で使うならコンポーネント化を検討します。部品の登録場所、データの渡し方、CSS・JavaScriptのまとめ方にはWebC固有の約束があります。[公式のコンポーネント解説](https://www.11ty.dev/docs/languages/webc/)を確認し、出力されたHTMLを見ながら一つずつ導入してください。Nunjucksのレイアウトが足りているなら、無理に置き換える必要はありません。

Build Awesome v4でもWebCは別途プラグインを案内しています。ただしv4はプレリリースのため、v3の手順と混ぜず[v4のWebC文書](https://build.awesome.me/docs/languages/webc/)を確認してください。
