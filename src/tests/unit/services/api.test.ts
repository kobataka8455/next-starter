/**
 * API関連のテスト
 * MSWを使ったモックサーバーのテスト
 */

import { describe, it, expect } from 'vitest';
import {
  fetchUsers,
  fetchUser,
  fetchUserProfile,
  createUser,
  updateUser,
  deleteUser,
} from '@/services/api/users';

describe('Users API with MSW', () => {
  // GET /users
  it('should fetch all users', async () => {
    const users = await fetchUsers();

    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });

  // GET /users/:id
  it('should fetch a single user by ID', async () => {
    const user = await fetchUser(1);

    expect(user).toBeDefined();
    expect(user.id).toBe(1);
    expect(user.name).toBe('Alice Johnson');
    expect(user.email).toBe('alice@example.com');
  });

  it('should return 404 for non-existent user', async () => {
    try {
      await fetchUser(99999);
      expect.fail('Should throw an error');
    } catch (error: unknown) {
      expect(
        (error as { response?: { status: number } })?.response?.status
      ).toBe(404);
    }
  });

  // GET /users/:id/profile
  it('should fetch a user profile', async () => {
    const profile = await fetchUserProfile(1);

    expect(profile).toBeDefined();
    expect(profile.id).toBe(1);
    expect(profile.name).toBe('Alice Johnson');
    expect(profile.bio).toBe('フロントエンド開発者');
    expect(profile.location).toBe('Tokyo, Japan');
  });

  it('should return 404 for non-existent profile', async () => {
    try {
      await fetchUserProfile(99999);
      expect.fail('Should throw an error');
    } catch (error: unknown) {
      expect(
        (error as { response?: { status: number } })?.response?.status
      ).toBe(404);
    }
  });

  // POST /users
  it('should create a new user', async () => {
    const newUser = await createUser({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'member',
    });

    expect(newUser).toBeDefined();
    expect(newUser.name).toBe('Test User');
    expect(newUser.email).toBe('test@example.com');
    expect(newUser.role).toBe('member');
    expect(newUser.id).toBeDefined();
  });

  it('should return 400 for missing required fields on create', async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
      await createUser({ name: 'Test' } as any);
      expect.fail('Should throw an error');
    } catch (error: unknown) {
      expect(
        (error as { response?: { status: number } })?.response?.status
      ).toBe(400);
    }
  });

  // PATCH /users/:id
  it('should update a user', async () => {
    const updatedUser = await updateUser(1, { name: 'Alice Updated' });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBe(1);
    expect(updatedUser.name).toBe('Alice Updated');
  });

  it('should return 404 for updating non-existent user', async () => {
    try {
      await updateUser(99999, { name: 'Nobody' });
      expect.fail('Should throw an error');
    } catch (error: unknown) {
      expect(
        (error as { response?: { status: number } })?.response?.status
      ).toBe(404);
    }
  });

  // DELETE /users/:id
  it('should delete a user', async () => {
    await expect(deleteUser(2)).resolves.toBeUndefined();
  });

  it('should return 404 for deleting non-existent user', async () => {
    try {
      await deleteUser(99999);
      expect.fail('Should throw an error');
    } catch (error: unknown) {
      expect(
        (error as { response?: { status: number } })?.response?.status
      ).toBe(404);
    }
  });
});
