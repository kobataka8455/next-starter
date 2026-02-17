import '@testing-library/jest-dom';
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from '@/mocks/server';

// jest-dom matchersを追加
expect.extend(matchers);

// すべてのテスト前に MSW サーバーを開始
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// 各テスト後にリセット
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// すべてのテスト後に MSW サーバーをクローズ
afterAll(() => {
  server.close();
});
