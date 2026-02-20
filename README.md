# Next.js Starter

SSR / SSG / ISR を環境変数で切り替え可能な Next.js スターターテンプレートです。

## 特徴

- **Next.js 15 (App Router)** - 最新のApp Routerベースのフレームワーク
- **React 19** - 最新のReact機能
- **TypeScript** - 型安全な開発
- **SCSS Modules** - スコープ化されたスタイリング
- **TanStack Query** - 強力なデータフェッチング
- **Zustand** - シンプルな状態管理
- **MSW** - APIモッキング（開発・テスト・Storybook）
- **レンダリングモード切替** - SSR / SSG / ISR を環境変数で制御
- **SVGアイコン** - インラインSVGによるアイコンシステム
- **Vitest** - 高速なユニットテスト
- **Playwright** - E2Eテスト
- **Storybook** - コンポーネントカタログ
- **ESLint + Prettier + Stylelint + Markuplint** - コード品質管理
- **アクセシビリティ** - jsx-a11y + Markuplint + Storybook a11yアドオン
- **Zod** - スキーマバリデーション
- **pnpm** - 効率的なパッケージ管理

## プロジェクト構成

```
next-starter/
├── src/
│   ├── app/                      # App Router（ページ・レイアウト）
│   │   ├── layout.tsx            # ルートレイアウト
│   │   ├── page.tsx              # ホームページ
│   │   ├── providers.tsx         # TanStack Query プロバイダー
│   │   └── globals.scss          # グローバルスタイル
│   ├── components/
│   │   ├── common/               # 共通コンポーネント
│   │   │   ├── Button/           # ボタンコンポーネント
│   │   │   ├── Icon/             # SVGアイコンコンポーネント
│   │   │   └── Layout/           # レイアウトコンポーネント
│   │   └── modules/              # 機能別コンポーネント
│   │       └── UserList/
│   ├── hooks/                    # カスタムフック
│   │   └── useUsers.ts
│   ├── lib/                      # ユーティリティ
│   │   ├── apiClient.ts          # Axios クライアント
│   │   └── renderConfig.ts       # レンダリング設定
│   ├── mocks/                    # MSWモック定義
│   │   ├── resources/            # リソース別ハンドラー・データ
│   │   ├── MswProvider.tsx
│   │   ├── handlers.ts
│   │   ├── browser.ts
│   │   └── server.ts
│   ├── services/api/             # API通信層
│   │   ├── schemas/              # Zodスキーマ
│   │   ├── client.ts
│   │   └── users.ts
│   ├── stores/                   # Zustandストア
│   │   ├── uiStore.ts
│   │   └── uiStore.types.ts
│   ├── styles/                   # SCSS変数・Mixin
│   │   ├── variables.scss
│   │   └── mixins.scss
│   ├── tests/                    # テストファイル
│   │   ├── setup.ts
│   │   ├── unit/
│   │   └── e2e/
│   └── types/                    # TypeScript型定義
├── .storybook/                   # Storybook設定
├── public/                       # 静的ファイル
├── .env.example                  # 環境変数サンプル
├── eslint.config.js              # ESLint設定（flat config）
├── .markuplintrc.json            # Markuplint設定
├── .prettierrc
├── tsconfig.json
├── next.config.ts
├── vitest.config.ts
└── playwright.config.ts
```

## セットアップ

### 必要要件

- Node.js 20.0.0以上
- pnpm 9.0.0以上

### インストール

```bash
# pnpmのインストール（未インストールの場合）
npm install -g pnpm

# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env

# E2Eテスト用ブラウザのインストール（Playwright）
pnpm exec playwright install
```

## 使い方

### 開発サーバーの起動

```bash
pnpm dev
```

http://localhost:3000 でアプリケーションが起動します。

### ビルド

```bash
# プロダクションビルド
pnpm build

# プロダクションサーバー起動（SSR モードのみ）
pnpm start
```

### テスト

```bash
# ユニットテスト
pnpm test

# テストUIを表示
pnpm test:ui

# カバレッジ付きテスト
pnpm test:coverage

# Storybookテスト
pnpm test:storybook

# E2Eテスト
pnpm test:e2e

# E2EテストUIを表示
pnpm test:e2e:ui
```

### リント・フォーマット

```bash
# 全リント実行（JS + CSS + Markup）
pnpm lint

# JavaScriptリント
pnpm lint:js

# JavaScriptリント自動修正
pnpm lint:js:fix

# CSSリント
pnpm lint:css

# CSSリント自動修正
pnpm lint:css:fix

# JSXマークアップリント（Markuplint）
pnpm lint:markup

# フォーマット実行
pnpm format

# フォーマットチェック
pnpm format:check

# 型チェック
pnpm type-check
```

