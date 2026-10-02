---
title: 環境構築
summary: Node.js/npm、Bun、Gitを用意し、同じサイトを動かします。
order: 2
tags: [section]
layout: base.njk
permalink: /setup/
---
# 環境構築

必要なのは、テキストエディター、Git、そしてJavaScriptの実行環境です。ここでは**Node.js＋npm**と**Bun**を並べて紹介します。どちらか一方を選んで進めてください。同じ作業ディレクトリで両方のロックファイルを混在させないのが無難です。

## 最初にコマンドを使える状態にする

Node.jsはJavaScriptの実行環境、npmはNode.jsに付属するパッケージ管理ツールです。[Node.jsの公式サイト](https://nodejs.org/ja/download)から対応するOSの安定版を導入してください。Eleventy 3はNode.js 18以上を対象としますが、新しく環境を作るならサポート中のLTS版を選びます。インストール後、ターミナルで `node --version` と `npm --version` を実行します。

BunはJavaScriptの実行とパッケージ管理の両方を扱います。[Bunの導入案内](https://bun.com/docs/installation)に沿ってOS別の方法でインストールし、`bun --version` を確認してください。このガイドのBunコマンドはBunを**パッケージ管理ツールとして使う例**です。Eleventyの全機能がBunランタイム上で保証される、という意味ではありません。

Gitはファイルの変更履歴を残すツールです。[Gitの公式ダウンロード](https://git-scm.com/downloads)から導入し、`git --version` で確認します。Windowsの場合はPowerShellやGit Bash、macOS・Linuxではターミナルで操作できます。

## まず1ページをビルドする

空のディレクトリを作り、次の内容を `index.md` として保存します。

```md
# はじめてのページ

本文をMarkdownで書きます。
```

**Node.js＋npmの場合**、そのディレクトリで次の順に実行します。

```sh
npm init -y
npm install --save-dev @11ty/eleventy@3.1.6
npx @11ty/eleventy
npx @11ty/eleventy --serve
```

**Bunの場合**は、同じ `index.md` を使い、こちらを実行します。新規プロジェクトでは先に `bun init -y` で `package.json` を作ります。

```sh
bun init -y
bun add -d @11ty/eleventy@3.1.6
bunx eleventy
bunx eleventy --serve
```

ビルドが成功すると `_site/index.html` ができます。`--serve` は開発用サーバーを起動し、ターミナルに表示されたローカルURLで結果を確かめられます。止めるときは `Ctrl+C`。表示されない場合は、コマンドを実行したディレクトリと `index.md` の置き場所をまず確認してください。

## Gitには原稿と設定を残す

`_site/` は毎回作り直せる出力物、`node_modules/` はインストールした依存物です。公開用のリポジトリには通常入れません。`.gitignore` に両方を書きます。

```text
_site/
node_modules/
```

`git init` で履歴を作り、`git status` で差分を見てから `git add` と `git commit` を使います。GitHubに送るときも、公開してよいファイルだけが含まれているか先に確認してください。パスワードやAPIキーはコミットしません。

参照：[Eleventyの導入](https://www.11ty.dev/docs/)／[Bunのパッケージ追加](https://bun.com/docs/pm/cli/add)／[bunx](https://bun.com/docs/pm/bunx)。
