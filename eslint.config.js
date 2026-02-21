import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import storybook from 'eslint-plugin-storybook';
import nextPlugin from '@next/eslint-plugin-next';
import importX from 'eslint-plugin-import-x';

export default tseslint.config(
  // グローバル無視パターン
  {
    ignores: [
      '.next/',
      'out/',
      'coverage/',
      'public/',
      'playwright-report/',
      '.storybook/',
      'next.config.ts',
      'vitest.config.ts',
      'vitest.shims.d.ts',
      'playwright.config.ts',
      'eslint.config.js',
      'next-env.d.ts',
    ],
  },

  // ベース設定
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    plugins: { 'import-x': importX },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports', // または 'separate-type-imports'
        },
      ],
      // 'import/order' を 'import-x/order' に変えるだけ
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'type'],
          'newlines-between': 'never',
        },
      ],
      // 型のインポートに関しても同様
      'import-x/no-duplicates': 'error',
    },
  },

  // TypeScriptパーサー設定
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // React Hooks
  {
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },

  // Next.js
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // アクセシビリティ
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['href'],
        },
      ],
    },
  },

  // Storybook
  ...storybook.configs['flat/recommended'],

  // カスタムルール
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      semi: ['error', 'always'],
    },
  }
);
