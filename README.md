# Next.js Starter

SSR / SSG / ISR を環境変数で切り替え可能な Next.js スターターテンプレートです。

## 技術スタック

| カテゴリ | 技術 |
| --- | --- |
| フレームワーク | Next.js 15 (App Router) / React 19 / TypeScript 5 |
| サーバー状態管理 | TanStack Query |
| クライアント状態管理 | Zustand |
| API / バリデーション | Axios / Zod |
| スタイリング | SCSS Modules |
| テスト | Vitest / Playwright / Storybook |
| Lint / フォーマット | ESLint / Stylelint / Markuplint / Prettier |
| APIモック | MSW (Mock Service Worker) |
| Git hooks | Husky + lint-staged |

## 必要な環境

- Node.js >= 20.0.0
- pnpm >= 9.0.0

## セットアップ

```bash
pnpm install
```

## 環境変数

`.env` ファイルで設定します。

| 変数名 | 説明 | 値 |
| --- | --- | --- |
| `NEXT_PUBLIC_RENDER_MODE` | レンダリングモード | `static` / `ssr` / `isr` |
| `NEXT_PUBLIC_REVALIDATE_INTERVAL` | ISR の再検証間隔（秒） | `3600` |
| `NEXT_PUBLIC_API_BASE_URL` | API のベース URL | `http://localhost:8000/api` |
| `NEXT_PUBLIC_ENABLE_DEVTOOLS` | React Query DevTools の有効化 | `true` / `false` |
| `NEXT_PUBLIC_ENABLE_MSW` | MSW によるAPIモックの有効化 | `true` / `false` |

### レンダリングモード

- **`static`** — 静的エクスポート。`out/` に HTML を出力（S3、GitHub Pages 等向け）
- **`ssr`** — サーバーサイドレンダリング。リクエストごとに描画
- **`isr`** — Incremental Static Regeneration。静的生成 + 定期再検証

## コマンド

### 開発

```bash
pnpm dev          # 開発サーバー起動 (http://localhost:3000)
pnpm sb           # Storybook 起動 (http://localhost:6006)
```

### ビルド

```bash
pnpm build        # プロダクションビルド
pnpm start        # プロダクションサーバー起動（SSR モードのみ）
pnpm build-sb     # Storybook の静的ビルド
```

### テスト

```bash
pnpm test             # ユニットテスト (Vitest)
pnpm test:coverage    # カバレッジ付きユニットテスト
pnpm test:e2e         # E2E テスト (Playwright)
pnpm test:storybook   # Storybook コンポーネントテスト
```

### Lint / フォーマット

```bash
pnpm lint             # 全 Lint 実行 (JS + CSS + Markup)
pnpm lint:js          # ESLint
pnpm lint:css         # Stylelint
pnpm lint:markup      # Markuplint
pnpm format           # Prettier フォーマット
pnpm type-check       # TypeScript 型チェック
```

## プロジェクト構成

```
src/
├── app/                  # App Router（ページ・レイアウト）
├── components/
│   ├── common/           # 汎用 UI コンポーネント (Button, Icon, Layout)
│   └── modules/          # 機能別コンポーネント (UserList)
├── hooks/                # カスタムフック (TanStack Query ラッパー)
├── lib/                  # ユーティリティ (API クライアント, レンダリング設定)
├── mocks/                # MSW モックサーバー
├── services/api/         # API 関数・Zod スキーマ
├── stores/               # Zustand ストア
├── styles/               # SCSS 変数・Mixin
├── tests/                # ユニットテスト・E2E テスト
└── types/                # TypeScript 型定義
```
