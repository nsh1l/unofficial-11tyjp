---
title: トラブルシュート
summary: ビルド、表示、記事一覧の不具合を調べます。
order: 8
tags: [section]
layout: base.njk
permalink: /troubleshooting/
---
# トラブルシュート

ビルドが止まったら、エラーと `package.json`、ロックファイルを見て、使っているEleventyの版を確かめます。このガイドの手順はEleventy 3.1.6向けです。ネットで見つけた手順が別の版向けだと、そのまま試してもうまくいきません。

## ページが出ない、CSSが読めない

- ページがない：コマンドを実行した場所と `dir.input` を見ます。`dir.input` が `src` なら、原稿は `src/` 以下です。
- CSSや画像がない：[パススルーコピー](https://www.11ty.dev/docs/copy/)の指定と、出力先のファイルを見ます。HTMLの参照URLも確認してください。
- 公開したのに古い：Pagesならデプロイしたブランチと公開URL、レンタルサーバーなら転送先の `public_html` を確認します。

## ビルドは通るのに記事一覧が違う

記事の `tags` と、一覧が参照するコレクション名を比べてください。順序が違う場合は[コレクションの仕様](https://www.11ty.dev/docs/collections/)を確認します。下書きが見えるなら、CSSで隠すのではなく、ビルド対象やコレクションの条件を直します。

このガイドの誤りを見つけたら、再現に使った原稿や設定とともに[Issues](https://github.com/nsh1l/unofficial-11tyjp/issues)へ知らせてください。
