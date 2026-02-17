/**
 * 共通レイアウトコンポーネント（ヘッダー・フッター）
 */

import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      {/* スキップリンク（アクセシビリティ） */}
      <a href="#main-content" className="skip-link">
        メインコンテンツへスキップ
      </a>

      {/* ヘッダー */}
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.logo}>Next Starter</h1>
          <nav aria-label="メインナビゲーション">
            <ul className={styles.nav}>
              <li>
                <Link href="/">
                  <Icon name="user" size={20} />
                  <span>ユーザー</span>
                </Link>
              </li>
              <li>
                <Link href="/search">
                  <Icon name="search" size={20} />
                  <span>検索</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main id="main-content" className={styles.main} tabIndex={-1}>
        {children}
      </main>

      {/* フッター */}
      <footer className={styles.footer}>
        <div className="container">
          <p>
            <Icon name="heart" size={16} color="#ff6b6b" />
            <span>&copy; 2024 Next Starter. All rights reserved.</span>
          </p>
        </div>
      </footer>
    </div>
  );
};
