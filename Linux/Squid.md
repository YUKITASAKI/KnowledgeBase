## 1. 構築環境

```
- OS: Rocky Linux release 8.7 (Green Obsidian)
- Squid Version: squid-4.15-3.module+el8.6.0+1044+67ab5d0a.2.x86_64
```

---

## 2. Squid インストール

### 2.1. インストールコマンド
```
dnf install squid
```

---

## 3. Squid 設定

### 3.1. 設定ファイルの確認とバックアップ
```
ll /etc/squid/
cp -a /etc/squid/squid.conf /etc/squid/squid.conf.default
```

### 3.2. 設定ファイルの編集 (`/etc/squid/squid.conf`)
- ポート番号を `3128` から `8080` に変更。
```
sed -i -e "s/http_port 3128/http_port 8080/g" /etc/squid/squid.conf
```

### 3.3. 設定確認
```
diff /etc/squid/squid.conf /etc/squid/squid.conf.default
cat /etc/squid/squid.conf
```

---

## 4. サービス起動と自動起動設定
```
systemctl enable squid
systemctl start squid
systemctl status squid
```

---

## 5. セキュリティ考慮点とベストプラクティス
- Firewalld 設定を確認し、ポート `8080` を許可する。
```
firewall-cmd --permanent --add-port=8080/tcp
firewall-cmd --reload
```
- SELinux が有効な場合、ポリシー設定を確認する。
```
setsebool -P squid_connect_any 1
```
- Squid のアクセス制御リスト (ACL) を設定し、不要なアクセスを制限。
- `/etc/squid/squid.conf` 内で `acl` と `http_access` の設定を適切に設定する。

---

## 6. 動作確認方法
- ログの確認
```
tail -f /var/log/squid/access.log
```
- クライアントからのアクセス確認
```
export http_proxy="http://<サーバーIP>:8080"
curl -I http://www.example.com
```

---

## 7. トラブルシューティング例

### 7.1. サービス起動エラー
- エラーログ確認
```
journalctl -xe
```
- 設定ファイルのエラー確認
```
squid -k parse
```

### 7.2. ポートがブロックされている場合
- Firewall 設定を確認
```
firewall-cmd --list-all
```
- SELinux 設定を確認
```
getenforce
```

### 7.3. アクセス制限の問題
- `/etc/squid/squid.conf` の `http_access` 設定を見直す。
- 必要に応じて `acl` の設定を追加。
