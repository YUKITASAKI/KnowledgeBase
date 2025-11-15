## 1. 構築環境

```
- OS: Rocky Linux release 8.7 (Green Obsidian)
- VSFTPD Version: vsftpd-3.0.3-35.el8.x86_64
```

---

## 2. VSFTPD インストール

### 2.1. インストールコマンド
```
dnf install vsftpd
```

---

## 3. VSFTPD 設定

### 3.1. 設定ファイルの確認とバックアップ
```
ll /etc/vsftpd/
cp -a /etc/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd.conf.default
```

### 3.2. 設定ファイルの編集 (`/etc/vsftpd/vsftpd.conf`)

#### 3.2.1. 基本設定の変更
```
sed -i -e 's/#ascii_upload_enable=YES/ascii_upload_enable=YES/g' /etc/vsftpd/vsftpd.conf
sed -i -e 's/#ascii_download_enable=YES/ascii_download_enable=YES/g' /etc/vsftpd/vsftpd.conf
sed -i -e 's/#chroot_local_user=YES/chroot_local_user=YES/g' /etc/vsftpd/vsftpd.conf
sed -i -e 's/#chroot_list_enable=YES/chroot_list_enable=YES/g' /etc/vsftpd/vsftpd.conf
sed -i -e 's/#chroot_list_file/chroot_list_file/g' /etc/vsftpd/vsftpd.conf
sed -i -e 's/#ls_recurse_enable=YES/ls_recurse_enable=YES/g' /etc/vsftpd/vsftpd.conf
sed -i -e 's/listen=NO/listen=YES/g' /etc/vsftpd/vsftpd.conf
sed -i -e 's/listen_ipv6=YES/listen_ipv6=NO/g' /etc/vsftpd/vsftpd.conf
sed -i -e 's/userlist_enable=YES/userlist_enable=NO/g' /etc/vsftpd/vsftpd.conf
```

#### 3.2.2. 追加設定 (末尾に追加)
```
echo '' >> /etc/vsftpd/vsftpd.conf
echo '#Additional items' >> /etc/vsftpd/vsftpd.conf
echo 'use_localtime=YES' >> /etc/vsftpd/vsftpd.conf
echo 'force_dot_files=YES' >> /etc/vsftpd/vsftpd.conf
echo 'text_userdb_names=YES' >> /etc/vsftpd/vsftpd.conf
echo 'allow_writeable_chroot=YES' >> /etc/vsftpd/vsftpd.conf
```

---

## 4. サービス起動と自動起動設定
```
systemctl enable vsftpd.service
systemctl start vsftpd.service
systemctl status vsftpd.service
```

---

## 5. セキュリティ考慮点とベストプラクティス
- SELinux が有効な場合、FTP のアクセスを許可。
```
setsebool -P ftpd_full_access 1
```
- ファイアウォール設定を確認し、ポート 21 を開放。
```
firewall-cmd --permanent --add-port=21/tcp
firewall-cmd --reload
```
- `userlist_enable=NO` にすることでユーザーリストによる制限を無効化。
- `chroot_local_user=YES` によりユーザーをホームディレクトリに制限。
- アスキーモードでの転送を許可する (`ascii_upload_enable=YES`、`ascii_download_enable=YES`)。

---

## 6. 動作確認方法
- FTP クライアントから接続確認。
```
ftp <サーバーのIPアドレス>
```
- ファイル転送のテスト。
```
put testfile.txt
```

---

## 7. トラブルシューティング例

### 7.1. サービスが起動しない場合
- エラーログ確認。
```
journalctl -xe
```
- 設定ファイルの誤り確認。
```
testparm
```

### 7.2. ファイル転送エラー
- SELinux の設定を確認。
- ファイアウォール設定を確認。

### 7.3. アクセス制限の問題
- `/etc/vsftpd/user_list` の設定を確認。
- `chroot_list` ファイルの確認と設定。
