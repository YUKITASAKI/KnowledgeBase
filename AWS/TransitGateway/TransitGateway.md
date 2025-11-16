# 1. Transit Gateway構成要素

### 公式ドキュメント

[AWS Transit Gateway for Amazon VPC とは何ですか?- アマゾンVPC](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)

### VPCアタッチメント

Transit Gateway では、VPC を接続するために「VPCアタッチメント」を作成し、Transit Gateway と VPC 内の特定サブネットを関連付ける必要があります。
「VPCアタッチメント」 を作成する際、AWS では Transit Gateway 専用のサブネットを用意し、そのサブネットをVPCアタッチメントに関連付けることを推奨しています。
[AWS Transit Gateway design best practices - Amazon VPC](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-best-design-practices.html)

![1763292485360](image/TransitGateway/アタッチメント.PNG)

### アソシエーション

Transit Gateway ルートテーブル と VPCアタッチメント を関連付ける操作 を「アソシエーション（Association）」と呼びます。

![1763292485360](image/TransitGateway/アソシエーション.PNG)

### プロパゲーション

VPCアタッチメントが持っているネットワーク情報を Transit Gateway ルートテーブルに伝播させて、自動的に経路を追加することを「プロパゲーション（route propagation）」と言います。

![1763292485360](image/TransitGateway/プロパゲーション.PNG)

# 2. 構成例

### VPC間通信

EC2-AがEC2-Bに通信するときの経路を以下に示します。

![1763292485360](image/TransitGateway/EC2-AtoEC2-B.PNG)

EC2-BがEC2-Aに通信するときの経路を以下に示します。

![1763292485360](image/TransitGateway/EC2-BtoEC2-A.PNG)

### DirectConnect通信

EC2-AがオンプレミスのServerと通信するときの経路を以下に示します。

![1763292485360](image/TransitGateway/EC2-AtoOnpremisesServer.PNG)

オンプレミスのServerがEC2-Aと通信するときの経路を以下に示します。

![1763292485360](image/TransitGateway/OnpremisesServertoEC2-A.PNG)

### DirectConnectをSitetoSiteVPN(以下S2SVPN)で暗号化して通信

EC2-AがオンプレミスのServerと通信するときの経路を以下に示します。

![1763292485360](image/TransitGateway/EC2-AtoOnpremisesServer_S2SVPN.PNG)

オンプレミスのServerがEC2-Aと通信するときの経路を以下に示します。

![1763292485360](image/TransitGateway/OnpremisesServertoEC2-A_S2SVPN.PNG)
