---
author: qwaxgo
pubDatetime: 2024-12-03T00:00:00Z
title: Ubuntu 24.04 LTS 初期設定備忘録 最低限編
slug: ubuntu-24-04-lts-first-setting-memorandum-minimum
featured: true
draft: false
tags:
  - 備忘録
  - Ubuntu
  - 環境構築
description: Ubuntu 24.04 LTSを導入したので、初期設定していきます。
---

## 注意

初めましての方は初めまして。qwaxgoと申します。<br>
今回は中古で買ったHP Probook 430 G8に、Ubuntu24.04 LTSを入れ、初期設定を行います。

## インストール

### 用意するもの

- PC本体
- USBメモリ

既にしてしまったので、テキストで説明させて頂く。<br>
今回はメモリ16GB、SSD256GB想定でやっていく。今度増設する。<br>

デュアルブートはしないので、Windows側からBitlockerの無効化だけする。<br>

次に、USBメモリを刺した状態でPCを一度シャットダウンし、再度電源を入れる。<br>
この状態でF12を長押ししてブートメニューを開き、UbuntuをUSBからブートする。<br>
なお、Ubuntuはセキュアブートに対応しているため、基本的にセキュアブートの無効化は不要。<br>
…が、Nvidia GPU搭載ノートPCの場合は、セキュアブートを有効化しているとドライバを入れるのに苦労するようで。<br>
面倒な方は無効化、セキュリティを重視したい方はNvidiaドライバーの署名方法を各自調べて頂ければ。<br>
今回はオンボードなので割愛する。<br>

その後

- 言語を選択
- アクセシビリティを必要に応じて設定
- キーボードレイアウトを選択
- インターネット接続をする
- Ubuntuをインストールを選択
- 対話式インストールを選択
- 規定の選択拡張選択可を選ぶ
- プロプライエタリなソフトウェアを入れるかどうか決める
- デュアルブートしない場合、パーティションを全削除

あとはアカウント設定なりタイムゾーンなりを決め、インストールを完了。

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
  - Configure Dock Behaviorでボリュームとデバイスを表示するをオフに
- アクセシビリティ(ここもお好み)
  - 大きな文字をON

### アップデート

次に、アップデートを行う。

#### aptのアップデート

```bash
sudo apt update
sudo apt upgrade
```

#### snapパッケージのアップデート

```bash
sudo snap refresh
```

### その他、必須設定

#### ディレクトリの英語化

```bash
LANG=C xdg-user-dirs-gtk-update
```

### 日本語入力

```bash
sudo apt install fcitx5 fcitx5-mozc fcitx5-config-qt fcitx5-frontend-all
```

