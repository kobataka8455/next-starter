import type { Metadata } from 'next';
import { UserList } from '@/components/modules/UserList';

export const metadata: Metadata = {
  title: 'ユーザー一覧 | Next Starter',
};

export default function Page() {
  return <UserList />;
}
