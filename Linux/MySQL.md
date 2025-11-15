## 1. 構築環境

```bash
- OS: Rocky Linux release 9.0 (Blue Onyx)
- MariaDB Version: mariadb-server-10.5.16-2.el9_0.x86_64
```

## 2. SELinux の設定

### 2.1. 無効化手順 (推奨されない)
```bash
getenforce                    # 現在の状態確認 (Enforcing/Permissive/Disabled)
grubby --update-kernel ALL --args selinux=0  # SELinuxを無効化
reboot                        # サーバーを再起動
getenforce                    # 再起動後の状態確認 (Disabledになっていることを確認)
```

### 2.2. 有効化設定 (推奨)
- SELinux を有効化した状態で MariaDB を実行するには、適切なポリシー調整が必要です。
- 設定ファイルが `SELinux` ポリシーに合致するように調整します。

#### 2.2.1. SELinux ポリシーの確認と設定
```bash
getenforce                # 現在の状態確認 (Enforcing/Permissive/Disabled)

# MariaDB 用ポリシーの確認と許可設定
semanage port -l | grep 3306  # ポート 3306 が許可されているか確認

# もしポートが許可されていない場合:
semanage port -a -t mysqld_port_t -p tcp 3306

# ファイルコンテキストの確認と修正 (必要に応じて)
semanage fcontext -a -t mysqld_db_t "/var/lib/mysql(/.*)?"
restorecon -Rv /var/lib/mysql

# SELinux が有効かつ MariaDB が問題なく動作することを確認
systemctl restart mariadb.service
```

---

## 3. Firewalld の設定

### 3.1. 無効化手順 (推奨されない)
```bash
systemctl status firewalld.service        # 現在の状態確認
systemctl is-enabled firewalld.service    # 自動起動確認
systemctl disable firewalld.service       # 自動起動無効化
systemctl stop firewalld.service          # サービス停止
systemctl status firewalld.service        # 停止確認
```

### 3.2. 有効化設定 (推奨)
- 必要なポートだけを開放する設定。

```bash
systemctl enable firewalld.service
systemctl start firewalld.service

# MariaDB (3306) 用のポート開放
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --reload

# 設定確認
firewall-cmd --list-all
```

---

## 4. MariaDB インストール

### 4.1. インストールコマンド
```bash
dnf install mariadb mariadb-server
```

### 4.2. 確認
```bash
mariadb --version
```

---

## 5. MariaDB 設定

### 5.1. 文字コード設定 (utf8mb4 に変更)

#### 5.1.1. サーバー設定
```bash
cp -a /etc/my.cnf.d/mariadb-server.cnf /etc/my.cnf.d/mariadb-server.cnf.default
vi /etc/my.cnf.d/mariadb-server.cnf

[mariadb]
character-set-server = utf8mb4
```

#### 5.1.2. クライアント設定
```bash
cp -a /etc/my.cnf.d/client.cnf /etc/my.cnf.d/client.cnf.default
vi /etc/my.cnf.d/client.cnf

[client-mariadb]
default-character-set = utf8mb4
```

---

## 6. サービス起動

### 6.1. 起動・有効化コマンド
```bash
systemctl enable mariadb.service
systemctl start mariadb.service
systemctl status mariadb.service
```

---

## 7. 初期設定

```bash
mysql_secure_installation
```

### 7.1. セキュリティ強化プロセス
- root ユーザーのパスワード設定。
- 匿名ユーザー削除。
- リモートからの root ログイン無効化。
- テストデータベース削除。
- 権限テーブルの再読み込み。

---

## 8. データベースへのログイン確認
```bash
mysql -u root -p
Enter password: (設定した root パスワード)

show variables like 'char%';  # 文字コード設定確認
```

---

## 9. 動作確認方法
- MariaDB サービスが起動していることを確認する:
```bash
systemctl status mariadb.service
```
- 文字コード設定が正しく反映されていることを確認する:
```bash
SHOW VARIABLES LIKE 'character%';
```

---

## 10. トラブルシューティング例

### 10.1. サービス起動エラー
- エラーログ確認:  
```bash
journalctl -xe
```
- my.cnf 設定ファイルの記述ミスを確認し、修正する。

### 10.2. ポート 3306 が開放されていない
- 確認コマンド:  
```bash
ss -ltnp | grep 3306
```
- Firewalld が無効化されていない場合は、ポートを許可する。

### 10.3. ログインエラー
- `Access denied for user 'root'@'localhost'` の場合:
```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY '新しいパスワード';
FLUSH PRIVILEGES;
```