### Storybook

```bash
# Storybook開発サーバー起動
pnpm sb

# Storybookビルド
pnpm build-sb
```

## 環境変数

`.env.example`を参考に`.env`ファイルを作成してください。

```env
# Render Mode (static | ssr | isr)
NEXT_PUBLIC_RENDER_MODE=static

# ISR Revalidate Interval (seconds)
NEXT_PUBLIC_REVALIDATE_INTERVAL=3600

# API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Enable Development Tools
NEXT_PUBLIC_ENABLE_DEVTOOLS=true

# Enable MSW (Mock Service Worker)
NEXT_PUBLIC_ENABLE_MSW=true
```

### レンダリングモード

- **`static`** — 静的エクスポート。`out/` に HTML を出力（S3、GitHub Pages 等向け）
- **`ssr`** — サーバーサイドレンダリング。リクエストごとに描画
- **`isr`** — Incremental Static Regeneration。静的生成 + 定期再検証

## SVGアイコンシステム

### アイコンの追加

`src/components/common/Icon/iconPaths.ts` にSVGパスを追加することで使用可能になります。

### 使用方法

```tsx
import { Icon } from '@/components/common/Icon';

function Example() {
  return (
    <div>
      <Icon name="user" />
      <Icon name="search" color="blue" size={32} />
      <Icon name="heart" color="gray" hoverColor="red" />
      <Icon name="menu" rotate={90} />
    </div>
  );
}
```

## コンポーネント定義の方針

本プロジェクトでは `React.FC` を使用せず、以下の方針でコンポーネントを定義します。

### 基本: アロー関数

```tsx
export const Button = ({ variant, children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};
```

### 型ジェネリクスが必要な場合: function宣言

```tsx
export function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}
```

## スタイリング

### SCSS Modules

各コンポーネントは独自のスタイルファイル（`.module.scss`）を持ちます。

```tsx
import styles from './Button.module.scss';

<button className={styles.button}>Click</button>;
```

### グローバル変数とミックスイン

`src/styles/variables.scss`と`src/styles/mixins.scss`は全てのSCSSファイルで自動的にインポートされます。

```scss
.myComponent {
  color: v.$primary-color;
  padding: v.$spacing-md;

  @include flex-center;
  @include respond-to('md') {
    padding: v.$spacing-lg;
  }
}
```

## API通信

### TanStack Query + Axios

```tsx
import { useUsers } from '@/hooks/useUsers';

function UserList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## 状態管理

### Zustand

クライアント状態（UI状態など）はZustandで管理します。

```tsx
import { useUIStore } from '@/stores/uiStore';

function Header() {
  const { theme, toggleTheme } = useUIStore();

  return <button onClick={toggleTheme}>Current theme: {theme}</button>;
}
```

## テスト

### ユニットテスト（Vitest）

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('ボタンが正しく表示される', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### E2Eテスト（Playwright）

```ts
import { test, expect } from '@playwright/test';

test('ホームページが表示される', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading')).toBeVisible();
});
```

## アクセシビリティ

- セマンティックHTML要素の使用
- 適切なARIA属性の設定
- キーボードナビゲーション対応（スキップリンク）
- フォーカス管理
- スクリーンリーダー対応

ESLintの`jsx-a11y`プラグインとMarkuplintがアクセシビリティの問題を検出します。Storybookでは`@storybook/addon-a11y`によるa11y監査が利用可能です。

## 技術スタック

| カテゴリ | 技術 | 用途 |
| --- | --- | --- |
| **コア** | Next.js 15 (App Router) | フレームワーク |
| | React 19 | UIライブラリ |
| | TypeScript | 型安全性 |
| **スタイル** | SCSS Modules | スコープ化スタイリング |
| **状態管理** | TanStack Query | サーバー状態 |
| | Zustand | クライアント状態 |
| **API通信** | Axios | HTTPクライアント |
| | Zod | バリデーション |
| **モック** | MSW | APIモッキング |
| **アイコン** | インラインSVG | アイコンシステム |
| **テスト** | Vitest | ユニットテスト |
| | Testing Library | コンポーネントテスト |
| | Playwright | E2Eテスト |
| | Storybook | コンポーネントカタログ |
| **品質管理** | ESLint | JSリント |
| | Prettier | フォーマット |
| | Stylelint | CSS/SCSSリント |
| | Markuplint | JSXマークアップリント |
| **a11y** | jsx-a11y | アクセシビリティ |
| | Storybook a11yアドオン | 自動チェック |
| **Git hooks** | Husky + lint-staged | コミット前チェック |

## ライセンス

MIT License
