---
author: qwaxgo
pubDatetime: 2024-05-06T00:00:00Z
title: Ubuntu 24.04 LTS 初期設定備忘録 最低限編
slug: ubuntu-24-04-lts-first-setting-memorandum-minimum
featured: true
draft: true
tags:
  - 備忘録
  - Ubuntu
  - 環境構築
description: Ubuntu 24.04 LTSを導入したので、初期設定していきます。
---

## 注意

初めましての方は初めまして。qwaxgoと申します。  
今回は初任給を使ってDellで購入したInspiron 14 7445 2-in-1に、Ubuntu24.04 LTSを入れ、初期設定を行います。

[Inspiron 14 2-in-1 ノートパソコン(AMD)](https://www.dell.com/ja-jp/shop/laptops/amd/spd/inspiron-14-7445-2-in-1-laptop/oic7445200201monojp)

## インストール

### 用意するもの

- PC本体
- USBメモリ

既にしてしまったので、テキストで説明させて頂く。
今回はメモリ16GB、SSD1TB想定でやっていく。

インストール方法としては、まずはWindowsの機能で、予めWindowsのパーティションを200GBぐらいに縮める。
私はここですぐにUbuntu/Windows11間の共有パーティションをNTFSで作ってしまったのですが、これが大きな落とし穴だった。

次に、USBメモリを刺した状態でPCを一度シャットダウンし、再度電源を入れる。
この状態でF12を長押ししてブートメニューを開き、UbuntuをUSBからブートする。
なお、Ubuntuはセキュアブートに対応しているため、基本的にセキュアブートの無効化は不要。
…が、Nvidia GPU搭載ノートPCの場合は、セキュアブートを有効化しているとドライバを入れるのに苦労するようで。
面倒な方は無効化、セキュリティを重視したい方はNvidiaドライバーの署名方法を各自調べて頂ければ。
今回はオンボードなので割愛する。

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
「Windowsとの共存」は選ばずに手動パーティショニングを選ぶ。
なおこの後の作業で、**Windowsが入っているパーティションや、回復パーティションをぶっ飛ばさないように注意。**

まずは縮めたパーティションがWindowsやら回復パーティションやら除いて800GBほど残っているので
Ubuntuのroot領域を200GB程度取る。
200GBのパーティションをext4形式で作り、マウントポイントとして/(ルート)を選択する。

次に、これはお好みですが、私はswapパーティションをメインメモリの倍の32GBほど取った。

最後に、残りの500GB程度をNTFSでフォーマットするが、**インストール時には何もマウントしないように。**

ここで最初の私は、NTFSファイルシステムのパーティションを/homeディレクトリにマウントしてインストールしたが
それをやると、NTFSファイルシステムの仕様で、**/homeディレクトリ以下のファイルのパーミッションが変えられなくなる。**
そのため、私は/homeディレクトリを直接マウントするのをやめ、個人フォルダ毎にホームディレクトリにシンボリックリンクを張る方式を取ることにした。

また、以下の記事を参考に、Ubuntuのブートローダーを、Windows Boot Managerとは別のパーティションに入れようとしたが
Ubuntuのインストーラの仕様で、先頭のパーティションでWindows Boot Managerと共存させないと次に進めなかったので
泣く泣くWindows Boot Managerのパーティションに入れた。
恐らく、これは面倒なことに手動で移すしかなさそうだが、万が一のことがあってもGRUBを再インストールすれば済むらしいので、一先ず今回は先に進む。

[参考:ブートローダーはWindows Boot Managerのまま、WindowsとLinuxでデュアルブート](https://w.atwiki.jp/linuxjapanwiki/pages/116.html)

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

Fcitx使用時にprofileに書き込んでいた環境変数だが
ArchWikiによると、Xwaylandを使用するアプリケーションにのみ必要なもので
グローバル設定はすべきでないらしいので一先ずこのままに。
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

snapから導入し、日本語入力が出来ることを確認した。

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

~~Snap版VSCodeは日本語入力が使えないという情報があったが、~~
~~Discordでは可能だったのでもしやと思って入れたら、普通に動いた。~~

【2024/06/08追記】Snap版VSCode使ってたのですが
GitHub Copilotの予測が暴走して日本語入力が削除できないみたいな良く分からん不具合が発生しているので
deb版に戻しました。

VSCode公式HPから`.deb`ファイルをダウンロードして、
以下のコマンドを実行してインストールして下さい(バージョンは適宜置き換え)
```bash
sudo apt install ./code_x.xx.x-xxxxxxxxxx_amd64.deb

```

詳しい手順は割愛するが、ログインして拡張機能を導入する。
ちなみに、GitHubは先ほど導入したgh(github-cli)を使うと、
SSHログインや鍵の生成まで自動でやってくれるので楽である。

#### GNOME関連

##### パッケージ

GNOME拡張機能を使えるようにし、追加の設定もできるようにする。

```
sudo apt install gnome-tweaks gnome-browser-connector
```

##### GNOME拡張機能

お使いのブラウザ(今回はVivaldi)にGNOME拡張機能をインストールする
[GNOME Shell 拡張機能](https://extensions.gnome.org)

### 時刻ズレの防止

ArchWikiによると、Windows側でUTCを使えばWindowsをしばらく起動しなくてもいいので、そちらを推奨するらしいが
レジストリを変更したり、NTPデーモンを動かしたりして面倒な上
Windowsはドット絵描きやゲーム等で使う予定なので
デメリットを受け入れてUbuntu側をLocaltimeに設定する。
[参考:Windowsとのデュアルブート - ArchWiki](https://wiki.archlinux.jp/index.php/Windows_%E3%81%A8%E3%81%AE%E3%83%87%E3%83%A5%E3%82%A2%E3%83%AB%E3%83%96%E3%83%BC%E3%83%88#.E6.99.82.E5.88.BB.E7.B3.BB)

### 個人データフォルダのマウント・リンク張り

まずはNTFSデータパーティションをマウントする。

[参考:「Linux」でドライブの自動マウントを有効にするには - ZDNET Japan](https://japan.zdnet.com/article/35204011/)

#### マウントするドライブの名前を確認する。

```bash
lsblk
```

#### マウントポイントを作成する

```bash
sudo mkdir /data
```

#### 新しいディレクトリの所有者をユーザーに変更する。

`qwaxgo`の部分は適宜自分のユーザー名に読み替える。
子フォルダーにも所有者の変更を適用するため、`-R`オプションは忘れずに。

```bash
sudo chown -R qwaxgo:qwaxgo /data
```

#### `/etc/fstab`に項目を追加する。

```bash
sudo vim /etc/fstab
```

エディタを開いたら、ファイルの最後に項目を追加する。
…のだが、ntfsパーティションの仕様上、少し以下の参考記事に伴い、追加の一手間が必要になる。
[参考:permissions - How do I use 'chmod' on an NTFS (or FAT32) partition? - Ask Ubuntu](https://askubuntu.com/questions/11840/how-do-i-use-chmod-on-an-ntfs-or-fat32-partition)
私の場合は`/dev/nvme0n1p6`がセカンダリードライブである。
`/dev/nvme0n1p6`の部分は、`lsblk`の出力結果に伴い、各々変更して頂きたい。
なお、`,`の後にスペースを開けると構文エラーになるので注意。

```
/dev/nvme0n1p6 /data ntfs-3g auto,users,permissions 0 0
```

書き終わったら`wq`で保存する。

#### マウント

最後に、一度設定したパーティションがアンマウントされていることを確認した上で、

```
mount -a
```

そして、新しいディレクトリの所有者をもう一度ユーザーに変更する。
`qwaxgo`の部分は適宜自分のユーザー名に読み替える。
子フォルダーにも所有者の変更を適用するため、`-R`オプションは忘れずに。

```bash
sudo chown -R qwaxgo:qwaxgo /data
```

最後に、再起動してマウントは完了。

#### リンクを張る

マウントしたNTFSデータパーティションに、共有したいデータフォルダを移動し
そこからシンボリックリンクを張る。
パスは各々置き換えて頂きたい。

```bash
ln -s /data/Pictures /home/qwaxgo/Pictures
```

### OneDriveのセットアップ

[参考:Ubuntuのonedriveをマルチアカウントに対応するための手順【備忘録】 - Qiita](https://qiita.com/rubbadah/items/47fd22b64ff7e477cff7)

家族でOneDrive(Microsoft 365)を使用しているのでそのセットアップを行う。

#### マウント先フォルダ作成

同期したい個人フォルダのシンボリックリンクを一旦削除しておく。

```bash
mkdir /data/OneDrive
```

##### 複数アカウントの利用も想定し、アカウント毎に分ける。

名前は任意で。

```bash
mkdir /data/OneDrive/qwaxgo
```

```bash
mv /data/Pictures /data/OneDrive/qwaxgo/Pictures
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

ブラウザでログイン画面が表示されるので、
ログインに成功してアカウント連携したら
アドレスバーのアドレスをターミナルに貼り付けて認証完了。

#### 同期

常に同期させるように設定する。

```bash
onedrive --monitor --confdir="~/.config/onedriveMyAccount1" &
```

#### 自動起動

```bash
systemctl --user enable --now onedriveqwaxgo
```

#### リンクの張り直し

日本語でWindowsを使用している場合、同期フォルダ名が日本語になるので
そのフォルダを個人フォルダにリンクして完了。。
以下は一例。

```bash
ln -s /data/OneDrive/qwaxgo/ミュージック ~/Music
```

## 続く

閲覧ありがとうございました！！
