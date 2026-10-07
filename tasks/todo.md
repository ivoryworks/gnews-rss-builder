# GNews RSS Builder Tasks

## Task 1: リポジトリとテスト基盤を初期化する

**Acceptance criteria:**
- [ ] `main` ブランチの Git リポジトリである
- [ ] Node.js 標準テストランナーを実行できる

**Verification:**
- [ ] `npm test` が起動する

**Dependencies:** None

## Task 2: URL 解析・生成ロジックを実装する

**Acceptance criteria:**
- [ ] 検索クエリから RSS URL を生成できる
- [ ] 対応 URL から `q`、`hl`、`gl`、`ceid` を抽出できる
- [ ] 空入力、不正 URL、対象外 URL、`q` 欠落を拒否する

**Verification:**
- [ ] `npm test` が成功する

**Dependencies:** Task 1

## Task 3: 静的 UI を実装する

**Acceptance criteria:**
- [ ] 入力と地域設定を編集できる
- [ ] 生成 URL のコピーと別タブ表示ができる
- [ ] クエリ例と制約事項を確認できる

**Verification:**
- [ ] ローカルブラウザーで主要操作を確認する

**Dependencies:** Task 2

## Task 4: 品質確認と文書化

**Acceptance criteria:**
- [ ] 320px 以上の画面幅で利用できる
- [ ] キーボード操作と通知領域が機能する
- [ ] README にローカル実行方法と GitHub Pages 設定を記載する

**Verification:**
- [ ] テスト、ブラウザー、RSS XML 応答の確認が成功する

**Dependencies:** Task 3
