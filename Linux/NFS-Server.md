## 1. 構築環境

```bash
- OS: Rocky Linux release 8.7 (Green Obsidian)
- NFS Version: nfs-utils-2.3.3-57.el8.x86_64
```

## 2. NFS サーバーのインストール

### 2.1. インストールコマンド
```bash
dnf install nfs-utils
```

### 2.2. 確認
```bash
showmount -e  # NFS サーバーが正しくインストールされているか確認
```

---

## 3. NFS 設定

### 3.1. エクスポート設定 (共有ディレクトリの設定)
- `/etc/exports` に共有ディレクトリを設定します。
```bash
vi /etc/exports
/fs 192.168.0.0/16(rw,sync,no_root_squash)
```

#### 3.1.1. オプション説明
- `rw`: 読み書きアクセスを許可
- `sync`: クライアントに書き込み時にサーバーへ即時書き込みを行う (安全性向上)
- `no_root_squash`: クライアントの root ユーザーをサーバーの root として扱う (セキュリティリスクがあるため可能な限り避けること)

---

## 4. 設定反映と確認

### 4.1. 設定の反映
```bash
exportfs -ra
```

### 4.2. 設定確認
```bash
exportfs -v
```

---

## 5. NFS サービスの起動と有効化

### 5.1. サービスの起動と自動起動設定
```bash
systemctl enable nfs-server.service
systemctl start nfs-server.service
```

### 5.2. 起動状態の確認
```bash
systemctl status nfs-server.service
```

---

## 6. セキュリティ考慮点とベストプラクティス

- ファイアウォール設定を確認し、必要なポートを開放する。
  ```bash
  firewall-cmd --permanent --add-service=nfs
  firewall-cmd --permanent --add-service=rpc-bind
  firewall-cmd --permanent --add-service=mountd
  firewall-cmd --reload
  ```
- `no_root_squash` オプションを避け、セキュリティのために `root_squash` を使用することを推奨。
- SELinux が有効な場合、共有ディレクトリの設定を適切に行う。
  ```bash
  setsebool -P nfs_export_all_rw 1
  setsebool -P nfs_export_all_ro 1
  restorecon -Rv /fs  # ディレクトリに適切なコンテキストを設定
  ```

---

## 7. 動作確認方法
- クライアント側での接続確認：
```bash
showmount -e <NFSサーバーのIPアドレス>
```
- マウント確認：
```bash
mount -t nfs <NFSサーバーのIPアドレス>:/fs /mnt
```

---

## 8. トラブルシューティング例

### 8.1. サービスが起動しない場合
- エラーログ確認：
```bash
journalctl -xe
```

### 8.2. クライアントからのアクセスエラー
- Firewalld が有効かつ設定されていない場合にブロックされる可能性がある。
- SELinux ポリシーの設定不足によるアクセス拒否。
- `/etc/exports` の設定ミス。

### 8.3. エクスポート設定の反映エラー
- 設定ファイルの記述ミスを確認：
```bash
exportfs -ra
```
