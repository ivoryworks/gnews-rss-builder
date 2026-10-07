# GNews RSS Builder

Google ニュースの検索結果 URL または検索クエリから、検索用 RSS フィード URL を生成する非公式の静的ツールです。

公開ページ: <https://ivoryworks.com/gnews-rss-builder/>

## 主な機能

- 検索クエリと Google ニュース検索結果 URL の両方に対応
- `hl`、`gl`、`ceid` の編集
- 生成した RSS URL のコピーと別タブ表示
- 空入力、対象外 URL、検索条件のない URL の検証
- 外部への入力送信なし（ブラウザー内で URL を生成）

## ローカルで確認する

```sh
python3 -m http.server 8000 --directory docs
```

ブラウザーで <http://localhost:8000> を開きます。JavaScript モジュールを使うため、`index.html` をファイルとして直接開くのではなく HTTP サーバー経由で確認してください。

## テスト

Node.js 20 以降で実行します。外部パッケージのインストールは不要です。

```sh
npm test
```

## GitHub Pages で公開する

1. GitHub のリポジトリ設定で **Pages** を開く
2. **Build and deployment** の Source に **Deploy from a branch** を選ぶ
3. Branch に **main**、フォルダーに **/docs** を選んで保存する

通常の公開 URL は `https://<owner>.github.io/gnews-rss-builder/` の形式です。このリポジトリではアカウントのカスタムドメイン設定により <https://ivoryworks.com/gnews-rss-builder/> で公開しています。

## 制約

- Google の通常検索にある「ニュース」タブ URL は対象外です。
- RSS と Google ニュース検索画面の結果が完全に一致するとは限りません。
- `when:7d` などの検索演算子は動作する場合がありますが、公開仕様として保証されていません。
- RSS 本文をページ内で取得・表示する機能はありません。

このプロジェクトは Google の公式ツールではなく、Google との提携・承認関係もありません。
