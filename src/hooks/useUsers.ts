/**
 * ユーザー関連のTanStack Queryフック
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateUserInput, UpdateUserInput } from '@/types';
import {
  fetchUsers,
  fetchUser,
  fetchUserProfile,
  createUser,
  updateUser,
  deleteUser,
} from '@/services/api/users';

// クエリキー
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: unknown) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
  profile: (id: number) => [...userKeys.all, 'profile', id] as const,
};

/**
 * ユーザー一覧を取得するフック
 */
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5分間はキャッシュを使用
    gcTime: 10 * 60 * 1000, // 10分間キャッシュを保持
  });
};

/**
 * 単一ユーザーを取得するフック
 */
export const useUser = (userId: number) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: userId > 0, // userIdが有効な場合のみ実行
  });
};

/**
 * ユーザープロフィールを取得するフック
 */
export const useUserProfile = (userId: number) => {
  return useQuery({
    queryKey: userKeys.profile(userId),
    queryFn: () => fetchUserProfile(userId),
    staleTime: 5 * 60 * 1000,
    enabled: userId > 0,
  });
};

/**
 * ユーザー作成のフック
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => createUser(data),
    onSuccess: () => {
      // ユーザー一覧のキャッシュを無効化
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

/**
 * ユーザー更新のフック
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: UpdateUserInput }) =>
      updateUser(userId, data),
    onSuccess: (updatedUser) => {
      // 特定のユーザーキャッシュを更新
      queryClient.setQueryData(
        userKeys.detail(Number(updatedUser.id)),
        updatedUser
      );
      // ユーザー一覧のキャッシュを無効化
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

/**
 * ユーザー削除のフック
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: (_data, userId) => {
      // 削除したユーザーのキャッシュを削除
      queryClient.removeQueries({ queryKey: userKeys.detail(userId) });
      // ユーザー一覧のキャッシュを無効化
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
