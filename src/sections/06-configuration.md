---
title: 設定と拡張
summary: 入出力先、CSSのコピー、プラグイン、言語設定を見ます。
order: 6
tags: [section]
layout: base.njk
permalink: /configuration/
---
# 設定と拡張

Eleventyは設定ファイルなしでも始められます。設定が必要になるのは、原稿の置き場所を変えたい、CSSを出力へコピーしたい、プラグインを使いたい、といったときです。

## 入力と出力を決める

このサイトでは `eleventy.config.mjs` に `input: "src"`、`output: "_site"` を指定しています。記事などの原稿は `src/` に置き、ビルド後のHTMLは `_site/` に出ます。[設定ファイル](https://www.11ty.dev/docs/config/)は編集する前に既存の内容を確認してください。複数の設定ファイルを作っても、意図したものが読まれるとは限りません。

## CSSや画像はコピーする

EleventyはMarkdownをHTMLに変換しますが、CSSや画像を同じ方法では処理しません。元のファイルをそのまま出力へ送るには `addPassthroughCopy` を使います。このサイトでは `src/assets/` をコピーしています。

```js
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  return { dir: { input: "src", output: "_site" } };
}
```

コピー先を勘違いしたときは、ページ上のURLだけを直す前に `_site/assets/` の実体を確かめます。[ファイルコピーの公式説明](https://www.11ty.dev/docs/copy/)。

## プラグインは必要なものだけ

画像変換、RSS、WebCなどは用途に応じて追加できます。プラグインのために増えた依存パッケージも更新対象になるので、使っていないものは入れません。[公式プラグイン一覧](https://www.11ty.dev/docs/plugins/)にはそれぞれの導入手順があります。

## 日本語サイトと多言語サイトは別の話

日本語だけのサイトなら、HTMLの `<html lang="ja">` を指定し、タイトルや日付の表記を揃えることから始めます。複数言語で同じ内容を運用する場合は、URLや対応ページの関係を[国際化の公式ガイド](https://www.11ty.dev/docs/i18n/)に沿って設計します。日本語サイトというだけでi18nプラグインは不要です。

開発中は `--serve` でプレビューし、公開前にはサーバーを止めて通常のビルドも試してください。生成済みの古いファイルが残る場合は、出力ディレクトリを確認してからクリーンビルドします。
