# 1. クイックスタート

### インストール

```bash
$ sudo dnf install git
```

### SSH接続準備

🔸SSH-Keyペア作成

```bash
$ ssh-keygen -t ed25519
```

🔹実行結果例

```bash
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/<ユーザー名>/.ssh/id_ed25519):★Enter
Created directory '/home/username/.ssh'.
Enter passphrase (empty for no passphrase):★Enter
Enter same passphrase again:★Enter
Your identification has been saved in /home/<ユーザー名>/.ssh/id_ed25519
Your public key has been saved in /home/<ユーザー名>/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:UyynlysZ+Ns2IKsk1Inrt/g/6sGnLkksfLltBGiPExo <ユーザー名>@hostname
The key's randomart image is:
+--[ED25519 256]--+
|                 |
|         .       |
|  .     . +      |
|E+ + . . = .     |
|+o* = . S o      |
|o=o* ....= .     |
| o=.B .o+..      |
| .o=.*o  +o      |
|  o*X=......     |
+----[SHA256]-----+
```

🔸権限付与

```bash
$ chmod 700 ~/.ssh
$ chmod 600 ~/.ssh/id_ed25519
$ chmod 644 ~/.ssh/id_ed25519.pub
```

🔸公開鍵登録

- GitHubにログインします。
- 「右上のプロフィールアイコン > Settings」の順にクリックします。
- 左サイドバーの「SSH and GPG keys」をクリックします。
- 「New SSH key」ボタンをクリックします。
- Titleを入力 (例: My Laptop)
- Keyにコピーした公開鍵(id_ed25519.pub)を貼り付けします。
- 「Add SSH key」をクリックします。

🔸操作端末側で接続先情報登録

```bash
$ vi ~/.ssh/config
Host github.com
  HostName github.com
  User <ユーザー名>
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```

🔸接続確認

```bash
$ ssh -T git@github.com
```

🔹実行結果例

```bash
Hi <ユーザー名>! You've successfully authenticated, but GitHub does not provide shell access.
```

### 初期化

初期ブランチ設定

```bash
$ git config --global init.defaultBranch main
```

初期化

```bash
$ git init
```

### ユーザー情報設定

追加

```bash
$ git config --global user.name "<ユーザー名>"
$ git config --global user.email "<メールアドレス>"
```

確認

```bash
$ git config --global --list
```

ディレクトリ名(大文字小文判別)

```bash
$ git config --global core.ignorecase false
```

### エディタ指定

```
git config --global core.editor vim
git config --get core.editor
```

### Origin登録

登録

```bash
$ git remote add origin git@github.com:USERNAME/リポジトリ名>.git
```

確認

```bash
$ git remote -v
```

削除

```bash
$ git remote rm origin
```

# 2. リポジトリクローン

### クローン

```bash
$ git clone <git@github.com:<ユーザー名>/<リポジトリ名>.git
```

# 3. 各種操作

### GitHUBの最新情報を取得

ローカルリポジトリへ反映

```bash
$ git fetch origin
```

ワークツリーへ反映

```bash
$ git merge origin/main
```

or

ローカルリポジトリ&ワークツリーへ反映

```bash
$ git pull origin main
```

### ブランチ移動

```bash
$ git switch main
```

### 差分確認

git add前の差分(ワークツリーとステージの差分)

```bash
$ git diff
```

git add後の差分(ステージとリポジトリの差分)

```bash
$ git diff --staged
```

### 変更(ステージ追加)

ステージ追加コマンド（ファイル指定）

```bash
$ git add ファイル名
```

ステージ追加コマンド（全ファイル）

```bash
$ git add .
```

取り消し

```
git rm --cached -r .
```

### 変更状況確認

変更なし

```bash
$ git status
On branch main
nothing to commit, working tree clean
```

ステージ追加済み

```bash
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   Git.md

no changes added to commit (use "git add" and/or "git commit -a")
```

コミット済み

```bash
$ git status
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

### コミット

コミットコマンド

```bash
$ git commit
$ git commit -m "メッセージ"
$ git commit -v
```

直前のコミット取り消し

```bash
$ git reset --soft HEAD^
```

### 変更履歴確認

変更履歴確認コマンド

```bash
$ git log
$ git log -p ファイル名
$ git log -n
```

### リモートPush

初回

```bash
$ git push -u origin main
```

初回以降

```bash
$ git push
```

### ファイル操作

ファイル削除コマンド

```bash
$ git rm ファイル名
```

ディレクトリ削除コマンド

```bash
$ git rm -r ディレクトリ名
```

管理対象削除コマンド

```bash
$ git rm --cached ファイル名
```

ファイル移動コマンド

```bash
$ git mv 旧ファイル 新ファイル
```

ディレクトリ名変更コマンド

```bash
$ git mv 旧フォルダ/ フォルダ/
```

※フォルダ内にファイルがない場合、fatalが発生します。
fatal: source directory is empty, source=imagea, destination=Image

ファイル作成後、ステージへ移動することで、フォルダ名の変更が可能になります。

```bash
$ touch フォルダ/.gitkeep
$ git add フォルダ/.gitkeep
```

ファイル名(大文字小文字変換)

```bash
$ git mv -f file.js File.js
```

特定時点にコミットを戻す

```bash
$ git reset --hard 8cc6657
```

### ブランチ削除

```bash
$ git checkout main
$ git push origin --delete dev
$ git branch -D dev
```

# 4. 実践

### mainからfeatureブランチ作成

mainブランチからfeatureブランチを作成して、featureブランチでコードの修正を実施します。

```bash
$ git branch
* main
$ git checkout -b feature
$ git branch
* feature
  main
$ git push -u origin feature
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote: 
remote: Create a pull request for 'feature' on GitHub by visiting:
remote:      https://github.com/YUKITASAKI/cloudformation/pull/new/feature
remote:
To github.com:YUKITASAKI/cloudformation
 * [new branch]      feature -> feature
branch 'feature' set up to track 'origin/feature'.
```

### コード修正後、更新

```bash
$ git add xxx
$ git commit -m ""
```

### リモート(origin/main)の変更を取り込む

🔸merge

```
$ git fetch
$ git merge origin/main
```

コンフリクト発生時は競合の解消を実施後、以下コマンドを実施します。

```
$ git add xxx
$ git merge --continue
```

🔸rebase

```bash
$ git fetch
$ git rebase origin/main
```

コンフリクト発生時は競合の解消を実施後、以下コマンドを実施します。

```bash
$ git add xxx
$ git rebase --continue
```

### featureブランチをリモートレポジトリにPush

```bash
$ git push origin feature
```

### Pull Requestを作成する

コーディング担当はプルリクエストを作成する

### Pull Requestをマージする

レビュワーは内容を確認して、問題ない場合、mainにマージする。