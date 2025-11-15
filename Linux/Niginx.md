## 1. 構築環境

```bash
- OS: Rocky Linux release 9.0 (Blue Onyx)
- Nginx Version: nginx-1.20.1-13.el9.x86_64
```

## 2. Nginx のインストール

### 2.1. インストールコマンド
```bash
dnf install nginx
```

### 2.2. 確認
```bash
nginx -v  # インストールされたバージョンの確認
```

---

## 3. Nginx 設定

### 3.1. 設定ファイルの確認と編集
```bash
ll -aR /etc/nginx/  # ディレクトリ内のファイル確認
vi /etc/nginx/nginx.conf  # 設定ファイル編集
```

### 3.2. 基本設定 (`/etc/nginx/nginx.conf`)
```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    include /etc/nginx/conf.d/*.conf;

    server {
        listen       10080;
        listen       [::]:10080;
        server_name  www.tlab.local;
        root         /var/www/html/;

        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {}

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {}
    }
}
```

---

## 4. 設定確認

### 4.1. 設定差分の確認
```bash
diff /etc/nginx/nginx.conf /etc/nginx/nginx.conf.default
```

### 4.2. 構文チェック
```bash
nginx -t
```

---

## 5. サービス起動と自動起動設定
```bash
systemctl enable nginx.service
systemctl start nginx.service
systemctl status nginx.service
```

---

## 6. セキュリティ考慮点とベストプラクティス

- ファイアウォール設定を確認し、ポート 10080 を開放する：
  ```
  firewall-cmd --add-port=10080/tcp --permanent
  firewall-cmd --reload
  ```
- SELinux のポリシーを確認し、必要に応じて許可する。
  ```
  setsebool -P httpd_can_network_connect 1
  ```
- 不要なモジュールを無効化し、最低限の設定で運用する。
- `server_name` は適切に設定し、ドメイン名を指定する。
- `root` ディレクトリは正しいパーミッション設定にする (例: `chmod 755 /var/www/html/`)。

---

## 7. 動作確認方法
```bash
curl http://localhost:10080
```

---

## 8. トラブルシューティング例

### 8.1. サービス起動エラー
- エラーログ確認：
  ```bash
  journalctl -xe
  ```
- 設定ファイルの誤りがないか確認：
  ```bash
  nginx -t
  ```

### 8.2. ポート開放の問題
- Firewall がブロックしていないか確認：
  ```bash
  firewall-cmd --list-all
  ```

### 8.3. SELinux のブロック
- ブロックを確認し、必要に応じて許可する。
  ```bash
  getenforce
  setsebool -P httpd_can_network_connect 1
  ```

### 💡 **Security Headers Configuration (Apache)**
```bash
# X-Content-Type-Options "nosniff"
```
- ブラウザがMIMEタイプを自動検出するのを防ぎ、XSS攻撃を防止する設定。  
  `nosniff` は、提供されたMIMEタイプを信頼するよう指示する。

```bash
# X-Frame-Options "DENY"
```
- ページが `<iframe>` タグ内でロードされるのを禁止し、クリックジャッキング攻撃を防止する。  
  `DENY` は完全に禁止する設定。

```bash
# X-XSS-Protection "1; mode=block"
```
- ブラウザのクロスサイトスクリプティング（XSS）フィルタを有効にし、攻撃を検出したらページの表示をブロック。  

---

### 💡 **Nginx User Data Script with Best Practices**
```bash
# worker_processes auto;
```
- サーバーのCPU数に応じて自動的にワーカー数を設定。  
  サーバー性能を最大限に引き出す設定。

```bash
# worker_connections 1024;
```
- 単一のワーカーが同時に処理可能な最大接続数を設定。  
  大規模なトラフィックを扱う場合は増やす必要がある。

```bash
# sendfile on;
```
- ファイル転送時に `sendfile()` システムコールを使用し、ファイル送信の効率を向上。  
  静的コンテンツの配信に最適。

```bash
# tcp_nopush on;
```
- パケットをまとめて送信することで、ネットワーク帯域の利用効率を向上させる設定。

```bash
# tcp_nodelay on;
```
- 保留中のデータを即座に送信し、リアルタイムの通信速度を向上。  
  通常は `keepalive_timeout` と組み合わせて使用する。

```bash
# keepalive_timeout 65;
```
- クライアントが次のリクエストを送信するまでの待機時間。  
  `65秒` はやや長めの設定だが、nginx のデフォルト。

---

### 💡 **Security Headers Configuration (Nginx)**
```bash
# add_header X-Content-Type-Options "nosniff";
# add_header X-Frame-Options "DENY";
# add_header X-XSS-Protection "1; mode=block";
```
- Apacheと同様のセキュリティヘッダーを追加して、HTTPヘッダーインジェクションやXSS攻撃のリスクを軽減。  

---

### 📌 **両方のスクリプトに共通すること:**
- **セキュリティ対策**（サーバー情報を隠す、セキュリティヘッダーの設定）
- **パフォーマンス最適化**（KeepAlive、workerプロセス、sendfile設定）
- **自動起動の設定**（`systemctl enable`）

---

この内容で問題ないでしょうか？さらに改善や追加したい機能があれば教えてください！😊
