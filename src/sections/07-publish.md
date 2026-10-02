---
title: 実践・公開
summary: Markdownの編集からプレビュー、ビルド、公開までを通します。
order: 7
tags: [section]
layout: base.njk
permalink: /publish/
---
# 実践・公開

公開までの流れは、原稿を書く → ローカルで見る → 差分を確認する → ビルドする → 生成物を公開する、です。Cloudflare Pagesとレンタルサーバーでは、最後の「公開する」の方法が違います。ここではこのガイドの構成（原稿は `src/`、出力は `_site/`）を例に説明します。

## 原稿を編集し、ローカルで確認する

Markdownの記事を保存したら、開発サーバーを起動します。このリポジトリなら `bun run start`。Node.js/npmで作った同じ構成なら `npm run start` です。ターミナルに出たURLを開き、見出し・画像・内部リンクを確認します。原稿に個人情報や公開前の情報が紛れ込んでいないかも、この段階で読み返します。

次に `git diff` と `git status` で変更ファイルを確認します。公開用のビルドは `bun run build` または `npm run build`。`_site/index.html` と記事の出力HTMLを実際に開きます。CSSも `_site/assets/` に入っているか確認してください。生成物に下書きが含まれていたら、アップロード前に止めます。

## Cloudflare Pages：GitHubとつなぐ

[PagesのGit連携](https://developers.cloudflare.com/pages/get-started/git-integration/)でGitHubリポジトリを選び、本番ブランチを指定します。このリポジトリの設定なら、ビルドコマンドは `bun run build`、出力ディレクトリは `_site` です。Pages側でBunを使える設定か、ビルドログも確認します。Node.js/npm構成のリポジトリなら `npm run build` と、その構成で生成される出力ディレクトリを指定します。

変更をコミットして本番ブランチへpushすると、Pagesがビルド・公開します。**GitHubへ送れたことと公開できたことは別**です。Pagesのデプロイ履歴で成功を確認し、公開URLで記事とCSSを開きます。デプロイに失敗したら、まずビルドログで依存パッケージと出力先を確認してください。[CloudflareのEleventy向け手順](https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/)も参考になります。

Git連携をしない運用なら、ローカルでビルドした `_site/` を[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)する方法もあります。ただし新規プロジェクト作成時の方式と後から切り替えられる範囲には制限があります。自動公開を想定するなら、最初にGit連携を選ぶのが簡単です。

## XServerなどのレンタルサーバー：生成物を置く

レンタルサーバーには、ビルド済みの**`_site/` の中身**を転送します。`_site` ディレクトリごとアップロードすると、意図したトップページの位置がずれることがあります。対象ドメインの公開用ディレクトリを確認し、トップページの `index.html` がそこへ入るようにします。[エックスサーバーのドメイン設定](https://www.xserver.ne.jp/manual/man_domain_setting.php)では公開先に `public_html` を使います。

[ファイルマネージャー](https://www.xserver.ne.jp/manual/man_tool_file.php)や、[FileZillaの接続設定](https://www.xserver.ne.jp/manual/man_ftp_filezilla_setting.php)を使って転送します。既存サイトを上書きする前にはバックアップを取り、対象ディレクトリを取り違えないようにしてください。暗号化されないFTP接続は避け、契約サービスが案内する安全な接続方式を使います。転送後はトップと記事URL、CSSを公開側で開いて確認します。

レンタルサーバーへ置くだけでは、GitHubへのpush後に自動更新されません。自動化する場合は別途CIと転送用の認証情報が必要です。最初は手動転送で公開の境界をつかみ、それから自動化を考えても遅くありません。
