---
title: 移行とトラブルシュート
summary: 版の取り違え、表示の失敗、記事一覧の不具合を調べます。
order: 8
tags: [section]
layout: base.njk
permalink: /troubleshooting/
---
# 移行とトラブルシュート

ビルドが止まったら、エラーと `package.json`、ロックファイルを見て、使っているEleventyの版を確かめます。ネットで見つけた手順が別の版向けだと、そのまま試してもうまくいきません。

## Eleventy v3とBuild Awesome v4を混ぜない

[改称の公式発表](https://www.11ty.dev/blog/build-awesome/)では、Build Awesome v4も既存のプラグインやビルドコマンドとの互換性を保つ方針です。ただし、手元のプラグインが開発中のv4で動くかは実際に試してみないと分かりません。v3のサイトが動いているなら、急いで移行する必要はありません。

[v3の文書](https://www.11ty.dev/docs/)と[v4の文書](https://build.awesome.me/docs/)を読み分けてください。v4を試すなら `@awesome.me/buildawesome` のプレリリース版を明示してインストールします。公開サイトを更新する前に、別ブランチでビルド結果と主なURLを比べましょう。

## ページが出ない、CSSが読めない

- ページがない：コマンドを実行した場所と `dir.input` を見ます。`dir.input` が `src` なら、原稿は `src/` 以下です。
- CSSや画像がない：[パススルーコピー](https://www.11ty.dev/docs/copy/)の指定と、出力先のファイルを見ます。HTMLの参照URLも確認してください。
- 公開したのに古い：Pagesならデプロイしたブランチと公開URL、レンタルサーバーなら転送先の `public_html` を確認します。

## ビルドは通るのに記事一覧が違う

記事の `tags` と、一覧が参照するコレクション名を比べてください。順序が違う場合は[コレクションの仕様](https://www.11ty.dev/docs/collections/)を確認します。下書きが見えるなら、CSSで隠すのではなく、ビルド対象やコレクションの条件を直します。

このガイドの誤りを見つけたら、再現に使った原稿や設定とともに[Issues](https://github.com/nsh1l/unofficial-11tyjp/issues)へ知らせてください。
