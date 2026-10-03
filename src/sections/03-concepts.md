---
title: 基本概念
summary: 原稿、レイアウト、データ、公開URLの関係を説明します。
order: 3
tags: [section]
layout: base.njk
permalink: /concepts/
---
# 基本概念

Eleventyは原稿を読み込み、データやレイアウトと組み合わせてHTMLを書き出します。公開するのは元のMarkdownではなく、ビルドでできたファイルです。

<figure class="build-flow">
  <figcaption>原稿から公開まで</figcaption>
  <ol role="list">
    <li><strong>原稿を用意</strong><span>Markdown・Nunjucks・データ</span></li>
    <li><strong>Eleventyでビルド</strong><span>原稿とレイアウトを組み合わせる</span></li>
    <li><strong>ファイルを生成</strong><span><code>_site/</code> にHTMLを書き出し、CSSをコピー</span></li>
    <li><strong>公開先へ配置</strong><span>生成されたファイルを静的に配信</span></li>
  </ol>
</figure>

## テンプレートとレイアウト

`index.md` もEleventyではテンプレートの一種で、1つの原稿から1つのページを作ります。ヘッダーやフッターなど、全ページに共通する部分は**レイアウト**に書きます。原稿の先頭で `layout: base.njk` を指定すると、本文がレイアウトの `content` に入ります。共通部分は一か所で直せます。[レイアウトの公式説明](https://www.11ty.dev/docs/layouts/)。

## フロントマターは本文の前

Markdownファイルの先頭で、2行の `---` に挟まれた部分が**フロントマター**です。ここにページの情報を書き、その下に本文を書きます。

```md
---
title: はじめての記事
---
# はじめての記事

ここから本文です。
```

`title` はEleventyが読み取るページ情報で、このサイトではブラウザのタイトルやパンくずに使っています。`# はじめての記事` は本文の見出しです。`title` を書くだけで本文に見出しが表示されるわけではありません。

日付やタグもフロントマターに書けます。[記事の書き方](/content/)に例があります。複数ページで使う値はデータファイルにも置けます。同じ名前の値を両方に書いたときの優先順位は、[データカスケード](https://www.11ty.dev/docs/data-cascade/)で確認できます。

## コレクション

記事に同じ `tags` を付けると、まとめて一覧に並べられます。このまとまりが**コレクション**です。新しい記事を追加するたびに、一覧へリンクを手で足さずに済みます。[コレクションの公式説明](https://www.11ty.dev/docs/collections/)。

## パーマリンク

原稿の置き場所と公開URLは別に決められます。フロントマターに `permalink: /about/` と書けば、公開URLを `/about/` にできます。公開後にURLを変えるなら、古いリンクのためにリダイレクトも用意しましょう。[パーマリンクの公式説明](https://www.11ty.dev/docs/permalinks/)。

このガイドでは、原稿を `src/`、ビルド結果を `_site/` に置いています。[設定ファイル](https://github.com/nsh1l/unofficial-11tyjp/blob/main/eleventy.config.mjs)で指定した置き場所で、Eleventyの決まりではありません。
