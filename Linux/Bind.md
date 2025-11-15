
## 1. 構築環境

```bash
Rocky Linux release 8.7 (Green Obsidian)
bind-chroot-9.11.36-5.el8_7.2.x86_64
```

## 2. インストール

```bash
dnf install bind bind-chroot bind-utils
```

## 3. 設定手順

```bash
ll /etc/ | grep name
cp -a /etc/named.conf /etc/named.conf.default
diff /etc/named.conf /etc/named.conf.default
cat /etc/named.conf
vi /etc/named.conf
```

## 4. セキュリティ考慮点（ベストプラクティス）

### 4.1 ACL（アクセス制御リスト）の定義

   - 許可されるクライアントのネットワークを明確に指定（例: `192.168.252.0/22` と `localhost` のみ）。
   - 必要最低限の範囲に絞ることで、外部からの不正アクセスを防ぐ。

### 4.2 Recursion の制限

   - `recursion yes;` とする際は `allow-recursion` を指定し、内部ネットワークのみに限定。
   - パブリックアクセスを防ぎ、大規模な DNS 増幅攻撃への悪用を防止。

### 4.3 ゾーン転送の制限

   - ゾーンファイル転送（`zone transfer`）のアクセスを制限する。
   - 必要な場合のみ、`allow-transfer { <許可するIPアドレス>; };` を設定。

### 4.4 DNSSEC の無効化

   - `dnssec-validation no;` としているが、必要に応じて DNSSEC を有効化し、署名を行うことで DNS 応答の改ざんを防止。

### 4.5 ログ管理の適切な設定

   - `logging` セクションで DNS アクティビティを監視。
   - 過度な出力を避けつつ、重要なエラーやアクセス情報を記録する。

### 4.6 chroot 環境の使用

   - `bind-chroot` を使用することで、サービスのセキュリティを強化し、侵入時の影響範囲を制限する。

### 4.7 ファイルの権限設定

   - `chown -R named:named /var/named` でゾーンファイルの所有権を適切に設定。
   - `chmod 640 /etc/named.conf` などで設定ファイルの権限を制御。

### 4.8 サービスの監視と保守

   - `systemctl status named-chroot.service` による定期的な状態確認。
   - 自動起動設定の確認 (`systemctl is-enabled named-chroot.service`)。

---

## 5. named.conf 設定

```bash
acl allow-group {
     192.168.252.0/22;
     localhost;
};

options {
    listen-on port 53 { allow-group; };
    listen-on-v6 port 53 { allow-group; };
    directory       "/var/named";
    dump-file       "/var/named/data/cache_dump.db";
    statistics-file "/var/named/data/named_stats.txt";
    memstatistics-file "/var/named/data/named_mem_stats.txt";
    secroots-file   "/var/named/data/named.secroots";
    recursing-file  "/var/named/data/named.recursing";
    allow-query { any; };

    recursion yes;
    allow-recursion { allow-group; };
    allow-query-cache { allow-group; };

    dnssec-validation no;

    managed-keys-directory "/var/named/dynamic";
    geoip-directory "/usr/share/GeoIP";

    pid-file "/run/named/named.pid";
    session-keyfile "/run/named/session.key";

    forwarders { 192.168.252.1; };
    forward only;

    include "/etc/crypto-policies/back-ends/bind.config";
};

logging {
    channel default_debug {
        file "data/named.run";
        severity dynamic;
    };
};

zone "." IN {
    type hint;
    file "named.ca";
};

zone "tlab.local" IN {
    type master;
    file "tlab.local";
};

zone "252.168.192.in-addr.arpa" {
    type master;
    file "252.168.192.in-addr.arpa.rev";
};

include "/etc/named.rfc1912.zones";
include "/etc/named.root.key";
```

---

## 6. 逆引き設定例

### 6.1 逆引きゾーンファイル設定 (`/var/named/252.168.192.in-addr.arpa.rev`)
```bash
$TTL 3600
@ IN SOA mng01.tlab.local. root.tlab.local. (
     2022120101 ; serial
     3600       ; refresh 1hr
     900        ; retry 15min
     604800     ; expire 1w
     86400      ; min 24hr
)

     IN NS mng01.tlab.local.
1    IN PTR seil01.tlab.local.
11   IN PTR web-api01.tlab.local.
12   IN PTR web-api02.tlab.local.
21   IN PTR db01.tlab.local.
33   IN PTR db02.tlab.local.
192  IN PTR ad01.tlab.local.
224  IN PTR zabbix01.tlab.local.
226  IN PTR cml01.tlab.local.
228  IN PTR mng01.tlab.local.
230  IN PTR rdp01.tlab.local.
252  IN PTR lb02.tlab.local.
253  IN PTR lb01.tlab.local.
```

---

## 7. トラブルシューティング

### 7.1 サービス起動エラー
- **症状:** `Failed to start Berkeley Internet Name Domain (DNS)` と表示される。
- **原因:** 設定ファイル内のアンダーバー `_` やタブ文字が混在している可能性。
- **確認方法:**
  ```bash
  cat -e /etc/named.conf
  cat -e /var/named/"ゾーンファイル"
  ```
- **解決方法:** ファイル内の不正な文字を修正する。

### 7.2 ゾーンファイルの構文エラー
- **症状:** `named-checkconf -z` コマンド実行時にエラーが発生。
- **確認方法:**
  ```bash
  named-checkzone "ドメイン名" /var/named/"ゾーンファイル"
  ```
- **解決方法:** 記述ミスや構文エラーを修正し、再確認する。

---

## 8. 動作確認方法

### 8.1 正引き確認
```bash
dig mng01.tlab.local
```

### 8.2 外部ドメインの確認（フォワーダーの確認）
```bash
dig google.com
```

### 8.3 逆引き確認
```bash
dig -x 192.168.252.1
```

