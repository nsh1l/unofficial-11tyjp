---
title: テンプレート
summary: MarkdownとNunjucksの使い分け、WebCの導入を説明します。
order: 4
tags: [section]
layout: base.njk
permalink: /templates/
---
# テンプレート

記事本文はMarkdown、ページの枠はNunjucksから始めると分かりやすいでしょう。Eleventyはほかにも複数の[テンプレート言語](https://www.11ty.dev/docs/languages/)を扱えますが、最初から使い分ける必要はありません。

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

この原稿をビルドするとHTMLができます。Markdownの記法はHTMLのすべてを表すものではありません。表現を増やす前に、まず文章と見出しの構造が読めるか確認してください。[Markdownの公式説明](https://www.11ty.dev/docs/languages/markdown/)。

## Nunjucksで共通部分をまとめる

`_includes/base.njk` にレイアウトを置き、`{{ title }}` でタイトルを表示し、`{{ content | safe }}` で変換済みの本文を差し込みます。`safe` はHTMLとして扱う指定です。**信頼していない入力に無条件で使わないでください。** HTML属性に入れる文字列も適切にエスケープします。

```njk
<!doctype html>
<html lang="ja">
  <head><meta charset="utf-8"><title>{{ title }}</title></head>
  <body><main>{{ content | safe }}</main></body>
</html>
```

原稿の中身を直すときはMarkdown、サイト全体の枠を直すときはレイアウト。分担がはっきりしていれば、記事を書く人がテンプレートに触る機会も減ります。[Nunjucksの公式説明](https://www.11ty.dev/docs/languages/nunjucks/)。

## WebCを使いたいとき

WebCはHTMLに近い形で部品を組み合わせる仕組みです。例えば、同じ見た目のカードを複数のページで使いたい場合に向いています。ただし、**Eleventy v3の本体だけでは `.webc` は処理できません**。公式プラグインを追加し、設定に登録します。

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

設定済みのプロジェクトなら、新しい設定ファイルを作る代わりに既存の `eleventy.config.mjs` へ `import` と `addPlugin` を追加します。詳しくは[WebCの使い方](/templates/webc/)に分けました。このガイド本体はWebCを必須にしていません。
