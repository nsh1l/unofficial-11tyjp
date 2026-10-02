---
title: はじめに
summary: Eleventyの役割と、このガイドで使うバージョンを確認します。
order: 1
tags: [section]
layout: base.njk
permalink: /start/
---
# はじめに

Eleventyは、MarkdownやHTMLなどのファイルからウェブサイトを組み立てる静的サイトジェネレーターです。記事を書くたびにHTMLを手で複製する必要はありません。本文をMarkdownに置き、共通の見た目をテンプレートに任せ、ビルドしたHTMLを公開します。公開先にNode.jsを置く必要はありません。

このサイトは**非公式の日本語ガイド**です。公式文書の逐語訳ではなく、手元で試せる例を使って仕組みを説明します。仕様を確認するときは[公式ドキュメント](https://www.11ty.dev/docs/)も参照してください。

## EleventyとBuild Awesomeは同じ流れにある

[公式の発表](https://www.11ty.dev/blog/build-awesome/)によると、EleventyはBuild Awesomeに改称されます。別の製品へ乗り換える話ではありません。ただし、名前が変わったからといって、開発中のv4の操作を現在の安定版v3へそのまま当てはめないでください。

このガイドのコード例は、特記がなければ**Eleventy 3.1.6**を対象にしています（確認日：2026年10月）。[Build Awesome v4の文書](https://build.awesome.me/docs/)はプレリリースの内容として読み分けます。試す場合の注意点は[Build Awesome v4を試す前に](/v4/)にまとめました。v4のパッケージ名や画面は正式リリースまでに変わる可能性があります。

## まず何を読む？

- 環境を整えるなら[環境構築](/setup/)。Node.js/npmとBunを両方載せています。
- 用語を調べるなら[基本概念](/concepts/)、書き方は[テンプレート](/templates/)と[データとコンテンツ](/content/)。
- 記事を公開するところまで進めるなら[実践・公開](/publish/)。

このサイト自身もEleventyでビルドしています。[ソースコード](https://github.com/nsh1l/unofficial-11tyjp)を見れば、Markdownの原稿とHTMLの出力がどうつながるか追えます。誤りを見つけたら[Issues](https://github.com/nsh1l/unofficial-11tyjp/issues)で知らせてください。
