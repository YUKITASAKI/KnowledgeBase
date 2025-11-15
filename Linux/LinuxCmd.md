# 📌Linux

---

## 1.リソース確認

### 1.1. freeコマンド

1.1.1. メモリ使用率のみ

🔸実行コマンド

```bash
free | head -n 2 | tail -n 1 | awk '{print ($3/$2)*100}'
```

🔹実行結果例

```bash
xx.xxxx
```

### 1.2. topコマンド

1.2.1. メモリ使用率ソート

🔸実行コマンド

```bash
top
```

「SHIFT＋m」でメモリ使用率順にソート
「m」のみを押すと、以下の様にメモリ使用率表示も可能になります。

🔹実行結果例

```bash
top - 02:51:43 up  3:30,  3 users,  load average: 0.58, 0.45, 0.39
Tasks: 451 total,   1 running, 450 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.1 us,  0.2 sy,  0.0 ni, 98.4 id,  0.1 wa,  0.1 hi,  0.1 si,  0.0 st
MiB Mem : 66.9/7685.0   [|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||]
MiB Swap: 11.6/8084.0   [||||||||||||                                                       ]
PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
2751 git       20   0 1617824 724488   9944 S   2.3   9.2  10:32.29 bundle2936 git       20   0 1413096 679808   6532 S   0.0   8.6   0:10.09 bundle2938 git       20   0 1402856 679808   6596 S   0.0   8.6   0:11.19 bundle
```

1.2.2. CPU使用率(スレッド毎)

🔸実行コマンド

```bash
top
```

1を入力でスレッド毎のCPU使用率を表示できます。
再度1を押すとプロセス一覧に戻ります。

🔹実行結果例

```bash
top - 23:52:28 up  7:27,  0 users,  load average: 0.00, 0.00, 0.00
Tasks:  17 total,   1 running,  16 sleeping,   0 stopped,   0 zombie
%Cpu0  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu1  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu2  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu3  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu4  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu5  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu6  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu7  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu8  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu9  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu10 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu11 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu12 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu13 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu14 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu15 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu16 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu17 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu18 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu19 :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
```

### 1.3. duコマンド

1.3.1. サブディレクトリ含む

🔸実行コマンド

```bash
du -m /fs/* | sort -n
```

1.3.2. サブディレクトリ含まない

🔸実行コマンド

```bash
du -ms /fs/* | sort -n
```

### 1.4 sarコマンド

sar: sudo dnf install sysstat

1.4.1. エラー数確認

🔸実行コマンド

```bash
sar -n EDEV
```

1.4.2. リアルタイム取得

🔸実行コマンド

```bash
sar -n DEV 1 3
```

🔹実行結果例

```bash
00時20分19秒     IFACE   rxpck/s   txpck/s    rxkB/s    txkB/s   rxcmp/s   txcmp/s  rxmcst/s   %ifutil
00時30分40秒        lo     10.57     10.57     61.48     61.48      0.00      0.00      0.00      0.00
00時30分40秒    ens161  13725.58   3755.66  20119.33    256.34      0.00      0.00      0.00      1.65
00時30分40秒    ens192      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
00時30分40秒    ens224      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
00時30分40秒    ens256      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
00時30分40秒    virbr0      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
```

🔹取得した時点での値が表示

| IFACE    | ネットワークインターフェース名                  |
| -------- | ----------------------------------------------- |
| rxpck/s  | 受信パケット数（数/秒）                         |
| txpck/s  | 送信パケット数（数/秒）                         |
| rxkB/s   | 受信キロバイト数（数/秒）                       |
| txkB/s   | 送信キロバイト数（数/秒）                       |
| rxcmp/s  | 圧縮パケットの受信バイト数（数/秒）             |
| txcmp/s  | 圧縮パケットの送信バイト数（数/秒）             |
| rxmcst/s | マルチキャストパケットの受信パケット数（数/秒） |

🔹単位変換

| bps( bits per second )            | ビット毎秒。1秒間に何ビット転送できるか |
| --------------------------------- | --------------------------------------- |
| B/s または Bps( byte per second ) | バイト毎秒。1秒間に何バイト転送できるか |

Mbps→MB/s変換 1/8
100Mbps　100÷8=12.5MB/s

