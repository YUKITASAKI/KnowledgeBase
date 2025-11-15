## 1. 構築環境

```
- OS: Rocky Linux release 8.7 (Green Obsidian)
- Samba Version: samba-common-4.16.4-2.el8.noarch
```

---

## 2. Samba インストール

### 2.1. インストールコマンド
```
dnf install samba
```

---

## 3. Samba 設定

### 3.1. 設定ファイルのバックアップと確認
```
ll /etc/samba
cp -a /etc/samba/smb.conf /etc/samba/smb.conf.default
```

### 3.2. 設定ファイルの編集 (`/etc/samba/smb.conf`)

#### 3.2.1. [global] セクションの設定
```samba
[global]
    disable spoolss = Yes
    dos charset = CP932
    load printers = No
    netbios name = FS
    security = USER
    server string = SAMBA SERVER Version %v
    wins support = Yes
    workgroup = TLAB.LOCAL
    idmap config * : backend = tdb
```

#### 3.2.2. [share] セクションの追加
```samba
[share]
    path = /fs
    read only = no
    guest ok = no
```

---

## 4. サービス起動と自動起動設定
```
systemctl enable smb.service
systemctl start smb.service
systemctl status smb.service
```

---

## 5. セキュリティ考慮点とベストプラクティス
- SELinux が有効な場合の設定確認。
```
setsebool -P samba_export_all_rw 1
restorecon -Rv /fs
```
- ファイアウォール設定の確認とポート開放。
```
firewall-cmd --add-service=samba --permanent
firewall-cmd --reload
```
- 不要なサービスの無効化 (`load printers = No`)。
- `guest ok = no` にすることで匿名アクセスを防止。
- 適切なユーザー管理を行い、必要に応じて `smbpasswd -a ユーザー名` でユーザーを追加。

---

## 6. 動作確認方法
- クライアント側から接続確認。
```
smbclient -L //FS/share -U ユーザー名
```
- ローカルマウントテスト。
```
mount -t cifs -o username=ユーザー名,password=パスワード //FS/share /mnt
```

---

## 7. トラブルシューティング例

### 7.1. サービスが起動しない場合
- エラーログ確認。
```
journalctl -xe
```
- 設定ファイルの構文エラー確認。
```
testparm
```

### 7.2. クライアント接続エラー
- Firewall が適切に設定されているか確認。
- SELinux の設定が許可されているか確認。

### 7.3. アクセス権の問題
- ディレクトリ `/fs` のアクセス権を確認。
```
chmod 777 /fs
```
- 適切なユーザー追加。
```
smbpasswd -a ユーザー名
```
