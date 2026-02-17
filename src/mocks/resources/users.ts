/**
 * ユーザー関連のモックデータ・ハンドラー定義
 *
 * このファイルはスターターキットのサンプルとして「ユーザー」APIを想定したダミーです。
 * 実際のプロジェクトでは、接続先のAPIに合わせて置き換えてください。
 */

import { http, HttpResponse } from 'msw';
import type { User, UserProfile } from '@/types';

// モック用のサンプルデータ
export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://placehold.jp/600x600.png',
    role: 'admin',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-02-14T15:45:00Z',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://placehold.jp/600x600.png',
    role: 'member',
    createdAt: '2024-01-20T14:20:00Z',
    updatedAt: '2024-02-10T09:15:00Z',
  },
  {
    id: 3,
    name: 'Carol White',
    email: 'carol@example.com',
    role: 'member',
    createdAt: '2024-02-01T11:00:00Z',
    updatedAt: '2024-02-14T12:00:00Z',
  },
];

const mockProfiles: Record<number, UserProfile> = {
  1: {
    ...mockUsers[0],
    bio: 'フロントエンド開発者',
    website: 'https://alice.example.com',
    location: 'Tokyo, Japan',
  },
  2: {
    ...mockUsers[1],
    bio: 'バックエンド開発者',
    location: 'Osaka, Japan',
  },
  3: {
    ...mockUsers[2],
    bio: 'フルスタック開発者',
    website: 'https://carol.example.com',
    location: 'Kyoto, Japan',
  },
};

/**
 * ユーザー関連の MSW ハンドラーを生成
 */
export const createUserHandlers = (apiBaseUrl: string) => [
  // GET /users - ユーザー一覧取得
  http.get(`${apiBaseUrl}/users`, () => {
    return HttpResponse.json(mockUsers, { status: 200 });
  }),

  // GET /users/:id - 単一ユーザー取得
  http.get(`${apiBaseUrl}/users/:id`, ({ params }) => {
    const userId = Number(params.id);
    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      return HttpResponse.json(
        { message: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 404 }
      );
    }

    return HttpResponse.json(user, { status: 200 });
  }),

  // GET /users/:id/profile - ユーザープロフィール取得
  http.get(`${apiBaseUrl}/users/:id/profile`, ({ params }) => {
    const userId = Number(params.id);
    const profile = mockProfiles[userId];

    if (!profile) {
      return HttpResponse.json(
        { message: 'Profile not found', code: 'PROFILE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return HttpResponse.json(profile, { status: 200 });
  }),

  // POST /users - ユーザー作成
  http.post(`${apiBaseUrl}/users`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    // バリデーション
    if (!body.name || !body.email || !body.password) {
      return HttpResponse.json(
        { message: 'Required fields missing', code: 'INVALID_INPUT' },
        { status: 400 }
      );
    }

    // 新しいユーザーを作成
    const newUser: User = {
      id:
        Math.max(
          ...mockUsers.map((u) => (typeof u.id === 'number' ? u.id : 0))
        ) + 1,
      name: body.name as string,
      email: body.email as string,
      role: (body.role as User['role']) || 'member',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    mockProfiles[newUser.id] = { ...newUser };

    return HttpResponse.json(newUser, { status: 201 });
  }),

  // PATCH /users/:id - ユーザー更新
  http.patch(`${apiBaseUrl}/users/:id`, async ({ params, request }) => {
    const userId = Number(params.id);
    const userIndex = mockUsers.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return HttpResponse.json(
        { message: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = (await request.json()) as Partial<User>;
    const updatedUser = {
      ...mockUsers[userIndex],
      ...body,
      id: userId, // ID は上書き不可
      updatedAt: new Date().toISOString(),
    };

    mockUsers[userIndex] = updatedUser;
    mockProfiles[userId] = { ...updatedUser, ...mockProfiles[userId] };

    return HttpResponse.json(updatedUser, { status: 200 });
  }),

  // DELETE /users/:id - ユーザー削除
  http.delete(`${apiBaseUrl}/users/:id`, ({ params }) => {
    const userId = Number(params.id);
    const userIndex = mockUsers.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return HttpResponse.json(
        { message: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 404 }
      );
    }

    mockUsers.splice(userIndex, 1);
    delete mockProfiles[userId];

    return HttpResponse.json(null, { status: 204 });
  }),
];
