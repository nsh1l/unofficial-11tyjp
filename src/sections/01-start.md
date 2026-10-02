---
title: はじめに
summary: Eleventyで何ができるか、どの版を使うか。
order: 1
tags: [section]
layout: base.njk
permalink: /start/
---
# はじめに

Eleventyは、MarkdownやHTMLの原稿からサイトを作るツールです。記事ごとにHTMLを複製する代わりに、本文をMarkdownに、共通の見た目をテンプレートに書きます。できたHTMLを公開するので、公開先でNode.jsを動かす必要はありません。

このサイトは**非公式の日本語ガイド**です。手元で試せる例を中心に書いています。細かな仕様は[公式ドキュメント](https://www.11ty.dev/docs/)で確認してください。

## Build Awesomeとの関係

[公式発表](https://www.11ty.dev/blog/build-awesome/)では、次の大きな版からBuild Awesomeという名前になると案内しています。別製品への乗り換えではありませんが、v4の説明をそのままv3のサイトに当てはめることはできません。

このガイドのコード例は、特記がなければ**Eleventy 3.1.6**向けです（確認日：2026年10月）。[Build Awesome v4の文書](https://build.awesome.me/docs/)は開発中の版を扱っています。試す場合は[Build Awesome v4を試す前に](/v4/)を読んでください。パッケージ名や手順は正式リリースまでに変わる可能性があります。

## 読み始める場所

- これから始めるなら[環境構築](/setup/)へ。Node.js/npmとBunの手順があります。
- 用語は[基本概念](/concepts/)、書き方は[テンプレート](/templates/)と[データとコンテンツ](/content/)へ。
- 公開の手順は[実践・公開](/publish/)へ。

このサイトもEleventyで作っています。[ソースコード](https://github.com/nsh1l/unofficial-11tyjp)で原稿とテンプレートを公開しています。誤りは[Issues](https://github.com/nsh1l/unofficial-11tyjp/issues)で知らせてください。
