## 1. 構築環境

```
- OS (サーバー): Rocky Linux release 9.0 (Blue Onyx)
- rsyslog Version: rsyslog-8.2102.0-101.el9_0.1.x86_64

- OS (クライアント): Rocky Linux release 8.7 (Green Obsidian)
- rsyslog Version: rsyslog-8.2102.0-10.el8.x86_64
```

---

## 2. rsyslog の設定

### 2.1. 設定ファイルのバックアップと確認
```
ll /etc/rsyslog.conf
cp -a /etc/rsyslog.conf /etc/rsyslog.conf.default
```

### 2.2. 設定ファイルの編集
```
vi /etc/rsyslog.conf
```

#### 2.2.1. UDP/TCP の有効化 (コメントアウトを解除)
```rsyslog
#module(load="imtcp")
#input(type="imtcp" port="514")

#module(load="imudp")
#input(type="imudp" port="514")
```

#### 2.2.2. ログフォーマットの変更
```rsyslog
# Use default timestamp format
module(load="builtin:omfile" Template="FileFormat")
$template FileFormat, "%timereported% %hostname% %syslogfacility-text% %syslogseverity-text% %syslogtag% %msg%
"
```

#### 2.2.3. ログ振り分け設定
```rsyslog
#### RULES ####
$template remotelog,"/var/log/transfer/%HOSTNAME%.log"
:hostname, !isequal, "mng01" -?remotelog
& stop
```

### 2.3. 設定の確認
```
diff /etc/rsyslog.conf /etc/rsyslog.conf.default
cat /etc/rsyslog.conf
```

---

## 3. サービスの起動と確認
```
systemctl status rsyslog
systemctl restart rsyslog
systemctl status rsyslog
```

---

## 4. セキュリティ考慮点とベストプラクティス
- rsyslog のポート (UDP 514 / TCP 514) を開放する。
```
firewall-cmd --add-port=514/tcp --permanent
firewall-cmd --add-port=514/udp --permanent
firewall-cmd --reload
```
- SELinux が有効な場合、ポリシー設定を確認する。
```
setsebool -P nis_enabled 1
```
- 不必要なログを保存しないようにフィルタリング設定を行う。
- ログファイルのアクセス権を制限し、重要なログへのアクセスを管理する。

---

## 5. 動作確認方法
- クライアントからサーバーへログを送信する。
```
echo "テストメッセージ" | nc -u <サーバーのIPアドレス> 514
```
- サーバー側でログを確認する。
```
ll /var/log/transfer/
```

---

## 6. トラブルシューティング例

### 6.1. サービスが起動しない場合
- エラーログ確認
```
journalctl -xe
```
- 設定ファイルに誤りがないか確認
```
rsyslogd -N1
```

### 6.2. クライアントからのログが受信できない場合
- Firewall 設定を確認し、ポート 514 が許可されているか確認。
- SELinux の設定を確認し、適切に許可されていることを確認。

### 6.3. ログファイルが生成されない
- 設定ファイルのパス指定に誤りがないか確認。
- `rsyslog` サービスの設定反映が正しく行われているか確認。
