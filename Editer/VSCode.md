# 1. クイックスタート

### ダウンロード

[ダウンロードリンク](https://apps.microsoft.com/detail/xp9khm4bk9fz7q?launch=true&mode=full&hl=ja-jp&gl=jp&ocid=bingwebsearch)

### おすすめプラグイン

| 拡張機能名                   | 主な用途                                      | カテゴリ             |
| ---------------------------- | --------------------------------------------- | -------------------- |
| Amazon Q                     | AIによるコード支援、開発効率化                | 開発支援             |
| Markdown All in One          | マークダウン編集の効率化、プレビュー          | ドキュメント         |
| Markdown Preview Enhanced    | 高機能なマークダウンプレビューと編集          | ドキュメント         |
| Draw\.io Integration         | 図表作成・編集機能の統合                      | 図表・ダイアグラム   |
| Graphviz Interactive Preview | Graphvizダイアグラムのプレビューと編集        | 図表・ダイアグラム   |
| CloudFormation               | AWSのCloudFormationテンプレートの編集支援     | インフラストラクチャ |
| CloudFormation Linter        | AWSのCloudFormationテンプレートの検証とリント | インフラストラクチャ |
| HashiCorp Terraform          | Terraformコードの編集、補完、フォーマット     | インフラストラクチャ |
| Go                           | Go言語の開発支援、デバッグ機能                | 言語サポート         |
| Japanese Language Pack       | VS Codeの日本語化                             | 言語サポート         |
| YAML                         | YAMLファイルの編集支援、構文ハイライト        | 言語サポート         |
| WSL                          | Windows Subsystem for Linuxとの統合           | 開発環境             |

# 2. 各種プラグイン

### CloudFormation プラグイン

❗ よくあるエラー

YAML サポート拡張を使っている場合、CloudFormation 固有のタグ（例：`!Ref`, `!Sub` など）に対応しておらず、以下のようなエラーが表示されることがあります。

```txt
Unresolved tag: !Ref
```

✅ 対応手順

1. VS Code の設定を開きます。

- キーボード： `Ctrl + ,`
- または メニュー：`ファイル > ユーザー設定 > 設定`

2. 検索窓に `yaml.customTags` と入力します。
3. 「JSONで編集」をクリックし、以下を追記します。

```json
{
  "yaml.customTags": [
    "!Ref",
    "!Sub",
    "!ImportValue",
    "!GetAtt",
    "!Join sequence",
    "!Select sequence",
    "!Split sequence",
    "!FindInMap sequence",
    "!GetAZs",
    "!Condition",
    "!Equals sequence",
    "!And sequence",
    "!If sequence",
    "!Not sequence",
    "!Or sequence"
  ]
}
```

### CloudFormation Linter プラグイン

✅ 対応手順

1. Python のインストール

- [Python公式サイト](https://www.python.org/)から最新版をダウンロードします。
- インストーラー起動時に **「Add Python to PATH」** にチェックを入れます。

2. cfn-lint のインストール

```bash
pip3 install cfn-lint
```

3. インストール場所の確認

```bash
where.exe cfn-lint
```

**🔹**実行結果

```
C:\Users\UserName\AppData\Local\Programs\Python\Python313\Scripts\cfn-lint.exe
```

4. VS Code での設定

1. `Ctrl + ,` で設定画面を開きます。
2. 検索バーに `cfn-lint` と入力します。
3. CloudFormation Linter Configuration の以下項目を設定します。

| 項目                       | 設定内容                                |
| -------------------------- | --------------------------------------- |
| **Path**             | 手順3で確認した `cfn-lint` の絶対パス |
| **Format**           | `parseable`（推奨）                   |
| **Append Rules Dir** | 任意。カスタムルールがある場合のみ指定  |

5. 動作確認

- `.yaml` または `.template` 拡張子の CloudFormation テンプレートを VS Code で開きます。
- 構文エラーがある場合、エディタ内に警告が表示されます。

## Amazon Q プラグイン

| 機能名                   | ショートカット        | 説明                                                                                         |
| ------------------------ | --------------------- | -------------------------------------------------------------------------------------------- |
| **Explain**        | `Alt + Windows + E` | 選択したコードの意味や動作を自然言語で説明します。`<br>`例：「この関数は何をしているの？」 |
| **Refactor**       | `Alt + Windows + U` | コードを改善・リファクタリングします（変数名の改善、関数の分割など）                         |
| **Fix**            | `Alt + Windows + Y` | コードのバグやエラーを修正します                                                             |
| **Optimize**       | `Alt + Windows + A` | パフォーマンスや可読性を向上させるための最適化を行います                                     |
| **Generate Tests** | `Alt + Windows + T` | ユニットテストや関数のテストコードを自動生成します                                           |
| **Send to prompt** | `Alt + Windows + Q` | 選択コードを Amazon Q のチャットに送信して、自由な質問や指示が可能になります                 |
| **Inline chat**    | `Ctrl + I`          | コード内でインラインチャットを開始。AIとの会話がその場で見れる形式                           |
