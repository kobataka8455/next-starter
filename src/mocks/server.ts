/**
 * Node.js 環境用の MSW セットアップ
 * Vitest 等のユニットテストや SSR 環境で HTTP リクエストをインターセプトし、
 * モックレスポンスを返す。ブラウザを起動せずに API 依存のコードをテストできる。
 */

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
