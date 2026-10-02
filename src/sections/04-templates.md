---
title: テンプレート
summary: Markdownで本文を書き、Nunjucksで共通部分を作ります。
order: 4
tags: [section]
layout: base.njk
permalink: /templates/
---
# テンプレート

記事はMarkdownで書き、共通のヘッダーやフッターはNunjucksに置きます。この二つで始めれば十分です。ほかの[テンプレート言語](https://www.11ty.dev/docs/languages/)も、必要になってから選べます。

## Markdownで本文を書く

見出しは `#`、リンクは `[表示名](URL)`、コードはバッククォートで囲みます。フロントマターは原稿の先頭に置きます。

```md
---
title: お知らせ
layout: base.njk
---
# お知らせ

新しい記事を公開しました。
```

ビルドすると、このMarkdownからHTMLができます。書式の詳しい説明は[Markdownの公式ページ](https://www.11ty.dev/docs/languages/markdown/)にあります。

## Nunjucksで共通部分をまとめる

`_includes/base.njk` にレイアウトを置き、`{{ title }}` でタイトルを表示し、`{{ content | safe }}` で変換済みの本文を差し込みます。`safe` はHTMLとして扱う指定です。**信頼していない入力に無条件で使わないでください。** HTML属性に入れる文字列も適切にエスケープします。

```njk
<!doctype html>
<html lang="ja">
  <head><meta charset="utf-8"><title>{{ title }}</title></head>
  <body><main>{{ content | safe }}</main></body>
</html>
```

記事を直すときはMarkdown、全ページ共通の部分を直すときはレイアウトを編集します。[Nunjucksの公式説明](https://www.11ty.dev/docs/languages/nunjucks/)も参照してください。

## WebCを使いたいとき

複数ページで同じカードや案内枠を使うなら、WebCで部品にする方法もあります。**Eleventy 3.1.6の本体だけでは `.webc` は処理できない**ので、公式プラグインを入れて設定に登録します。

```sh
# Node.js＋npm
npm install --save-dev @11ty/eleventy-plugin-webc
# Bun
bun add -d @11ty/eleventy-plugin-webc
```

```js
import webcPlugin from "@11ty/eleventy-plugin-webc";
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(webcPlugin);
}
```

すでに `eleventy.config.mjs` があるなら、ファイルを増やさず、そこへ `import` と `addPlugin` を追加します。続きは[WebCの使い方](/templates/webc/)へ。このガイド自体はWebCを使わなくても読めます。
