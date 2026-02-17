/**
 * ユーザー関連の型定義
 */

import { ID, DateString } from './common';

export type User = {
  id: ID;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: DateString;
  updatedAt: DateString;
};

export type UserRole = 'admin' | 'member' | 'guest';

export type UserProfile = User & {
  bio?: string;
  website?: string;
  location?: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export type UpdateUserInput = {
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  location?: string;
};
