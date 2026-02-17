/**
 * 共通ボタンコンポーネント
 */

import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  const classNames = [
    styles.button,
    styles[`--${variant}`],
    styles[`--${size}`],
    fullWidth && styles['--full-width'],
    loading && styles['is-loading'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className={styles.button__spinner} aria-hidden="true">
          ⏳
        </span>
      )}
      <span
        className={`${styles.button__text} ${loading ? styles['is-hidden'] : ''}`}
      >
        {children}
      </span>
    </button>
  );
};
