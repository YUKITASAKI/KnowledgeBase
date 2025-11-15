## 1. 構築環境

```
- OS: Rocky Linux release 9.0 (Blue Onyx)
- PostgreSQL Version: postgresql-server-13.7-1.el9_0.x86_64
```

## 2. SELinux の設定

### 2.1. 無効化手順 (推奨されない)
```
getenforce                    # 現在の状態確認 (Enforcing/Permissive/Disabled)
grubby --update-kernel ALL --args selinux=0  # SELinuxを無効化
reboot                        # サーバーを再起動
getenforce                    # 再起動後の状態確認 (Disabledになっていることを確認)
```

### 2.2. SELinux を有効化した設定 (推奨)
- SELinux を有効にしたまま PostgreSQL を稼働させる設定。

```
getenforce  # Enforcing が返ることを確認

# PostgreSQL サーバーのポリシーを許可
setsebool -P postgresql_can_rsync 1

# 必要に応じてディレクトリのコンテキストを修正
semanage fcontext -a -t postgresql_db_t "/var/lib/pgsql/data(/.*)?"
restorecon -Rv /var/lib/pgsql/data
```

---

## 3. Firewalld の設定

### 3.1. 無効化手順 (推奨されない)
```
systemctl status firewalld.service        # 現在の状態確認
systemctl is-enabled firewalld.service    # 自動起動確認
systemctl disable firewalld.service       # 自動起動無効化
systemctl stop firewalld.service          # サービス停止
systemctl status firewalld.service        # 停止確認
```

### 3.2. Firewalld を有効化した設定 (推奨)
- PostgreSQL 用のポートを許可する。
```
systemctl enable firewalld.service
systemctl start firewalld.service

firewall-cmd --add-service=postgresql --permanent
firewall-cmd --reload

firewall-cmd --list-all  # 許可設定を確認
```

---

## 4. PostgreSQL インストール

### 4.1. インストールコマンド
```
dnf install postgresql postgresql-server
```

---

## 5. PostgreSQL 設定

### 5.1. ユーザー作成
```
useradd -u 2000 postgres
id postgres
```

### 5.2. 初期設定
```
su - postgres
initdb -D /var/lib/pgsql/data
```

---

## 6. サービス起動と自動起動設定
```
systemctl enable postgresql.service
systemctl start postgresql.service
systemctl status postgresql.service
```

---

## 7. セキュリティ考慮点とベストプラクティス
- SELinux と Firewalld は可能であれば有効化し、適切な設定を行う。
- PostgreSQL のリモートアクセスを制限する。
- PostgreSQL の認証方式を適切に設定する (例: md5、scram-sha-256 など)。
- `pg_hba.conf` を編集してアクセス制御を行う。

---

## 8. 動作確認方法
- PostgreSQL にログインできることを確認する。
```
su - postgres
psql -U postgres
```
- データベース一覧を確認。
```
\l
```

---

## 9. トラブルシューティング例

### 9.1. サービス起動エラー
- エラーログ確認：
```
journalctl -xe
```

### 9.2. PostgreSQL のリモートアクセスエラー
- `postgresql.conf` の `listen_addresses` 設定が適切か確認。
- `pg_hba.conf` ファイルの設定を見直す。

### 9.3. パーミッションエラー
- ディレクトリ `/var/lib/pgsql/data` のパーミッションを確認する。
```
ls -ld /var/lib/pgsql/data
```
- 必要に応じてアクセス権を変更。
```
chown -R postgres:postgres /var/lib/pgsql/data
chmod 700 /var/lib/pgsql/data
```
