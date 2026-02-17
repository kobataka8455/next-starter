import type { Metadata } from 'next';
import { Layout } from '@/components/common/Layout';
import { Providers } from './providers';
import { MswProvider } from '@/mocks/MswProvider';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Next Starter',
  description:
    'A modern Next.js starter kit with SSR/SSG switching, TypeScript, and best practices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <MswProvider>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </MswProvider>
      </body>
    </html>
  );
}
