---
author: qwaxgo
pubDatetime: 2024-05-06T00:00:00Z
title: Ubuntu 24.04 LTS 初期設定備忘録 最低限編
slug: ubuntu-24-04-lts-first-setting-memorandum-minimum
featured: true
draft: true
tags:
  - レビュー
description: プライベート用PCとしてInspiron 14 7445 2-in-1を購入したので、レビューします。
---

## 注意

初めましての方は初めまして。qwaxgoと申します。  
今回は初任給を使ってDellで購入したInspiron 14 7445 2-in-1に、Ubuntu24.04 LTSを入れたので、初期設定をしますj。

[Inspiron 14 2-in-1 ノートパソコン(AMD)](https://www.dell.com/ja-jp/shop/laptops/amd/spd/inspiron-14-7445-2-in-1-laptop/oic7445200201monojp)

## インストール

### 用意するもの

- PC本体
- USBメモリ

既にしてしまったので、テキストで説明します。
今回はメモリ16GB、SSD1TB想定でやっていきます。

インストール方法としては、まずはWindowsの機能で、予めWindowsのパーティションを200GBぐらいに縮めます。
私はここですぐにUbuntu/Windows11間の共有パーティションをNTFSで作ってしまったのですが、これが大きな落とし穴でした。

次に、USBメモリを刺した状態でPCを一度シャットダウンし、再度電源を入れます。
この状態でF12を長押ししてブートメニューを開き、UbuntuをUSBからブートします。
なお、Ubuntuはセキュアブートに対応しているため、基本的にセキュアブートの無効化は不要です
…が、Nvidia GPU搭載ノートPCの場合は、セキュアブートを有効化しているとドライバを入れるのに苦労するようです。
面倒な方は無効化、セキュリティを重視したい方はNvidiaドライバーの署名方法を調べれば良いと思います。
今回はオンボードなので割愛します。

その後

- 言語を選択
- アクセシビリティを必要に応じて設定
- キーボードレイアウトを選択
- インターネット接続をする
- Ubuntuをインストールを選択
- 対話式インストールを選択
- 規定の選択拡張選択可を選ぶ
- プロプライエタリなソフトウェアを入れるかどうか決める

などして、ディスクのセットアップまで辿り着いたら
「Windowsとの共存」は選ばずに手動パーティショニングを選びます。
なおこの後の作業で、**Windowsが入っているパーティションや、回復パーティションをぶっ飛ばさないようにご注意ください。**

まずは縮めたパーティションがWindowsやら回復パーティションやら除いて800GBほど残っているので
Ubuntuのroot領域を200GB程度取ります。
200GBのパーティションをext4形式で作り、マウントポイントとして/(ルート)を選択します

次に、これはお好みですが、私はswapパーティションをメインメモリの倍の32GBほど取りました。

最後に、**残りの500GB程度は一先ず放置**で。

ここで最初の私は、NTFSファイルシステムのパーティションを/homeディレクトリにマウントしてインストールしたのですが
それをやると、NTFSファイルシステムの仕様で、**/homeディレクトリ以下のファイルのパーミッションが変えられなくなります。**
そのため、私は/homeディレクトリを直接マウントするのをやめ、個人フォルダ毎にホームディレクトリにシンボリックリンクを張る方式を取ることにしました。

また、以下の記事を参考に、Ubuntuのブートローダーを、Windows Boot Managerとは別のパーティションに入れようとしたのですが
Ubuntuのインストーラの仕様で、先頭のパーティションでWindows Boot Managerと共存させないと次に進めなかったので
泣く泣くWindows Boot Managerのパーティションに入れました。
恐らく、これは面倒なことに手動で移すしかなさそうですが、万が一のことがあってもGRUBを再インストールすれば済むらしいので、一先ず今回は先に進みます。

[ブートローダーはWindows Boot Managerのまま、WindowsとLinuxでデュアルブート](https://w.atwiki.jp/linuxjapanwiki/pages/116.html)

あとはアカウント設定なりタイムゾーンなりを決め、インストールを完了します。

## 初期設定

### 設定アプリ

Ubuntuの設定アプリを開き、

- 電源管理 -　バッテリー残量を表示するをON
  - 電源ボタンの挙動をサスペンドに
- 外観
  - スタイルをダーク及び好きな色に(私はマゼンタを選択)
  - 背景は後でいい
- Ubuntu Desktop(ここはお好み)
  - Auto-hide the DockをON
  - Panel Modeをオフ
  - Icon Sizeを64に
  - Position on Screenを下に
- アクセシビリティ(ここもお好み)
  - 大きな文字をON

### アップデート

次に、アップデートを行います。

#### aptのアップデート

```
sudo apt update
sudo apt upgrade
```

#### snapパッケージのアップデート

```
sudo snap refresh
```

### その他、必須設定

#### ディレクトリの英語化

```
LANG=C xdg-user-dirs-gtk-update
```

### 日本語入力

```
sudo apt install fcitx5 fcitx5-mozc fcitx5-config-qt fcitx5-frontend-all
```

Fcitx使用時にprofileに書き込んでいた環境変数だが
ArchWikiによると、Xwaylandを使用するアプリケーションにのみ必要なもので
グローバル設定はすべきでないらしいので一先ずこのままに。
[Fcitx5 - ArchWiki](https://wiki.archlinux.jp/index.php/Fcitx5)

### 必携アプリ

#### Logicoolドライバ

```
sudo apt install solaar
```

#### Vivaldi

```
sudo apt install vivaldi-stable
```

#### Discord

snapから導入し、日本語入力が出来ることを確認した。

```
snap install discord
```

### 開発関連

- URLからファイルを取得するcurl
- 設定ファイル編集に必要なvim
- バージョン管理システムのgit
- シェルを使いやすくするzsh(今回は設定しない)
- gitの認証を楽にするgh(github-cli)

```
sudo apt install curl vim git zsh gh
```

#### エディタ用フォント

まずはフォントがはいっているuniverseリポジトリを追加

```
sudo add-apt-repository universe
```

フォントをインストール

```
sudo apt install fonts-firacode
```

#### gitの初期設定

ユーザー名とメールアドレスは自分のものに

```
git config --global user.name "qwaxgo"
git config --global user.email "hogehoge@example.com"
```

#### VSCodeの導入

Snap版VSCodeは日本語入力が使えないという情報があったが、
Discordでは可能だったのでもしやと思って入れたら、普通に動いた。

```
snap install code
```

詳しい手順は割愛するが、ログインして拡張機能を導入する。
ちなみに、GitHubは先ほど導入したgh(github-cli)を使うと、
SSHログインや鍵の生成まで自動でやってくれるので楽である。

#### GNOME拡張機能

お使いのブラウザ(今回はVivaldi)にGNOME拡張機能をインストールする
[GNOME Shell 拡張機能](https://extensions.gnome.org)

## 開発編に続く

閲覧ありがとうございました！！
