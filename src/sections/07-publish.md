---
title: 実践・公開
summary: 原稿の確認からCloudflare Pagesやレンタルサーバーへの公開まで。
order: 7
tags: [section]
layout: base.njk
permalink: /publish/
---
# 実践・公開

原稿を書いたら、手元で表示と差分を確かめ、ビルドしたHTMLを公開します。ここでは原稿が `src/`、出力が `_site/` にあるサイトを例に、Cloudflare Pagesとレンタルサーバーへの公開方法を説明します。

## 原稿を編集し、ローカルで確認する

Markdownを保存したら、開発サーバーを起動します。このリポジトリでは `bun run start`。npmで同じスクリプトを設定しているなら `npm run start` です。表示されたURLを開き、見出し・画像・リンクを見ます。公開してはいけない情報が原稿にないかも確認してください。

`git diff` と `git status` で変更を確認してから、`bun run build` または `npm run build` を実行します。`_site/index.html` と記事のHTMLを開き、CSSが `_site/assets/` に出ているか見ます。下書きが混ざっていたら、まだアップロードしないでください。

## Cloudflare Pages：GitHubとつなぐ

[PagesのGit連携](https://developers.cloudflare.com/pages/get-started/git-integration/)でGitHubのリポジトリと本番ブランチを選びます。このサイトと同じ構成なら、ビルドコマンドは `bun run build`、出力先は `_site`。PagesでBunが使える設定かどうかもビルドログで確認してください。npmを使うサイトなら `npm run build` と、そのサイトの出力先を指定します。

本番ブランチへpushするとPagesがビルドを始めます。**pushできても、公開できたとは限りません。** デプロイ履歴で成功を確認し、公開URLで記事とCSSを開いてください。失敗したらビルドログのエラーを見ます。[CloudflareのEleventy向け手順](https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/)も参考になります。

Git連携を使わないなら、手元でビルドした `_site/` を[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)できます。作成後に公開方式を切り替えるには制限があるので、自動公開を使う予定なら新規作成時にGit連携を選んでください。なお、このガイドの公開サイトはDirect Uploadで運用しています。

## XServerなどのレンタルサーバー：生成物を置く

レンタルサーバーには**`_site/` の中身**を転送します。`_site` ディレクトリごと置くと、トップページの場所がずれてしまいます。[エックスサーバーのドメイン設定](https://www.xserver.ne.jp/manual/man_domain_setting.php)なら、対象ドメインの `public_html` に `index.html` が入るようにします。

[ファイルマネージャー](https://www.xserver.ne.jp/manual/man_tool_file.php)か、[FileZilla](https://www.xserver.ne.jp/manual/man_ftp_filezilla_setting.php)などで転送します。既存サイトを上書きするなら、先にバックアップを取ってください。暗号化されないFTPは避け、契約先が案内する安全な接続方式を使います。転送後はトップ、記事、CSSを公開URLで開いて確かめます。

ファイルを手で転送する方式では、GitHubへpushしても公開サイトは更新されません。自動化する場合はCIと転送用の認証情報を別途用意します。