Fcitx使用時にprofileに書き込んでいた環境変数だが<br>
ArchWikiによると、Xwaylandを使用するアプリケーションにのみ必要なもので<br>
グローバル設定はすべきでないらしいので一先ずこのままに。<br>
[参考:Fcitx5 - ArchWiki](https://wiki.archlinux.jp/index.php/Fcitx5)

### 必携アプリ

#### Logicoolドライバ

```bash
sudo apt install solaar
```

#### Vivaldi

```bash
sudo apt install vivaldi-stable
```

#### Discord

snapから導入し、日本語入力が出来ることを確認した。<br>

```bash
snap install discord
```

### 開発関連

- URLからファイルを取得する`curl`
- 設定ファイル編集に必要な`vim`
- バージョン管理システムの`git`
- シェルを使いやすくする`zsh`(今回は設定しない)
- gitの認証を楽にする`gh(github-cli)`
- パッケージのビルドに必須な`build-essencial`

```bash
sudo apt install curl vim git zsh gh build-essential
```

#### エディタ用フォント

まずはフォントがはいっている`universe`リポジトリを追加

```bash
sudo add-apt-repository universe
```

フォントをインストール

```bash
sudo apt install fonts-firacode
```

#### gitの初期設定

ユーザー名``qwaxgo`とメールアドレスは自分のものに

```bash
git config --global user.name "qwaxgo"
git config --global user.email "hogehoge@example.com"
```

#### VSCodeの導入

~~Snap版VSCodeは日本語入力が使えないという情報があったが、~~<br>
~~Discordでは可能だったのでもしやと思って入れたら、普通に動いた。~~

【2024/06/08追記】Snap版VSCode使ってたのですが<br>
GitHub Copilotの予測が暴走して日本語入力が削除できないみたいな良く分からん不具合が発生しているので<br>
deb版に戻しました。

VSCode公式HPから`.deb`ファイルをダウンロードして、<br>
以下のコマンドを実行してインストールして下さい(バージョンは適宜置き換え)<br>

```bash
sudo apt install ./code_x.xx.x-xxxxxxxxxx_amd64.deb

```

詳しい手順は割愛するが、ログインして拡張機能を導入する。<br>
ちなみに、GitHubは先ほど導入したgh(github-cli)を使うと、<br>
SSHログインや鍵の生成まで自動でやってくれるので楽である。

#### GNOME関連

##### パッケージ

GNOME拡張機能を使えるようにし、追加の設定もできるようにする。<br>

```
sudo apt install gnome-tweaks gnome-browser-connector
```

##### GNOME拡張機能

お使いのブラウザ(今回はVivaldi)にGNOME拡張機能をインストールする<br>
[GNOME Shell 拡張機能](https://extensions.gnome.org)

### OneDriveのセットアップ

[参考:Ubuntuのonedriveをマルチアカウントに対応するための手順【備忘録】 - Qiita](https://qiita.com/rubbadah/items/47fd22b64ff7e477cff7)<br>

家族でOneDrive(Microsoft 365)を使用しているのでそのセットアップを行う。

#### マウント先フォルダ作成

同期したい個人フォルダのシンボリックリンクを一旦削除しておく。

```bash
mkdir ~/OneDrive
```

##### 複数アカウントの利用も想定し、アカウント毎に分ける。

名前は任意で。

```bash
mkdir ~/OneDrive/qwaxgo
```

```bash
mv ~/Pictures ~~/OneDrive/qwaxgo/Pictures
```

#### OneDriveクライアントのインストール

先ほど追加した`universe`リポジトリから、onedriveをインストールする

```bash
sudo apt get install onedrive
```

#### 設定ファイル作成

##### 設定ファイルの雛形をダウンロードする

```bash
mkdir -p ~/.config/onedrive
wget https://raw.githubusercontent.com/abraunegg/onedrive/master/config -O ~/.config/onedrive/config
nano ~/.config/onedrive/config
```

##### アカウント毎に設定ファイルを分ける

名前は任意で

```bash
mkdir ~/.config/onedriveqwaxgo
```

##### 雛形をコピーし、エディタで開く

```bash
cp ~/.config/onedrive/config ~/.config/onedriveqwaxgo/
vim ~/.config/onedriveqwaxgo/config
```

sync_dirをコメントアウトし、値を先程作成したディレクトリにして保存。

##### サービス用の設定ファイルをコピーし、エディタで開く

```bash
sudo cp /usr/lib/systemd/user/onedrive.service /usr/lib/systemd/user/onedriveqwaxgo.service
sudo vim /usr/lib/systemd/user/onedriveqwaxgo.service
```

ExecStartの値の後ろに`--confdir="~/.config/onedriveqwaxgo"`を付け加える(ディレクトリは適宜変更)

#### 起動

`--confdir`で設定ファイルを指定することを忘れずに

```bash
onedrive --confdir="~/.config/onedriveqwaxgo"
```

ブラウザでログイン画面が表示されるので、<br>
ログインに成功してアカウント連携したら<br>
アドレスバーのアドレスをターミナルに貼り付けて認証完了。

#### 同期

常に同期させるように設定する。

```bash
onedrive --monitor --confdir="~/.config/onedriveMyAccount1" &<br>

```

#### 自動起動

```bash
systemctl --user enable --now onedriveqwaxgo
```

#### リンクの張り直し

日本語でWindowsを使用している場合、同期フォルダ名が日本語になるので<br>
そのフォルダを個人フォルダにリンクして完了。<br>
以下は一例。

```bash
ln -s ~/OneDrive/qwaxgo/ミュージック ~/Music
```

## 続く

閲覧ありがとうございました！！
