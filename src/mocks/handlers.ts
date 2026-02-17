/**
 * MSW ハンドラー定義
 * 各リソースのハンドラーを集約
 */

import { createUserHandlers } from './resources/users';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const handlers = [...createUserHandlers(API_BASE_URL)];
