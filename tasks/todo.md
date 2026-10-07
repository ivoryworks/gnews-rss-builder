# GNews RSS Builder Tasks

## Task 1: リポジトリとテスト基盤を初期化する

**Acceptance criteria:**
- [x] `main` ブランチの Git リポジトリである
- [x] Node.js 標準テストランナーを実行できる

**Verification:**
- [x] `npm test` が起動する

**Dependencies:** None

## Task 2: URL 解析・生成ロジックを実装する

**Acceptance criteria:**
- [x] 検索クエリから RSS URL を生成できる
- [x] 対応 URL から `q`、`hl`、`gl`、`ceid` を抽出できる
- [x] 空入力、不正 URL、対象外 URL、`q` 欠落を拒否する

**Verification:**
- [x] `npm test` が成功する

**Dependencies:** Task 1

## Task 3: 静的 UI を実装する

**Acceptance criteria:**
- [x] 入力と地域設定を編集できる
- [x] 生成 URL のコピーと別タブ表示ができる
- [x] クエリ例と制約事項を確認できる

**Verification:**
- [ ] ローカルブラウザーで主要操作を確認する

**Dependencies:** Task 2

## Task 4: 品質確認と文書化

**Acceptance criteria:**
- [x] 320px 以上を対象にしたレスポンシブスタイルが定義されている
- [x] ネイティブ操作要素と通知領域が実装されている
- [x] README にローカル実行方法と GitHub Pages 設定を記載する

**Verification:**
- [ ] 実ブラウザー操作を確認する
- [x] テストと RSS XML 応答の確認が成功する

**Dependencies:** Task 3
