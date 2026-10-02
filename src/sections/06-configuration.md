---
title: 設定と拡張
summary: 原稿の置き場所、CSSのコピー、プラグインの設定。
order: 6
tags: [section]
layout: base.njk
permalink: /configuration/
---
# 設定と拡張

Eleventyは設定ファイルがなくても動きます。原稿を `src/` に置く、CSSを出力へコピーする、プラグインを使う、といった場合に設定を追加します。

## 入力と出力を決める

このサイトの `eleventy.config.mjs` では、入力を `src/`、出力を `_site/` に指定しています。設定を変えるときは、まず既存のファイルを開いてください。新しい設定ファイルを別に作ると、どちらが使われているか分かりにくくなります。[公式の設定ガイド](https://www.11ty.dev/docs/config/)も参照できます。

## CSSや画像はコピーする

CSSや画像はMarkdownのように変換せず、そのまま出力へコピーします。このサイトでは `addPassthroughCopy` で `src/assets/` をコピーしています。

```js
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  return { dir: { input: "src", output: "_site" } };
}
```

CSSが読めないときは、まず `_site/assets/` にファイルが出ているか見てください。[ファイルコピーの公式説明](https://www.11ty.dev/docs/copy/)。

## プラグインは必要なものだけ

画像変換やRSS、WebCが必要なら、対応するプラグインを追加します。使わないものまで先に入れる必要はありません。導入手順は[公式プラグイン一覧](https://www.11ty.dev/docs/plugins/)から確認できます。

## 日本語サイトと多言語サイトは別の話

日本語だけで書くサイトなら、まずHTMLに `<html lang="ja">` を指定し、日付の書き方を揃えます。複数言語で同じ記事を出すなら、URLの構成を[国際化の公式ガイド](https://www.11ty.dev/docs/i18n/)で確認してください。日本語サイトだからといってi18nプラグインは要りません。

開発中は `--serve` でプレビューできます。公開前には通常のビルドも実行し、古いファイルが出力先に残っていないか確かめてください。
