/**
 * ユーザー関連のZodスキーマ（バリデーション用）
 */

import { z } from 'zod';

// ユーザースキーマ
export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  avatar: z.string().url().optional(),
  role: z.enum(['admin', 'member', 'guest']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ユーザープロフィールスキーマ
export const userProfileSchema = userSchema.extend({
  bio: z.string().optional(),
  website: z.url().optional(),
  location: z.string().optional(),
});

// ユーザー作成スキーマ
export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'member', 'guest']).optional(),
});

// ユーザー更新スキーマ
export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email().optional(),
  avatar: z.url().optional(),
  bio: z.string().optional(),
  website: z.url().optional(),
  location: z.string().optional(),
});