MB/s→Mbps変換 x8
12.5MB/s　12.5x8=100Mbps

### 1.5. netstatコマンド

netstat: sudo dnf install net-tools

1.5.1. ポートリッスン確認

🔸実行コマンド

```bash
netstat -ant
```

🔹実行結果例

```bash
Proto Recv-Q Send-Q Local Address           Foreign Address         Statetcp        0      0 127.0.0.1:9093          0.0.0.0:*               LISTENtcp        0      0 0.0.0.0:58215           0.0.0.0:*               LISTENtcp        0      0 192.168.252.228:35924   17.248.225.64:443       TIME_WAITtcp        0      0 192.168.252.228:20048   192.168.0.2:960         ESTABLISHEDtcp       25      0 192.168.252.228:39304   151.101.129.91:443      CLOSE_WAIT
```

| **TCPの状態（詳細）** | **頻度** | **意味**                                                                                                                                                                                               |
| --------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **CLOSED**            | －             | 未使用状態のTCPポート。通常これが表示されることはない                                                                                                                                                        |
| **LISTEN**            | ◎             | 待ち受け状態（リッスン状態）のポート。netstatに「**-a**」オプションを付けると表示される                                                                                                                |
| **SYN_SENT**          | ○             | サーバに対して、通信開始の要求（SYN：Synchronize）を送信したが、まだそれに対する応答（ACK：Acknowledgement）を受け取っていない状態。相手が無応答のときもこの状態になる。ACKを受け取るとESTABLISHEDへ遷移する |
| **SYN_RECEIVED**      | －             | クライアントからSYN要求を受け取った直後の状態。SYNに対するACKを送信するとESTABLISHEDへ遷移する                                                                                                               |
| **ESTABLISHED**       | ◎             | TCPコネクションが確立して通信している状態。netstatでは最もよく見る状態。どちらかが終了処理を始めると、FIN_WAIT_1もしくはCLOSE_WAITへ遷移する                                                                 |
| **FIN_WAIT_1**        | －             | 自分の側から先にFINを送信した状態。そのFINに対するACKを相手から受信すると、FIN_WAIT_2へ遷移するが、先に相手からのFINを受けるとCLOSINGへ遷移する                                                              |
| **FIN_WAIT_2**        | －             | FINに対するACKを受信した状態。相手からのFINを受信して、それに対するACKを返すと、TIME_WAITへ遷移する                                                                                                          |
| **CLOSE_WAIT**        | ○             | 相手からのFINを受け取った状態。アプリケーションが終了すると、FINを送信してからLAST_ACKへ遷移する                                                                                                             |
| **CLOSING**           | －             | FINに対する相手からのACKを受けるとTIME_WAITへ遷移する                                                                                                                                                        |
| **LAST_ACK**          | －             | 送信したFINに対するACK待ち状態。ACKを受け取るとCLOSEDへ遷移して終了する（netstatの表示から消える）                                                                                                           |
| **TIME_WAIT**         | ○             | コネクションの終了待ち状態。しばらく待ったあと、CLOSEDへ遷移して終了する（netstatの表示から消える）                                                                                                          |

---

### 1.6. ncコマンド

nc: sudo dnf install nmap-ncat

1.6.1. 接続チェック

🔸実行コマンド

```bash
nc -vz google.com 443
```

- `z`: 接続チェックのみを行い、データ送信はしない。
- `v`: 詳細な出力を表示。

🔹実行結果例

```bash
Ncat: Version 7.92 ( https://nmap.org/ncat )
Ncat: Connected to 142.250.196.110:443.
Ncat: 0 bytes sent, 0 bytes received in 0.01 seconds.
```

1.6.2. クライアントからサーバーへの接続確認(TCP接続テスト)

```bash
nc <IPアドレス> <ポート番号>
```

1.6.3. 簡易的なチャット（双方向通信の確認）

🔸実行コマンド

サーバー側

```bash
nc -l <ポート番号>
```

- `l`: ポートをリッスン（待ち受け）する。

クライアント側

```bash
nc <サーバーIP> <ポート番号>
```

サーバーとクライアント間でテキストを入力すると、リアルタイムでやり取りできます。

1.6.4. ファイル転送テスト

🔸実行コマンド

サーバー側でファイルを受信

```bash
nc -l <ポート番号> > received_file.txt
```

