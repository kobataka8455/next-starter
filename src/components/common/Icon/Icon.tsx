/**
 * SVGアイコンコンポーネント
 * インラインSVGでアイコンを表示
 */

import React from 'react';
import type { IconProps } from './Icon.types';
import styles from './Icon.module.scss';
import { iconPaths } from './iconPaths';

export const Icon = ({
  name,
  size = 24,
  color = 'currentColor',
  hoverColor,
  rotate,
  spin = false,
  className,
  style,
  ...props
}: IconProps) => {
  const iconStyle: React.CSSProperties = {
    ...style,
    width: size,
    height: size,
    color,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    ...(hoverColor &&
      ({
        '--icon-hover-color': hoverColor,
      } as React.CSSProperties)),
  };

  const classNames = [styles.icon, spin && styles['--spin'], className]
    .filter(Boolean)
    .join(' ');

  const pathData = iconPaths[name];

  return (
    <svg
      className={classNames}
      style={iconStyle}
      aria-hidden="true"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {pathData ? (
        <path d={pathData} fill="currentColor" />
      ) : (
        <rect width="24" height="24" fill="currentColor" opacity="0.2" />
      )}
    </svg>
  );
};
