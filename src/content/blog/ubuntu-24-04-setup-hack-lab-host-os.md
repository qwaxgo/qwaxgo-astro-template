---
author: qwaxgo
pubDatetime: 2024-05-06T00:00:00Z
title: Ubuntu 24.04 LTS 初期設定備忘録 CTF環境 ホストOS編
slug: ubuntu-24-04-lts-first-setting-memorandum-hack-lab-host-os
featured: true
draft: false
tags:
  - 備忘録
  - Ubuntu
  - 環境構築
  - CTF
description: Ubuntu 24.04 LTSの初期設定が終わったので、CTF用の環境を構築していきます。
---

## 注意

初めましての方は初めまして。qwaxgoと申します。  
今回は初任給を使ってDellで購入したInspiron 14 7445 2-in-1に、Ubuntu24.04 LTSを入れ、初期設定を終えたのでCTF環境を構築します。

[Inspiron 14 2-in-1 ノートパソコン(AMD)](https://www.dell.com/ja-jp/shop/laptops/amd/spd/inspiron-14-7445-2-in-1-laptop/oic7445200201monojp)

[前回の記事](https://qwaxgo.com/blog/ubuntu-24-04-lts-first-setting-memorandum-minimum/)

### アップデート

まず、アップデートを行います。

#### aptのアップデート

```
sudo apt update
sudo apt upgrade
```

#### snapパッケージのアップデート

```
sudo snap refresh
```

### VMware Workstation Proの導入(したかった)

**注意：本記事作成時点(2024/06/02)では、VMwareWorkstation ProがUbuntu 24.04 LTSのカーネルに対応しておらず利用できなかったため、気になる方以外は読み飛ばすことを推奨します。**

[参考:VMware Workstation Pro と VMware Fusion Pro の個人利用版が無償になったので使ってみた (2024 年 5 月) - Qiita](https://qiita.com/sanjushi003/items/b4ba2687f99412fd7c38)
[参考:Ubuntu20.04にVMWare Playerをインストールする - Qiita](https://qiita.com/kannkyo/items/b1cf86925ef5a6e30dfa)

折角無料化したので、今回はVirtualboxではなくこちらを導入したかった。

なお、ダウンロード前にBroadcomサポートポータルのユーザープロファイルの作成を済ませておくように。

まずは以下のリンク内の「VMWare Workstation Pro Download」をクリック
[VMware Fusion Pro: Now Available Free for Personal Use - VMware Fusion Blog](https://blogs.vmware.com/teamfusion/2024/05/fusion-pro-now-available-free-for-personal-use.html)

VMware Workstation Pro 17.0 for Personal Use(Linux)を選択
最新バージョンを選択
利用許諾のチェック
ダウンロードボタンを押す
この辺は上記の1つ目の参考記事を見ながらやる。

インストーラーをダウンロードしたら、インストーラーに実行権限を付け、管理者権限でインストーラーを実行
なお、バージョン番号は適宜読み替えて頂きたい。
…というか、VMまで打ってTabキー押せば自動で補完してくれる。

```bash
cd ~/Downloads
chmod a+x ./VMWare-Workstation-Full-xx.x.x-xxxxxxxx.x86_64.bundle
sudo chmod a+x ./VMWare-Workstation-Full-xx.x.x-xxxxxxxx.x86_64.bundle
```

#### 失敗要因

そしてUbuntuのアプリ一覧から起動！したが…

[参考:Ubuntu LinuxでVMware Workstation pro/playerを使うときの注意 - kashiの日記](http://verifiedby.me/adiary/0171#c2)

どうやらUbuntu 24.04 LTSの新しいカーネルに対応しておらず、初回起動時のカーネルモジュールのコンパイルでエラーになってしまうらしい。
自分でカーネルをコンパイルする必要があるが、今回は面倒なので別のソフトを使う。

### Virtualbox

無料仮想環境として定番のVirtualboxをインストールする。

[参考:Secure BootなUbuntu 18.04にVirtualBox 6.0をインストール。もうそんなに難しくない。 - freefielder.jp](https://freefielder.jp/blog/2019/09/secure-boot-ubuntu-vbox.html)

```bash
sudo apt install virtualbox
```

ここでセキュアブートを有効化していると、システムのファームウェアに鍵を登録するよう言われるらしいので、上記の参考記事に従い、
`Configuring Secure Boot`と表示されたらEnterを押し、パスワードを入力する。
このパスワードは使い捨てのものらしいのだが、一応私はある程度の強度を持たせておく。
ただし、ややこしい記号を入れると、キーボード配列の違いでパスワードの認証に失敗する可能性があるので、
半角英数字程度に留めておくこと。どうせ使い捨てだしね。

<details>
<summary>パスワードの認証に失敗してしまった場合の対処法 by ChatGPT Plus </summary>
セキュアブートを有効化した状態でUbuntuにVirtualBoxをインストールした際に、MOK（Machine Owner Key）の登録が必要ですが、認証に失敗してしまうことがあります。この状況に対処するためには、以下の手順を試してみてください。

1. **Shim-signedパッケージの再インストール**:

   - 端末を開いて以下のコマンドを実行します。
     ```bash
     sudo apt-get install --reinstall shim-signed
     ```

2. **MOKの再登録の準備**:

   - 再インストールが完了したら、以下のコマンドを実行してMOKの再登録を準備します。
     ```bash
     sudo mokutil --import /var/lib/shim-signed/mok/MOK.der
     ```
   - コマンドを実行すると、新しいパスワードを入力するよう求められます。このパスワードは再起動後にMOK登録画面で必要となりますので、忘れないようにしてください。

3. **システムの再起動**:

   - パスワードの入力が完了したら、システムを再起動します。
     ```bash
     sudo reboot
     ```

4. **MOK管理の画面**:

   - 再起動後、MOK管理の青い画面が表示されます。この画面で「Enroll MOK」を選択し、次に進みます。
   - パスワードを入力するよう求められますので、先ほど設定したパスワードを入力します。
   - 「Yes」を選択して登録を完了します。

5. **登録が完了しない場合**:
   - 上記手順でも問題が解決しない場合、次の方法を試してください。
     - BIOSまたはUEFI設定でセキュアブートを一時的に無効化し、VirtualBoxをインストールしてMOKの登録を完了させます。その後、セキュアブートを再度有効化します。

これらの手順でMOKの登録が完了し、VirtualBoxが正常に動作することを確認してください。問題が解決しない場合や追加のヘルプが必要な場合は、さらに詳細な情報を提供してください。

</details>

パスワードを入れたらインストールが続くが、エラーを吐くので一旦再起動。
先ほど設定したパスワードを入力してMOKを登録したら、再度再起動
ターミナルに以下のコマンドを入れてインストールを完了する。

```bash
sudo apt install --reinstall virtualbox
```

拡張機能もインストールしておく

```bash
sudo apt install virtualbox-ext-pack virtualbox-guest-additions-iso virtualbox-guest-utils virtualbox-guest-x11
```

途中でライセンスへの同意が求められるので、よく読んでから同意する。

メニューからVirtualboxを起動するが、USBデバイスをエニュメレーションに失敗したというエラーが出た。
なのでvboxusersグループに自分のユーザーを追加。

```bash
sudo usermod -aG vboxusers qwaxgo
```

どうやらこの後は再起動が必要らしいので再起動し、無事解決。

#### ホストキーの確認

Virtualboxの起動が確認できたら、「ファイル」から「環境設定」を選択して
「入力」メニューの「仮想マシン」タブから「ホストキーの組み合わせ」の確認を行う。
普通はデフォルトでOKだが、私の機種には右Ctrlがないので、
右Shift+左Alt辺りに設定しておく。

### Kali Linux

私が勉強に使用する、IPUSIRON氏著の「ハッキング・ラボのつくりかた 完全版」ではParrot OSが推奨されていたが
そこに記載されていたKali LinuxとParrot OSの比較を読んでみたところ
自分の場合は十分Kaliでも補完できるだろうと考え、更にハッキングツールもKaliの方が多く
かつ私は何を隠そうドラゴンが好きなので、Kali Linuxを導入する。

[Get Kali | Kali Linux](https://www.kali.org/get-kali/#kali-installer-images)
[参考:ハッキング・ラボのつくりかた 完全版 仮想環境におけるハッカー体験学習](https://www.seshop.com/product/detail/25094)

構築済みVMもあるが、Kaliを触るのは初めてなのでインストーラーの導入から始める。

仮想環境の構築は各々好きなようにやってもらって構わないが、私の場合は先述の著書を参考にして以下の設定にした。
VDIではなくVMDKにしているのは、後々のVMWare移行を考慮してのことである。

- 名前:Kali Linux
- フォルダー: 他に作る環境も考慮すると容量が膨れ上がることを考慮し、データ用パーティションに退避
- ISO イメージ: 先ほどダウンロードしたものを選択
- タイプ: Linux
- バージョン: Debian(64-bit)
- 自動インストール: 使用不可
- メインメモリー: 4096MB
- プロセッサー数: 緑と赤の境目まで
- 仮想ハードディスク: 場所は既定、サイズは40.00GB
- ハードディスクのファイルタイプと種類:VMDK(Virtual Machine Disk)/事前割当てなし/2GBで分割もしない
  さらに、仮想マシンの起動前に設定で
- クリップボードの共有: 双方向
- ドラッグ&ドロップ: 双方向
- ビデオメモリー: 128GB
- USBコントローラー: USB 3.0
  を設定した。

Kali Linuxは頻繁に画面構成が変わると、先述の著書に書いてあったので
Kali Linuxのインストール手順については割愛させて頂く。
が、デスクトップ環境については、仮想環境で動かすことを考慮し、軽量なXfceを選択。
GNOMEはホストに使うには綺麗だけど、ゲストには贅沢だね。

今回のラストとして、Kali LinuxにGuest Additionsを導入する。
[参考:Kali Linux2022.1 でハッキングラボをつくってみる 3 設定編（Virtual Box Guest Additions,ネットワーク）- Qiita](https://qiita.com/kagirohi/items/6fc30a8af73158fcf682)
まずはパッケージの更新。

```
sudo apt update
sudo apt upgrade
```

そして、一度再起動してLinuxのカーネルヘッダーをインストール。

```
sudo apt install linux-headers-$(uname -r)
```

そうしたらGuest AdditionのCDを挿入して、CDのディレクトリに移動し

```
sudo sh ./VBoxLinuxAdditions.run
```

インストールが完了したら再起動する。
疲れたので続きは次回に持ち越しとする。