クライアント側でファイルを送信

```bash
nc <サーバーIP> <ポート番号> < file_to_send.txt
```

1.6.4. HTTPリクエストの送信テスト

🔸実行コマンド

```bash
echo -e "GET / HTTP/1.1\r\nHost: <サーバーIP>\r\nConnection: close\r\n\r\n" | nc <サーバーIP> 80
```

1.6.4. UDP通信の確認
UDPポートで通信をテストするには、`-u`オプションを使用します。

🔸実行コマンド

サーバー側

```bash
nc -u -l <ポート番号>
```

**クライアント側**

```bash
nc -u <サーバーIP> <ポート番号>
```

### 1.7. lsofコマンド

lsof: sudo dnf install lsof

1.7.1. ポートを利用しているプロセス

🔸実行コマンド

```bash
lsof -i:80,8080
```

🔹実行結果例

```bash
COMMAND  PID       USER     FD   TYPE DEVICE SIZE/OFF NODE NAME
squid            1432     squid    8u   IPv6  552628           0t0  TCP     mng01.tlab.local:webcache->192.168.0.2:63818 (ESTABLISHED)
```

1.7.2. プロセスが利用しているポート

🔸実行コマンド

```bash
lsof -l -P -n | grep LISTEN | grep nginx
```

🔹実行結果例

```bash
nginx      2628                        0    7u     IPv4              44141         0t0        TCP *:80 (LISTEN)
```

1.7.3. プロセスが開いているファイル

🔸実行コマンド

```bash
lsof -c nginx
```

🔹実行結果例

```bash
COMMAND  PID       USER   FD      TYPE             DEVICE SIZE/OFF      NODE NAME
nginx   2628       root  cwd       DIR              253,0      163 405915953 /var/opt/gitlab/nginx
```

## 2. ファイル操作

### 2.1. findコマンド

2.1.1. 基本構文

🔸実行コマンド

```bash
find / -name 検索文字列 -type [d|f]
```

2.1.2. 特定のファイルの数

🔸実行コマンド

```bash
find /fs -name *.JPEG -type f | wc -l
```

2.1.3. 本日変更されたファイル・ディレクトリ
31とした場合、31日前から本日まで変更されたファイル・ディレクトリが対象になります。

🔸実行コマンド

```bash
find /fs -name *.JPEG -mtime 0
```

2.1.4. 特定の所有者のみ検索

🔸実行コマンド

```bash
find /fs -user root
```

2.1.5. 特定のグループのみ検索

🔸実行コマンド

```bash
find /fs -group root
```

2.1.6. 特定の所有者、グループのみ検索

🔸実行コマンド

```bash
find /fs -user root -group ope01
```

2.1.7. 特定の所有者、グループをまとめて変更

🔸実行コマンド

```bash
find /fs/* -user root -group ope01 | xargs chown root:root
```

2.1.8. タイムスタンプ詳細表示

🔸実行コマンド

```bash
ls --full-time
```

2.1.9. タイムスタンプ変更

🔸実行コマンド

```bash
touch -t 202403100309.01 test
```

2.1.10. シンボリックリンク作成

🔸実行コマンド

```bash
ln -s リンク元 リンク先
```

2.1.11. シンボリックリンク解除

🔸実行コマンド

```bash
unlink リンク先
```

---

## 3. プロセス

### 3.1. psコマンド

🔸実行コマンド

```bash
ps -ef | grep "プロセス名"
```

### 3.2. killコマンド

3.2.1. プロセスを正常終了させる

🔸実行コマンド

```bash
kill pid
```

3.2.2. プロセスを強制終了させる

🔸実行コマンド

```bash
kill -9 pid
```

---

## 4. 正規表現

### 4.1. egrepコマンド

4.1.1. 複数条件

🔸実行コマンド

```bash
ll | egrep "test|win”
```

---

## 5. 置換

### 5.1. sedコマンド

5.1.1. 置換

🔸実行コマンド

```bash
sed -e 's/test/TEST/g' sample.txt`
```

5.1.2. 行数指定削除

🔸実行コマンド

```bash
sed -e 5d sample.txt
```

5.1.2. 行範囲指定削除

🔸実行コマンド

```bash
sed -e '1,5d' sample.txt
```

---
