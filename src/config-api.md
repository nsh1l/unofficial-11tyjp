---
title: 設定用の関数
summary: Eleventy v3でファイルのコピーやコレクションなどを追加する関数の一覧。
layout: base.njk
permalink: /configuration/api/
---
# 設定用の関数

`eleventy.config.mjs` の関数は、コピーするファイルや記事一覧、テンプレートで使う機能などを追加できます。ここではEleventy 3.1.6の設定用APIを用途別に並べます。ファイルやURLの場所など、`return` で返す**設定値**は[設定値の詳細](/configuration/)に分けています。

## 関数の呼び出し方

このサイトでは、設定用の関数の中で次のメソッドを呼び出しています。

```js
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy(
    "src/assets",
  );
}
```

`eleventyConfig` はEleventyから受け取る引数です。`addPassthroughCopy()` がメソッド名、`"src/assets"` が渡す値です。これは呼び出し方の例で、実際の[設定ファイル](https://github.com/nsh1l/unofficial-11tyjp/blob/main/eleventy.config.mjs)にはほかの関数と設定値もあります。

## ファイルの選別とコピー

- **CSSや画像をコピーする**：`addPassthroughCopy()`。このサイトでは `src/assets/` をそのまま `_site/assets/` にコピーしています。[コピーの設定](https://www.11ty.dev/docs/copy/)
- **ビルド対象から外す**：`eleventyConfig.ignores.add()` / `.delete()` と `setUseGitIgnore()`。[無視するファイル](https://www.11ty.dev/docs/ignores/)
- **変換前に内容を変更・除外する**：`addPreprocessor()`。[前処理](https://www.11ty.dev/docs/config-preprocessors/)

## 入出力とテンプレート言語

- **入出力先をメソッドで指定する**：`setInputDirectory()`、`setOutputDirectory()`、`setIncludesDirectory()`、`setLayoutsDirectory()`、`setDataDirectory()`。同じ場所は[設定値の `dir`](/configuration/)でも指定できます。どちらで設定するか決め、処理順に注意してください。[ディレクトリ設定](https://www.11ty.dev/docs/config/#configuration-options)
- **処理する形式を変える**：`setTemplateFormats()` は一覧を置き換え、`addTemplateFormats()` は既定の一覧に追加します。[対象形式](https://www.11ty.dev/docs/config/#template-formats)
- **独自の形式やエンジンを使う**：`addExtension()` で形式を登録し、`setLibrary()` / `amendLibrary()` で既存のエンジンを調整します。LiquidとNunjucksには `setLiquidOptions()`、`setLiquidParameterParsing()`、`setNunjucksEnvironmentOptions()` もあります。[独自形式](https://www.11ty.dev/docs/languages/custom/)・[Markdown](https://www.11ty.dev/docs/languages/markdown/)・[Liquid](https://www.11ty.dev/docs/languages/liquid/)・[Nunjucks](https://www.11ty.dev/docs/languages/nunjucks/)

## データ、記事一覧、レイアウト

- **全ページで使うデータを追加する**：`addGlobalData()`。新しいデータファイル形式には `addDataExtension()` を使います。[グローバルデータ](https://www.11ty.dev/docs/data-global-custom/)・[独自データ形式](https://www.11ty.dev/docs/data-custom/)
- **データの名前や読み取り方を変える**：`setDataFileBaseName()`、`setDataFileSuffixes()`、`setFrontMatterParsingOptions()`。日付の読み取り方は `addDateParsing()` で追加します。[データファイル](https://www.11ty.dev/docs/config/#change-base-file-name-for-data-files)・[フロントマター](https://www.11ty.dev/docs/data-frontmatter-customize/)・[日付](https://www.11ty.dev/docs/dates/)
- **記事をまとめる**：`addCollection()`。タグやパスで抽出し、並び替えもできます。このサイトでは左の目次に使う `sections` を登録しています。[Collection API](https://www.11ty.dev/docs/collections-api/)・[記事一覧の例](/content/)
- **レイアウトに別名を付ける／ページを追加する**：`addLayoutAlias()` / `addTemplate()`。[レイアウト](https://www.11ty.dev/docs/layouts/)・[仮想テンプレート](https://www.11ty.dev/docs/virtual-templates/)

## テンプレート内で使う機能

- **値を整形する**：`addFilter()`。非同期なら `addAsyncFilter()`、既存のフィルターを取り出すなら `getFilter()`。言語を限定するAPIには `addLiquidFilter()`、`addNunjucksFilter()`、`addNunjucksAsyncFilter()`、`addJavaScriptFunction()` があります。[フィルター](https://www.11ty.dev/docs/filters/)
- **繰り返し使う出力処理を登録する**：`addShortcode()` / `addPairedShortcode()`。非同期版は `addAsyncShortcode()` / `addPairedAsyncShortcode()`、言語別には `addLiquidShortcode()` / `addNunjucksShortcode()` などがあります。[ショートコード](https://www.11ty.dev/docs/shortcodes/)
- **独自タグを作る**：Liquidでは `addLiquidTag()`、Nunjucksでは `addNunjucksTag()`。[独自タグ](https://www.11ty.dev/docs/custom-tags/)
- **プラグインを使う**：`addPlugin()`。画像変換、RSS、多言語対応、WebCなど、必要なものだけ導入します。[公式プラグイン一覧](https://www.11ty.dev/docs/plugins/)・[WebCの使い方](/templates/webc/)

## 出力とビルドを調整する

`addTransform()` は生成されたHTMLなどを書き換え、`addLinter()` は書き換えずに検査します。URLを変える `addUrlTransform()`、パーマリンクの処理を変える `setDynamicPermalinks()` もあります。前処理の `addPreprocessor()` とは実行段階が違います。[出力の変換](https://www.11ty.dev/docs/transforms/)・[パーマリンク](https://www.11ty.dev/docs/permalinks/)・[Linter](https://www.11ty.dev/docs/config/#linters)

`on("eleventy.before", ...)` と `on("eleventy.after", ...)` はビルドの前後に処理を登録します。監視中の `eleventy.beforeWatch`、URL対応の `eleventy.contentMap`、設定前の `eleventy.beforeConfig` もあります。イベントの実行順は `setEventEmitterMode()` で変えられます。[イベント一覧](https://www.11ty.dev/docs/events/)

`setQuietMode()` はビルド時のログを減らします。[Quiet mode](https://www.11ty.dev/docs/config/#enable-quiet-mode-to-reduce-console-noise)

## 監視と開発サーバー

`--serve` は監視とローカルサーバーを起動し、`--watch` はサーバーなしで監視します。これらは設定用の関数ではなく、コマンド実行時の指定です。[監視とサーバー](https://www.11ty.dev/docs/watch-serve/)

- **監視するファイルを増やす／除外する**：`addWatchTarget()`、`eleventyConfig.watchIgnores.add()` / `.delete()`。
- **検知の方法や待ち時間を変える**：`setWatchJavaScriptDependencies()`、`setWatchThrottleWaitTime()`、`setChokidarConfig()`。
- **開発サーバーを調整する**：`setServerOptions()`、`setServerPassthroughCopyBehavior()`。[開発サーバー](https://www.11ty.dev/docs/dev-server/)

なお、`eleventyConfig.dataFilterSelectors` は関数ではなくプロパティです。`--to=json` / `--to=ndjson` の出力に含めるデータを選びます。通常のHTML出力を絞る機能ではありません。[出力データの選択](https://www.11ty.dev/docs/config/#data-filter-selectors)
