/**
 * ボタンコンポーネントの型定義
 */

import React from 'react';

/** ボタンのスタイルバリエーション */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';

/** ボタンのサイズ */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * ボタンコンポーネントのprops
 *
 * @description HTMLのbutton要素の属性を継承し、独自のpropsを追加
 */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** ボタンのスタイルバリエーション @default 'primary' */
  variant?: ButtonVariant;
  /** ボタンのサイズ @default 'md' */
  size?: ButtonSize;
  /** 横幅を100%にするか @default false */
  fullWidth?: boolean;
  /** ローディング状態にするか @default false */
  loading?: boolean;
  /** ボタンの中身 */
  children: React.ReactNode;
};
