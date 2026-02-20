import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import {
  useUsers,
  useUser,
  useUserProfile,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  userKeys,
} from '@/hooks/useUsers';

const API_BASE_URL = 'http://localhost:8000/api';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useUsers hooks', () => {
  describe('userKeys', () => {
    it('all キーが正しい', () => {
      expect(userKeys.all).toEqual(['users']);
    });

    it('lists キーが正しい', () => {
      expect(userKeys.lists()).toEqual(['users', 'list']);
    });

    it('list キーにフィルタを含められる', () => {
      expect(userKeys.list({ role: 'admin' })).toEqual([
        'users',
        'list',
        { role: 'admin' },
      ]);
    });

    it('details キーが正しい', () => {
      expect(userKeys.details()).toEqual(['users', 'detail']);
    });

    it('detail キーにIDを含められる', () => {
      expect(userKeys.detail(1)).toEqual(['users', 'detail', 1]);
    });

    it('profile キーが正しい', () => {
      expect(userKeys.profile(1)).toEqual(['users', 'profile', 1]);
    });
  });

  describe('useUsers', () => {
    it('ユーザー一覧を取得できる', async () => {
      const { result } = renderHook(() => useUsers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data!.length).toBeGreaterThan(0);
      expect(result.current.data![0].name).toBe('Alice Johnson');
    });
  });

  describe('useUser', () => {
    it('単一ユーザーを取得できる', async () => {
      const { result } = renderHook(() => useUser(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data!.id).toBe(1);
      expect(result.current.data!.name).toBe('Alice Johnson');
    });

    it('userIdが0以下の場合はクエリを実行しない', () => {
      const { result } = renderHook(() => useUser(0), {
        wrapper: createWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
    });
  });

  describe('useUserProfile', () => {
    it('ユーザープロフィールを取得できる', async () => {
      const { result } = renderHook(() => useUserProfile(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data!.bio).toBe('フロントエンド開発者');
    });

    it('userIdが0以下の場合はクエリを実行しない', () => {
      const { result } = renderHook(() => useUserProfile(0), {
        wrapper: createWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
    });
  });

  describe('useCreateUser', () => {
    it('ユーザーを作成できる', async () => {
      const { result } = renderHook(() => useCreateUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        name: 'New User',
        email: 'new@example.com',
        password: 'password123',
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data!.name).toBe('New User');
    });
  });

  describe('useUpdateUser', () => {
    it('ユーザーを更新できる', async () => {
      const { result } = renderHook(() => useUpdateUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        userId: 1,
        data: { name: 'Alice Updated' },
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data!.name).toBe('Alice Updated');
    });
  });

  describe('useDeleteUser', () => {
    it('ユーザーを削除できる', async () => {
      const { result } = renderHook(() => useDeleteUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(2);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });

    it('存在しないユーザーの削除でエラーが発生する', async () => {
      server.use(
        http.delete(`${API_BASE_URL}/users/99999`, () => {
          return HttpResponse.json(
            { message: 'User not found' },
            { status: 404 }
          );
        })
      );

      const { result } = renderHook(() => useDeleteUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(99999);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });
});
