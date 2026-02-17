'use client';

/**
 * MSW を開発環境でブラウザ上で初期化するプロバイダー
 */

import { useEffect, useState } from 'react';

export function MswProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const enableMsw =
      process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_ENABLE_MSW === 'true';

    if (!enableMsw) {
      setIsReady(true);
      return;
    }

    void import('./browser').then(({ worker }) => {
      void worker
        .start({
          onUnhandledRequest: 'bypass',
        })
        .then(() => {
          setIsReady(true);
        });
    });
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
