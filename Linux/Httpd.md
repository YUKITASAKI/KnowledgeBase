## 1. 構築環境

```bash
Rocky Linux release 9.0 (Blue Onyx)
httpd-2.4.53-7.el9.x86_64
```

---

## 2. SELinux設定

### 2.1 無効化する場合

```bash
$ getenforce
$ sudo grubby --update-kernel ALL --args selinux=0
$ sudo reboot
$ getenforce
```

### 2.2 有効化する場合（推奨）

- SELinux は有効 (`Enforcing`) にして運用することが推奨されます。
- HTTPD がアクセスできるように適切なコンテキストを設定。

```bash
$ sudo setsebool -P httpd_can_network_connect on
$ sudo restorecon -Rv /var/www/html
```

---

## 3. Firewalld設定

### 3.1 無効化する場合

```bash
$ sudo systemctl status firewalld.service
$ sudo systemctl is-enabled firewalld.service
$ sudo systemctl disable firewalld.service
$ sudo systemctl is-enabled firewalld.service
$ sudo systemctl stop firewalld.service
$ sudo systemctl status firewalld.service
```

### 3.2 有効化する場合（推奨）

- HTTP サービス用にポート 80 を開放。

```bash
$ sudo firewall-cmd --permanent --add-service=http
$ sudo firewall-cmd --reload
$ sudo firewall-cmd --list-all
```

---

## 4. インストール

```bash
$ sudo dnf install httpd
```

---

## 5. HTTP設定

### 5.1 設定ファイル編集

- `/etc/httpd/conf/httpd.conf` を編集し、必要な設定を追加または修正。
- 必要に応じてバックアップを作成:
  ```bash
  cp -a /etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.conf.default
  ```

### 5.2 セキュリティ考慮点

- `ServerTokens ProductOnly`: Apache のバージョン情報を隠す。
- `Header always unset X-Powered-By`: X-Powered-By ヘッダーを無効化。
- `TraceEnable off`: HTTP トレースメソッドを無効化。
- `HostnameLookups Off`: DNS 逆引きを無効化し、サーバーのパフォーマンスを向上。
- `ServerSignature Off`: サーバーエラーページの署名を非表示。
- `EnableMMAP off`, `EnableSendfile off`: ネットワークマウントファイルのアクセスエラー回避。

---

## 6. Configチェック

```bash
$ sudo diff /etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.conf.default
$ sudo apachectl configtest
```

---

## 7. サービス起動

```bash
$ sudo systemctl status httpd.service
$ sudo systemctl is-enabled httpd.service
$ sudo systemctl enable httpd.service
$ sudo systemctl is-enabled httpd.service
$ sudo systemctl start httpd.service
$ sudo systemctl status httpd.service
```

---

## 8. アクセス確認

```bash
curl http://localhost
```

---

## 9. トラブルシューティング

### 9.1 Apache サービス起動エラー

- **原因:** SELinux が無効化されていない、または設定ファイルに誤りがある可能性。
- **確認方法:**

```bash
getenforce
apachectl configtest
```

- **解決方法:** SELinux が有効な場合は適切な設定を行う (`setsebool` コマンドなど)。

### 9.2 Firewall によるアクセス制限

- **原因:** `firewalld` が有効で HTTP ポートがブロックされている可能性。
- **確認方法:**

```bash
systemctl status firewalld.service
```

- **解決方法:** `firewalld` を有効にし、`firewall-cmd --add-service=http` を実行。

### 9.3 Apache 設定ファイルの構文エラー

- **確認方法:**

```bash
apachectl configtest
```

- **解決方法:** エラー内容を確認し、修正後に再起動する。

### 9.4 HTTP ポートが使用されている

- **確認方法:**

```bash
ss -tulnp | grep :80
```

- **解決方法:** 他のサービスが使用している場合、停止または設定を変更する。

---

## 10. 動作確認方法

- Apache サーバーが正しく起動し、アクセスできることを確認する。

```bash
curl http://localhost
```

- 特定の設定が反映されていることを確認する。

```bash
curl -I http://localhost
```

## 💡 **Apache (httpd) User Data Script with Best Practices**

- サーバーが返すHTTPヘッダーからApacheのバージョン情報を隠し、`Apache` とだけ表示させる。
  セキュリティ強化のために有効。

```bash
ServerTokens Prod
```

- Apacheエラーページやディレクトリリストでバージョン情報を表示しないようにする。
  サーバー情報を露出させないための設定。

```bash
ServerSignature Off
```

- 複数のHTTPリクエストを単一のTCP接続で処理することで、パフォーマンスを向上。
  特に大量アクセスが予想される環境で効果的。

```bash
KeepAlive On
```

- 単一のTCP接続で処理可能な最大リクエスト数を指定。
  100 は標準的な値で、サーバーの負荷を軽減するために設定。

```bash
MaxKeepAliveRequests 100
```

- クライアントが次のリクエストを送信するまでの待機時間を5秒に設定。
  過度に長いとリソースを無駄に消費するので短く設定することが推奨。

```bash
KeepAliveTimeout 5
```

- クライアントとの接続で、リクエスト処理が終わるまでの最大待機時間を60秒に設定。
  長すぎるとリソースを消費するため、適切に設定する必要がある。

```bash
Timeout 60
```
