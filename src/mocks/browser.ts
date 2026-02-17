/**
 * ブラウザ環境用の MSW セットアップ
 * Service Worker を使って、開発中のブラウザ上で fetch/XHR リクエストをインターセプトし、
 * モックレスポンスを返す。実際のAPIサーバーなしでフロントエンド開発が可能になる。
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
