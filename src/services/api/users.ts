/**
 * ユーザー関連のAPI関数
 */

import type {
  User,
  UserProfile,
  CreateUserInput,
  UpdateUserInput,
} from '@/types';
import { apiClient } from './client';
import { userSchema, userProfileSchema } from './schemas/user';

/**
 * ユーザー一覧を取得
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<unknown[]>('/users');
  return response.data.map((user) => userSchema.parse(user));
};

/**
 * 単一ユーザーを取得
 */
export const fetchUser = async (userId: number): Promise<User> => {
  const response = await apiClient.get(`/users/${userId}`);
  return userSchema.parse(response.data);
};

/**
 * ユーザープロフィールを取得
 */
export const fetchUserProfile = async (
  userId: number
): Promise<UserProfile> => {
  const response = await apiClient.get(`/users/${userId}/profile`);
  return userProfileSchema.parse(response.data);
};

/**
 * ユーザーを作成
 */
export const createUser = async (data: CreateUserInput): Promise<User> => {
  const response = await apiClient.post('/users', data);
  return userSchema.parse(response.data);
};

/**
 * ユーザーを更新
 */
export const updateUser = async (
  userId: number,
  data: UpdateUserInput
): Promise<User> => {
  const response = await apiClient.patch(`/users/${userId}`, data);
  return userSchema.parse(response.data);
};

/**
 * ユーザーを削除
 */
export const deleteUser = async (userId: number): Promise<void> => {
  await apiClient.delete(`/users/${userId}`);
};
