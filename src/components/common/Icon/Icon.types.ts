/**
 * Iconコンポーネントの型定義
 */

import React from 'react';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  /** アイコン名（例: 'user', 'search'） */
  name: string;
  /** サイズ（px） */
  size?: number;
  /** 色（currentColorまたは具体的な色） */
  color?: string;
  /** ホバー時の色 */
  hoverColor?: string;
  /** 回転角度（度） */
  rotate?: number;
  /** アニメーション */
  spin?: boolean;
};
