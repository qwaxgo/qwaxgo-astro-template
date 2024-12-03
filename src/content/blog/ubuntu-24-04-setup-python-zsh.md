---
author: qwaxgo
pubDatetime: 2024-12-03T00:00:00Z
title: Ubuntu 24.04 LTS 初期設定備忘録 Python/Oh-My-Zsh編
slug: ubuntu-24-04-lts-first-setting-memorandum-python-zsh
featured: true
draft: false
tags:
  - 備忘録
  - Ubuntu
  - 環境構築
  - CTF
description: Ubuntu 24.04 LTSの初期設定が終わったので、Python環境とついでにZsh環境を構築していきます。
---

## 注意

初めましての方は初めまして。qwaxgoと申します。<br>
今回は中古で買ったHP Probook 430 G8に、Ubuntu24.04 LTSを入れ、初期設定を終えたので<br>
Python環境と、ついでにZsh環境を構築します。

[Inspiron 14 2-in-1 ノートパソコン(AMD)](https://www.dell.com/ja-jp/shop/laptops/amd/spd/inspiron-14-7445-2-in-1-laptop/oic7445200201monojp)

[前回の記事](https://qwaxgo.com/blog/ubuntu-24-04-lts-first-setting-memorandum-hack-lab-host-os/)

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

### Zshの導入

最初の記事で入れたZshについて、今回はOh My Zsh!を使用する。<br>
[参考:いい加減Oh My Zsh!を入れた](https://zenn.dev/hironobu0824/articles/oh_my_zsh_install)

#### Oh-My-Zshインストール

途中でシェルをbashからzshに変更するかどうか聞かれるので、迷わずyを入力

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

#### antigenのインストール

.zshrcを編集する前にプラグインマネージャーを入れておく

```zsh
curl -L git.io/antigen > ~/antigen.zsh
```

#### .zshrcの編集

`source $ZSH/oh-my-zsh.sh`の前に以下を追加

```zsh
source $HOME/antigen.zsh
```

`plugins=(git)`を削除して、任意のプラグインを追加する。

```zsh
antigen bundle git
antigen bundle aliases
antigen bundle copypath
antigen bundle history
antigen bundle docker
antigen bundle github
antigen bundle npm
antigen bundle nvm
antigen bundle node
antigen bundle jake-node
antigen bundle pip
antigen bundle python
antigen bundle pyenv
antigen bundle virtualenv
antigen bundle debian
antigen bundle systemd
antigen bundle battery
antigen bundle emoji-clock
antigen bundle themes
antigen bundle zsh-users/zsh-completions
antigen bundle zsh-users/zsh-autosuggestions
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-history-substring-search
antigen bundle zsh-users/zsh-docker

antigen apply
```

ターミナルを再起動すると、プラグインがインストールされる。
詳しい設定は後日行う。

### Pythonの導入

Python.jpでは自前でビルドを行うことが推奨されているが、<br>
どのみちvenvなどの仮想環境を使うことを考えると、pyenvを導入したほうが良いという結論になった。

[参考:Ubuntu環境のPython: Python環境構築ガイド -python.jp](https://www.python.jp/install/ubuntu/index.html)

#### ビルド用ライブラリのインストール

```zsh
sudo apt install build-essential libbz2-dev libdb-dev \
  libreadline-dev libffi-dev libgdbm-dev liblzma-dev \
  libncursesw5-dev libsqlite3-dev libssl-dev \
  zlib1g-dev uuid-dev tk-dev
```

#### Pythonの必須ツールのインストール

```zsh
sudo apt -y install python-is-python3 python-dev-is-python3 python3-pip python3-venv

```

#### pyenvのインストール

現在は以下のコマンドで一発で入るようになった。<br>
このコマンドでインストールする場合は、[アップデート用のプラグイン](https://github.com/pyenv/pyenv-update)まで一緒に入れてくれる。

```zsh
curl https://pyenv.run | bash
```

#### 環境変数の記述

pyenvの環境変数を記述する必要がある。<br>
`~/.profile`及び`~/.zprofile`に以下を追記する。

```zsh
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
```

追記後は一度再起動しよう。

#### python 3.12.3インストール

```zsh
pyenv install 3.12.3
```
