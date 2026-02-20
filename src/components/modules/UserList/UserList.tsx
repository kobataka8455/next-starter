'use client';

/**
 * ユーザーリストコンポーネント（サンプル）
 */

import Image from 'next/image';
import { useUsers } from '@/hooks/useUsers';
import { Button } from '@/components/common/Button';
import styles from './UserList.module.scss';

export const UserList = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <div className={styles.userList} role="status" aria-live="polite">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.userList} role="alert">
        <p className={styles.userList__error}>
          エラーが発生しました: {error.message}
        </p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className={styles.userList}>
        <p>ユーザーが見つかりません</p>
      </div>
    );
  }

  return (
    <div className={styles.userList}>
      <h1 className={styles.userList__title}>ユーザー一覧</h1>

      <ul className={styles.userList__list}>
        {users.map((user) => (
          <li key={user.id} className={styles.userList__item}>
            <div className={styles.userList__info}>
              {user.avatar && (
                <Image
                  src={user.avatar}
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                  className={styles.userList__avatar}
                  aria-hidden="true"
                />
              )}
              <div className={styles.userList__details}>
                <h2 className={styles.userList__name}>{user.name}</h2>
                <p className={styles.userList__email}>{user.email}</p>
                <p
                  className={`${styles.userList__role} ${styles[`--${user.role}`]}`}
                >
                  {user.role}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('View user:', user.id)}
              aria-label={`${user.name}の詳細を表示`}
            >
              詳細
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
