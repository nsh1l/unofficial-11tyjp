---
title: 環境構築
summary: Node.js/npmかBunを選び、最初のページを作ります。
order: 2
tags: [section]
layout: base.njk
permalink: /setup/
---
# 環境構築

まずテキストエディターとGitを用意します。JavaScriptの実行環境は**Node.js＋npm**か**Bun**のどちらかを選んでください。両方の手順を同じディレクトリで実行するとロックファイルが混ざるので、試すならディレクトリを分けます。

## ツールをインストールする

Node.jsを選ぶ場合は、[公式サイト](https://nodejs.org/ja/download)から使っているOS向けのLTS版を入れます。npmも一緒に入ります。Eleventy 3の要件はNode.js 18以上です。入れ終わったら、ターミナルで `node --version` と `npm --version` を確認します。

Bunを選ぶ場合は、[公式の導入手順](https://bun.com/docs/installation)に沿って入れ、`bun --version` を確認します。ここでは主にパッケージのインストールとコマンドの起動にBunを使います。EleventyがBunランタイム上での動作を保証しているわけではありません。

Gitは変更履歴を残すために使います。[公式サイト](https://git-scm.com/downloads)から入れ、`git --version` を確認してください。WindowsならPowerShellかGit Bash、macOS・Linuxならターミナルで以下のコマンドを実行できます。

## まず1ページをビルドする

新しいディレクトリを作り、その中に `index.md` を保存します。中身はこれだけで構いません。

```md
# はじめてのページ

本文をMarkdownで書きます。
```

**Node.js＋npmを選んだ場合**は、`index.md` と同じディレクトリで実行します。

```sh
npm init -y
npm install --save-dev @11ty/eleventy@3.1.6
npx @11ty/eleventy
npx @11ty/eleventy --serve
```

**Bunを選んだ場合**はこちらです。`bun init -y` で `package.json` を作ってからインストールします。

```sh
bun init -y
bun add -d @11ty/eleventy@3.1.6
bunx eleventy
bunx eleventy --serve
```

ビルドすると `_site/index.html` ができます。`--serve` を付けると開発サーバーが起動するので、表示されたURLをブラウザーで開いてください。終了は `Ctrl+C`。ページが出ないときは、コマンドを実行した場所と `index.md` の置き場所を確かめます。

## Gitには原稿と設定を残す

`_site/` はビルドの出力、`node_modules/` はインストールしたパッケージです。どちらもGitに入れる必要はありません。`.gitignore` に書いておきます。

```text
_site/
node_modules/
```

`git init` のあと、`git status` で変更ファイルを見てから `git add` と `git commit` を使います。GitHubに送る前には、パスワードやAPIキーが紛れていないか確認してください。

参照：[Eleventyの導入](https://www.11ty.dev/docs/)／[Bunのパッケージ追加](https://bun.com/docs/pm/cli/add)／[bunx](https://bun.com/docs/pm/bunx)。
