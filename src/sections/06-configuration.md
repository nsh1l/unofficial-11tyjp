---
title: 設定値の詳細
summary: eleventy.config.mjsに返す設定値と、それぞれが変える動作。
order: 6
tags: [section]
layout: base.njk
permalink: /configuration/
---
# 設定値の詳細

`eleventy.config.mjs` はサイト全体のビルド方法を決めるファイルです。ここでは、Eleventy 3.1.6の**設定値**を扱います。ファイルやURLの場所、処理する形式など、値を指定して変えられる項目です。コピーやコレクションの追加といった**関数**は[設定用の関数](/configuration/api/)に分けました。

## 設定値の書き方

このサイトの設定値を抜き出すと、次の形です。実際の[設定ファイル](https://github.com/nsh1l/unofficial-11tyjp/blob/main/eleventy.config.mjs)には、別ページで説明する関数の呼び出しもあります。

```js
export default function () {
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
```

`return { ... }` の波括弧の中が設定値です。たとえば `input: "src"` は「項目名: 値」、`false` は文字列ではなく真偽値です。この書き方だけで使うなら関数に引数は要りません。関数を追加するときは `eleventyConfig` を受け取ります。

設定ファイルそのものは必須ではありません。v3は `.eleventy.js`、`eleventy.config.js`、`eleventy.config.mjs`、`eleventy.config.cjs` の順に探し、最初の一つを使います。このサイトは関数から設定値を返しますが、`export const config = { ... }` として分ける書き方もあります。[設定ファイルの形式](https://www.11ty.dev/docs/config-shapes/)を参照してください。

## 原稿と出力の場所

`dir.input` は原稿のある場所、`dir.output` はビルド結果の置き場所です。このサイトでは `src/` から `_site/` に出力します。既定値はそれぞれプロジェクトのルートと `_site/` です。[ディレクトリの設定](https://www.11ty.dev/docs/config/#configuration-options)

`dir.includes` は共通部品、`dir.layouts` はレイアウト、`dir.data` は全ページで使うデータの場所です。この3つは `dir.input` からの相対指定です。`dir.layouts` を指定しなければ、レイアウトは `dir.includes` の場所から読み込みます。[レイアウト](https://www.11ty.dev/docs/layouts/)・[グローバルデータ](https://www.11ty.dev/docs/data-global/)

## 処理する形式とテンプレートエンジン

`templateFormats` は処理するファイル形式を指定します。設定すると既定の一覧を**置き換える**ため、MarkdownやNunjucksなど必要な形式を落とさないようにします。このサイトでは指定しておらず、既定の形式を使っています。[対象形式](https://www.11ty.dev/docs/config/#template-formats)

`markdownTemplateEngine` はMarkdown、`htmlTemplateEngine` はHTMLを、HTML化する前にどのテンプレートエンジンで処理するか決めます。`false` は**その前処理だけをしない**指定です。MarkdownからHTMLへの変換は続きます。[テンプレートエンジンの設定](https://www.11ty.dev/docs/config/#default-template-engine-for-markdown-files)

このサイトでは `markdownTemplateEngine: false` にして、Markdown中のNunjucksコード例が実行されないようにしています。`htmlTemplateEngine: "njk"` はHTMLファイルの前処理にNunjucksを使う指定です。どちらもサイトに合わせて選んでください。

## 公開先のURL

`pathPrefix` は `/guide/` のようなサブディレクトリで公開するときのURLの接頭辞です。ビルド結果のフォルダは変わりません。HTML内の絶対URLも書き換える場合は、[HTML Baseプラグイン](https://www.11ty.dev/docs/plugins/html-base/)の説明を確認してください。[pathPrefixの設定](https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix)

## 設定ファイルの外で指定するもの

`--input`、`--output`、`--formats`、`--pathprefix` はコマンド実行時の引数です。対応する設定値を上書きできます。[CLIの使い方](https://www.11ty.dev/docs/usage/)を参照してください。

記事ごとの `title`、`layout`、`permalink`、`tags`、`pagination` は通常、設定ファイルではなくフロントマターやデータファイルに書きます。[フロントマターの例](/concepts/)・[データカスケード](https://www.11ty.dev/docs/data-cascade/)

CSSのコピー、記事一覧、フィルター、プラグイン、監視などを追加したいときは、[設定用の関数](/configuration/api/)に進んでください。
