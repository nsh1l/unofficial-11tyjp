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

このページは**何をどこで設定できるか**を探すための案内です。各APIの引数や高度な使い方は、項目ごとにリンクした公式文書で確認してください。

## このサイトの設定例

このサイトでは、実際に次の設定を使っています。`eleventyConfig` に対する呼び出しで機能を追加し、最後に返すオブジェクトでディレクトリとテンプレートエンジンを指定しています。

```js
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addCollection("sections", (api) =>
    api.getFilteredByTag("section").sort((a, b) => a.data.order - b.data.order),
  );

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

`src/` の原稿から `_site/` にHTMLを作り、`src/assets/` のCSSなどをコピーします。`sections` は左の目次に使うコレクションです。`markdownTemplateEngine: false` にしているのは、Markdown中のNunjucksコード例をビルド時に解釈させないためです。この値は、Markdown本文をNunjucksで処理したいサイトなら変わります。

v3では `.eleventy.js`、`eleventy.config.js`、`eleventy.config.mjs`、`eleventy.config.cjs` の順に設定ファイルを探し、最初の一つだけを使います。設定を足す前に、どのファイルが使われているか確認してください。このサイトはコールバックからオブジェクトを返していますが、公式は設定値を `export const config = { ... }` として分ける形式も案内しています。詳しくは[設定ファイルの形式](https://www.11ty.dev/docs/config-shapes/)を参照してください。

## 入出力先と対象ファイル

- `dir.input` と `dir.output`：原稿の場所と生成物の置き場所。このサイトでは `src/` と `_site/` です。`dir.includes` は共通部品、`dir.layouts` はレイアウト、`dir.data` は全ページで使うデータの場所を指定します。`includes`、`layouts`、`data` は入力ディレクトリからの相対指定です。[ディレクトリ設定](https://www.11ty.dev/docs/config/#configuration-options)
- `templateFormats`：処理するファイル形式を指定します。既定値を**置き換える**設定なので、必要な形式を落とさないようにします。コールバックからは `setTemplateFormats()` で置き換え、`addTemplateFormats()` で追加できます。[対象形式](https://www.11ty.dev/docs/config/#template-formats)
- `markdownTemplateEngine` と `htmlTemplateEngine`：MarkdownやHTMLを、HTML化する前にどのテンプレートエンジンで処理するかを決めます。`false` ならその前処理をしません。このサイトはMarkdownを前処理せず、HTMLにはNunjucksを使います。[エンジン設定](https://www.11ty.dev/docs/config/#default-template-engine-for-markdown-files)
- `pathPrefix`：サブディレクトリで公開するときのURLの接頭辞です。**出力先のフォルダは変わりません**。HTML内の絶対URLも書き換えるなら、[HTML Baseプラグイン](https://www.11ty.dev/docs/plugins/html-base/)の説明を確認してください。[pathPrefixの設定](https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix)

同じディレクトリ指定には `setInputDirectory()`、`setOutputDirectory()`、`setIncludesDirectory()`、`setLayoutsDirectory()`、`setDataDirectory()` もあります。ただし設定を書く位置によって処理順が変わるため、このサイトのように `dir` を使うなら混ぜて書かず、[公式の説明](https://www.11ty.dev/docs/config/)を確認してください。

## コピー、除外、前処理

- `addPassthroughCopy("src/assets")`：CSS、画像、フォントなどを変換せずにコピーします。CSSが見つからないときは `_site/assets/` に出ているか確かめてください。[コピーの設定](https://www.11ty.dev/docs/copy/)
- `eleventyConfig.ignores.add()` / `.delete()` と `setUseGitIgnore()`：ビルド対象にしないファイルを調整します。[無視するファイル](https://www.11ty.dev/docs/ignores/)
- `addPreprocessor()`：テンプレートを処理する前に内容を変更したり、条件によって出力を見送ったりできます。[前処理](https://www.11ty.dev/docs/config-preprocessors/)

## データ、記事一覧、レイアウト

- `addGlobalData()`：全ページで参照できるデータを追加します。データファイルの形式を増やすなら `addDataExtension()` を使います。[グローバルデータ](https://www.11ty.dev/docs/data-global-custom/)・[独自データ形式](https://www.11ty.dev/docs/data-custom/)
- `setDataFileBaseName()`、`setDataFileSuffixes()`、`setFrontMatterParsingOptions()`：ディレクトリデータのファイル名、データファイルの接尾辞、フロントマターの読み取り方を変えます。[設定](https://www.11ty.dev/docs/config/#change-base-file-name-for-data-files)・[フロントマター](https://www.11ty.dev/docs/data-frontmatter-customize/)
- `addDateParsing()`：原稿の日付の読み取り方を追加します。[日付](https://www.11ty.dev/docs/dates/)
- `addCollection()`：記事の集まりを作ります。コールバックに渡るAPIでタグやパスによる抽出、並び替えができます。このサイトの `sections` もその一例です。[Collection API](https://www.11ty.dev/docs/collections-api/)・[記事一覧の例](/content/)
- `addLayoutAlias()`：レイアウトに短い別名を付けます。`addTemplate()` は設定ファイル内からページを追加します。[レイアウト](https://www.11ty.dev/docs/layouts/)・[仮想テンプレート](https://www.11ty.dev/docs/virtual-templates/)

`eleventyConfig.dataFilterSelectors` は `--to=json` / `--to=ndjson` の出力に含めるデータを選ぶための設定です。通常のHTML出力を絞る機能ではありません。[出力データの選択](https://www.11ty.dev/docs/config/#data-filter-selectors)

## テンプレートを拡張する

- `addFilter()`：テンプレートの値を整形する関数を登録します。非同期処理は `addAsyncFilter()`、既存のフィルターを再利用するなら `getFilter()` です。言語を限定するなら `addLiquidFilter()`、`addNunjucksFilter()`、`addNunjucksAsyncFilter()`、`addJavaScriptFunction()` を使います。[フィルター](https://www.11ty.dev/docs/filters/)
- `addShortcode()` と `addPairedShortcode()`：テンプレートから呼び出す小さな出力処理を登録します。非同期版の `addAsyncShortcode()` / `addPairedAsyncShortcode()`、言語別の `addLiquidShortcode()` / `addNunjucksShortcode()` などもあります。[ショートコード](https://www.11ty.dev/docs/shortcodes/)
- `addLiquidTag()` と `addNunjucksTag()`：既存のショートコードでは足りない場合に、各言語の独自タグを定義します。[独自タグ](https://www.11ty.dev/docs/custom-tags/)
- `addExtension()` と `addTemplateFormats()`：独自のファイル形式を処理対象に加えます。既存の言語を調整するなら `setLibrary()` / `amendLibrary()`、LiquidとNunjucksの動作は `setLiquidOptions()`、`setLiquidParameterParsing()`、`setNunjucksEnvironmentOptions()` で設定できます。[独自形式](https://www.11ty.dev/docs/languages/custom/)・[Markdown](https://www.11ty.dev/docs/languages/markdown/)・[Liquid](https://www.11ty.dev/docs/languages/liquid/)・[Nunjucks](https://www.11ty.dev/docs/languages/nunjucks/)
- `addPlugin()`：必要なプラグインを導入します。画像変換、RSS、多言語対応、WebCなどは用途ごとに選びます。[公式プラグイン一覧](https://www.11ty.dev/docs/plugins/)・[WebCの使い方](/templates/webc/)

## HTMLとURLを調整する

`addTransform()` は生成したHTMLなどを書き換え、`addLinter()` は書き換えずに検査します。`addUrlTransform()` は生成するURLの調整、`setDynamicPermalinks()` はパーマリンクの処理を変えるときに使います。出力前に原稿を変える `addPreprocessor()` とは処理の段階が違います。[出力の変換](https://www.11ty.dev/docs/transforms/)・[URLとパーマリンク](https://www.11ty.dev/docs/permalinks/)・[Linter](https://www.11ty.dev/docs/config/#linters)

## 監視と開発サーバー

開発中に `--serve` でプレビューすると、ファイル変更を監視して再ビルドします。`--watch` はサーバーなしで監視する実行時オプションです。[監視とサーバー](https://www.11ty.dev/docs/watch-serve/)

- `addWatchTarget()` と `eleventyConfig.watchIgnores.add()` / `.delete()`：監視するファイルを増やす、または除外します。
- `setWatchJavaScriptDependencies()`、`setWatchThrottleWaitTime()`、`setChokidarConfig()`：JavaScriptの依存ファイルや変更検知の待ち時間を調整します。
- `setServerOptions()` と `setServerPassthroughCopyBehavior()`：開発サーバーと、開発中のファイルコピー動作を調整します。[開発サーバー](https://www.11ty.dev/docs/dev-server/)

## ビルド時の処理と表示

`on("eleventy.before", ...)` と `on("eleventy.after", ...)` でビルドの前後に処理を登録できます。監視中だけ使う `eleventy.beforeWatch`、URLの対応を受け取る `eleventy.contentMap`、設定前の `eleventy.beforeConfig` もあります。イベントの実行順を変える `setEventEmitterMode()` の説明と合わせて[公式のイベント一覧](https://www.11ty.dev/docs/events/)を参照してください。

`setQuietMode()` はビルド時のログを減らします。設定ファイルのAPIに似た名前でも、`--input`、`--output`、`--formats`、`--pathprefix`、`--quiet` は実行時のCLI引数です。設定よりCLI引数が優先される項目があります。[CLIの使い方](https://www.11ty.dev/docs/usage/)を確認してください。

各ページの `title`、`layout`、`permalink`、`tags`、`pagination` などは通常、設定ファイルではなく**フロントマターやデータファイル**に書きます。[フロントマターとデータ](/concepts/)と[データカスケード](https://www.11ty.dev/docs/data-cascade/)で使い分けを確認できます。公開前には通常のビルドを実行し、生成物とURLを確かめてください。
