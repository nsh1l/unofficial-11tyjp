---
title: 設定と拡張
summary: Eleventy v3の設定ファイルでできることを、実例と用途別の一覧で確認します。
order: 6
tags: [section]
layout: base.njk
permalink: /configuration/
---
# 設定と拡張

`eleventy.config.mjs` は、サイト全体のビルド方法を決めるファイルです。Eleventy 3.1.6では、原稿の場所だけでなく、データの追加、テンプレートの拡張、開発サーバーの調整まで扱えます。設定ファイル自体は必須ではありません。

まずJavaScriptの書き方を押さえ、そのあとで設定の使い道を見ます。各APIの引数や高度な使い方は、項目ごとにリンクした公式文書で確認してください。

## コードの読み方

このサイトの設定を、コードの読み方が分かる部分だけに絞った例です。実際の[設定ファイル](https://github.com/nsh1l/unofficial-11tyjp/blob/main/eleventy.config.mjs)には目次用のコレクションなどもあります。

```js
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy(
    "src/assets",
  );

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    markdownTemplateEngine: false,
  };
}
```

- `export default function (eleventyConfig)` は、Eleventyに設定用の関数を渡すJavaScriptの書き方です。`eleventyConfig` は、その関数が受け取る引数の名前です。
- `eleventyConfig.addPassthroughCopy("src/assets")` のような行は、用意されたメソッドを呼び出しています。丸括弧の中の文字列は、コピー元などを指定する引数です。
- `return { ... }` は設定値をまとめて返します。中の `input: "src"` は「項目名: 値」の形です。`false` は文字列ではなく真偽値です。

v3では `.eleventy.js`、`eleventy.config.js`、`eleventy.config.mjs`、`eleventy.config.cjs` の順に設定ファイルを探し、最初の一つだけを使います。設定を足す前に、使われているファイルを確認してください。このサイトは関数からオブジェクトを返していますが、設定値を `export const config = { ... }` として分ける書き方もあります。[設定ファイルの形式](https://www.11ty.dev/docs/config-shapes/)で確認できます。

## 設定で変えられること

実際に使っている設定を手がかりに、用途別に見ていきます。すべてを設定する必要はありません。

### 入出力先と対象ファイル

- **原稿と生成物の場所**：`dir.input` と `dir.output` で指定します。このサイトでは `src/` と `_site/` です。共通部品は `dir.includes`、レイアウトは `dir.layouts`、全ページで使うデータは `dir.data`。この3つは入力ディレクトリからの相対指定です。[ディレクトリ設定](https://www.11ty.dev/docs/config/#configuration-options)
- **処理するファイル形式**：`templateFormats` で指定します。既定値を**置き換える**ため、必要な形式を落とさないようにします。`setTemplateFormats()` は置き換え、`addTemplateFormats()` は追加です。[対象形式](https://www.11ty.dev/docs/config/#template-formats)
- **MarkdownとHTMLの前処理**：`markdownTemplateEngine` と `htmlTemplateEngine` でテンプレートエンジンを選びます。`false` は前処理なし。このサイトではMarkdown中のNunjucksコード例を解釈させず、HTMLにはNunjucksを使います。[エンジン設定](https://www.11ty.dev/docs/config/#default-template-engine-for-markdown-files)
- **サブディレクトリでの公開**：`pathPrefix` でURLの接頭辞を指定します。出力先のフォルダは変わりません。HTML内の絶対URLも書き換えるなら[HTML Baseプラグイン](https://www.11ty.dev/docs/plugins/html-base/)を確認してください。[pathPrefixの設定](https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix)

同じディレクトリ指定には `setInputDirectory()`、`setOutputDirectory()`、`setIncludesDirectory()`、`setLayoutsDirectory()`、`setDataDirectory()` もあります。ただし設定を書く位置によって処理順が変わるため、このサイトのように `dir` を使うなら混ぜて書かず、[公式の説明](https://www.11ty.dev/docs/config/)を確認してください。

### コピー、除外、前処理

- **CSSや画像をそのままコピー**：`addPassthroughCopy("src/assets")` を使います。CSSが見つからないときは `_site/assets/` を確認してください。[コピーの設定](https://www.11ty.dev/docs/copy/)
- **ビルド対象から除外**：`eleventyConfig.ignores.add()` / `.delete()` と `setUseGitIgnore()` で調整します。[無視するファイル](https://www.11ty.dev/docs/ignores/)
- **変換前に内容を変更・除外**：`addPreprocessor()` を使います。[前処理](https://www.11ty.dev/docs/config-preprocessors/)

### データ、記事一覧、レイアウト

- **全ページ共通のデータ**：`addGlobalData()` で追加します。データファイルの形式を増やすなら `addDataExtension()` を使います。[グローバルデータ](https://www.11ty.dev/docs/data-global-custom/)・[独自データ形式](https://www.11ty.dev/docs/data-custom/)
- **データのファイル名と読み取り方**：`setDataFileBaseName()`、`setDataFileSuffixes()`、`setFrontMatterParsingOptions()` で変えられます。[設定](https://www.11ty.dev/docs/config/#change-base-file-name-for-data-files)・[フロントマター](https://www.11ty.dev/docs/data-frontmatter-customize/)
- **日付の読み取り方**：`addDateParsing()` で追加します。[日付](https://www.11ty.dev/docs/dates/)
- **記事一覧**：`addCollection()` で記事をまとめます。タグやパスで抽出し、並び替えもできます。このサイトの `sections` もその一例です。[Collection API](https://www.11ty.dev/docs/collections-api/)・[記事一覧の例](/content/)
- **レイアウトの別名とページの追加**：`addLayoutAlias()` で別名を付け、`addTemplate()` で設定ファイルからページを追加できます。[レイアウト](https://www.11ty.dev/docs/layouts/)・[仮想テンプレート](https://www.11ty.dev/docs/virtual-templates/)

`eleventyConfig.dataFilterSelectors` は `--to=json` / `--to=ndjson` の出力に含めるデータを選ぶための設定です。通常のHTML出力を絞る機能ではありません。[出力データの選択](https://www.11ty.dev/docs/config/#data-filter-selectors)

### テンプレートを拡張する

- **値の整形**：`addFilter()` でフィルターを登録します。非同期なら `addAsyncFilter()`、既存のものを使うなら `getFilter()`。言語を限定するAPIには `addLiquidFilter()`、`addNunjucksFilter()`、`addNunjucksAsyncFilter()`、`addJavaScriptFunction()` があります。[フィルター](https://www.11ty.dev/docs/filters/)
- **繰り返し使う出力処理**：`addShortcode()` / `addPairedShortcode()` で登録します。非同期版は `addAsyncShortcode()` / `addPairedAsyncShortcode()`、言語別には `addLiquidShortcode()` / `addNunjucksShortcode()` などがあります。[ショートコード](https://www.11ty.dev/docs/shortcodes/)
- **独自のテンプレートタグ**：Liquidでは `addLiquidTag()`、Nunjucksでは `addNunjucksTag()` を使います。[独自タグ](https://www.11ty.dev/docs/custom-tags/)
- **独自形式やエンジンの調整**：`addExtension()` / `addTemplateFormats()` で形式を追加します。既存エンジンは `setLibrary()` / `amendLibrary()`、LiquidとNunjucksの設定は `setLiquidOptions()`、`setLiquidParameterParsing()`、`setNunjucksEnvironmentOptions()` で変更できます。[独自形式](https://www.11ty.dev/docs/languages/custom/)・[Markdown](https://www.11ty.dev/docs/languages/markdown/)・[Liquid](https://www.11ty.dev/docs/languages/liquid/)・[Nunjucks](https://www.11ty.dev/docs/languages/nunjucks/)
- **追加機能**：画像変換、RSS、多言語対応、WebCなどのプラグインは `addPlugin()` で導入します。[公式プラグイン一覧](https://www.11ty.dev/docs/plugins/)・[WebCの使い方](/templates/webc/)

### HTMLとURLを調整する

`addTransform()` は生成したHTMLなどを書き換え、`addLinter()` は書き換えずに検査します。`addUrlTransform()` は生成するURLの調整、`setDynamicPermalinks()` はパーマリンクの処理を変えるときに使います。出力前に原稿を変える `addPreprocessor()` とは処理の段階が違います。[出力の変換](https://www.11ty.dev/docs/transforms/)・[URLとパーマリンク](https://www.11ty.dev/docs/permalinks/)・[Linter](https://www.11ty.dev/docs/config/#linters)

### 監視と開発サーバー

開発中に `--serve` でプレビューすると、ファイル変更を監視して再ビルドします。`--watch` はサーバーなしで監視する実行時オプションです。[監視とサーバー](https://www.11ty.dev/docs/watch-serve/)

- **監視するファイル**：`addWatchTarget()` で増やし、`eleventyConfig.watchIgnores.add()` / `.delete()` で除外を調整します。
- **変更の検知方法**：`setWatchJavaScriptDependencies()`、`setWatchThrottleWaitTime()`、`setChokidarConfig()` で依存ファイルや待ち時間を調整します。
- **開発サーバー**：`setServerOptions()` と `setServerPassthroughCopyBehavior()` でサーバーやコピーの動作を変えられます。[開発サーバー](https://www.11ty.dev/docs/dev-server/)

### ビルド時の処理と表示

`on("eleventy.before", ...)` と `on("eleventy.after", ...)` でビルドの前後に処理を登録できます。監視中だけ使う `eleventy.beforeWatch`、URLの対応を受け取る `eleventy.contentMap`、設定前の `eleventy.beforeConfig` もあります。イベントの実行順を変える `setEventEmitterMode()` の説明と合わせて[公式のイベント一覧](https://www.11ty.dev/docs/events/)を参照してください。

`setQuietMode()` はビルド時のログを減らします。

## 設定ファイルの外で指定すること

`--input`、`--output`、`--formats`、`--pathprefix`、`--quiet` は、コマンドを実行するときに渡すCLI引数です。対応する設定項目より優先されます。[CLIの使い方](https://www.11ty.dev/docs/usage/)を確認してください。

各ページの `title`、`layout`、`permalink`、`tags`、`pagination` などは通常、設定ファイルではなく**フロントマターやデータファイル**に書きます。[フロントマターとデータ](/concepts/)と[データカスケード](https://www.11ty.dev/docs/data-cascade/)で使い分けを確認できます。公開前には通常のビルドを実行し、生成物とURLを確かめてください。
