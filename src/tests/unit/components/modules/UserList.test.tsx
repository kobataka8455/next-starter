import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserList } from '@/components/modules/UserList';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * テスト用のQueryClientProviderラッパー
 */
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('UserList Component', () => {
  it('ローディング中の表示が正しい', () => {
    render(<UserList />, { wrapper: createWrapper() });
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('ユーザー一覧が表示される', async () => {
    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('ユーザー一覧')).toBeInTheDocument();
    });

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('Carol White')).toBeInTheDocument();
  });

  it('ユーザーのメールアドレスが表示される', async () => {
    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    });

    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('carol@example.com')).toBeInTheDocument();
  });

  it('ユーザーのロールが表示される', async () => {
    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('admin')).toBeInTheDocument();
    });

    const memberRoles = screen.getAllByText('member');
    expect(memberRoles).toHaveLength(2);
  });

  it('各ユーザーに詳細ボタンが表示される', async () => {
    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    expect(
      screen.getByLabelText('Alice Johnsonの詳細を表示')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Bob Smithの詳細を表示')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Carol Whiteの詳細を表示')
    ).toBeInTheDocument();
  });

  it('アバターがある場合は画像が表示される', async () => {
    const { container } = render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    const avatars = container.querySelectorAll('img');
    // Alice と Bob はアバターあり、Carol はなし
    expect(avatars).toHaveLength(2);
    expect(avatars[0]).toHaveAttribute(
      'src',
      'https://placehold.jp/600x600.png'
    );
    expect(avatars[1]).toHaveAttribute(
      'src',
      'https://placehold.jp/600x600.png'
    );
  });

  it('APIエラー時にエラーメッセージが表示される', async () => {
    server.use(
      http.get(`${API_BASE_URL}/users`, () => {
        return HttpResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      })
    );

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByText(/エラーが発生しました/)).toBeInTheDocument();
  });

  it('ユーザーが0件の場合は空メッセージが表示される', async () => {
    server.use(
      http.get(`${API_BASE_URL}/users`, () => {
        return HttpResponse.json([], { status: 200 });
      })
    );

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('ユーザーが見つかりません')).toBeInTheDocument();
    });
  });

  it('ローディング中はrole="status"が設定されている', () => {
    render(<UserList />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('詳細ボタンをクリックするとconsole.logが呼ばれる', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    const button = screen.getByLabelText('Alice Johnsonの詳細を表示');
    await userEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith('View user:', 1);
    consoleSpy.mockRestore();
  });
});
