# ベースイメージとして devcontainers/typescript-node を使用
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    sudo \
    zsh \
    && rm -rf /var/lib/apt/lists/*

# リポジトリをクローンして setup.sh を実行
RUN git clone https://github.com/qwaxgo/zsh-config.git ~/zsh-tmp \
    && cd ~/zsh-tmp \
    && chmod +x setup.sh \
    && ./setup.sh

# 作業ディレクトリを設定
WORKDIR /app
