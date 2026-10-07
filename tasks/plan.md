# Implementation Plan: GNews RSS Builder

## Overview

Google ニュースの検索結果 URL または検索クエリから、検索用 RSS フィード URL を生成する静的ページを作る。成果物は `main` ブランチの `docs/` から GitHub Pages で公開できる構成とする。

## Architecture Decisions

- HTML、CSS、JavaScript のみを使用し、ビルド工程と外部依存を持たない。
- 公開ファイルは `docs/` に配置し、GitHub Pages の公開元を `main` / `docs` にできるようにする。
- URL 解析と生成を純粋関数として分離し、Node.js 標準テストランナーで検証する。
- Google ニュース URL は HTTPS の `news.google.com/search` のみ受理する。
- UI は日本語、日本向け既定値は `hl=ja`、`gl=JP`、`ceid=JP:ja` とする。

## Task List

### Phase 1: Foundation

- [x] Task 1: リポジトリとテスト基盤を初期化する
- [x] Task 2: URL 解析・生成ロジックをテスト駆動で実装する

### Checkpoint: Foundation

- [x] 単体テストがすべて成功する

### Phase 2: Core Features

- [x] Task 3: 入力フォーム、地域設定、結果操作を実装する
- [x] Task 4: エラー、成功、コピー状態をアクセシブルに通知する

### Checkpoint: Core Features

- [x] 検索クエリと Google ニュース URL の両方から生成できる

### Phase 3: Verification and Documentation

- [ ] Task 5: レスポンシブ表示とブラウザー操作を確認する
- [x] Task 6: 実際の RSS XML 応答を確認し、README に公開方法を記載する

### Checkpoint: Complete

- [ ] 全テスト、ブラウザー確認、外部 RSS 応答確認が完了する
- [ ] `main` がコミット済みで作業ツリーがクリーンになる

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Google 側の非公開仕様が変わる | 中 | URL 生成に限定し、公式ツールではない旨を明記する |
| RSS と検索画面の結果が一致しない | 中 | ページ上に注意事項を表示する |
| ブラウザーから RSS を取得できない | 低 | RSS 本文の取得・表示は行わず、開く操作だけを提供する |

## Open Questions

- 公開リポジトリを作成し、GitHub Pages の公開元を `main` / `docs` に設定済み。
- 自動ブラウザー検証は実行環境の共有ライブラリ不足により未完了。ローカル配信の HTTP 200 応答は確認済み。
