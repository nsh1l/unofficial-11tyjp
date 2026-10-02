# Eleventy / Build Awesome 日本語ガイド

Eleventy / Build Awesomeを日本語で学ぶための非公式コミュニティガイドです。

## 開発

このサイトはEleventy 3.1.6で構築しています。ガイド本文ではNode.js/npmとBunの手順を並べています。この作業ツリーではBunを使います。

```sh
bun install
bun run start
```

ビルドと生成結果の簡易チェック:

```sh
bun run check
```

画面の案内には[Web Awesome](https://webawesome.com/docs) 3.14.0のTagとCalloutを使っています。公式CDNの固定バージョンを読み込み、読み込めない場合も本文とリンクは表示されます。Eleventy / Build Awesomeとは別のUIコンポーネントライブラリです。

## 公開

公開先は [Cloudflare Pages](https://unofficial-11tyjp.pages.dev/) の `unofficial-11tyjp` プロジェクトです。現時点ではGit連携を設定していません。`main` へのpushだけでは公開されず、ローカルでチェックした `_site/` をWranglerで手動デプロイします。デプロイ時は対象プロジェクトと最新コミットを確認してください。

```sh
bun run check
wrangler pages deploy _site --project-name unofficial-11tyjp --commit-hash "$(git rev-parse HEAD)"
```

デプロイ後はPagesの履歴と公開URLの本文・CSSを読み戻します。自動デプロイを導入するまでは、この手順を飛ばさないでください。

## ライセンス

- ドキュメント: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（特記がない場合）
- ソースコード・設定・サンプル: [MIT](./LICENSE)
- 第三者の商標・引用・素材は各権利者の条件に従います。

## 貢献

誤りや改善案はGitHub Issuesへ。修正提案はPull Requestで歓迎します。
