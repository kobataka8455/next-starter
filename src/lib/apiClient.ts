/**
 * AxiosベースのAPIクライアント
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '@/types';

// 環境変数から基底URLを取得
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

const isDev = process.env.NODE_ENV === 'development';

// Axiosインスタンスの作成
export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 認証トークンを追加（ブラウザ環境のみ）
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // リクエストログ（開発環境のみ）
    if (isDev) {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`
      );
    }

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => {
    // レスポンスログ（開発環境のみ）
    if (isDev) {
      console.log(`[API Response] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // エラーハンドリング
    if (error.response) {
      // サーバーからのエラーレスポンス
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // 認証エラー（ブラウザ環境のみ）
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          break;
        case 403:
          // 権限エラー
          console.error('Access forbidden:', data.message);
          break;
        case 404:
          // リソースが見つからない
          console.error('Resource not found:', data.message);
          break;
        case 500:
          // サーバーエラー
          console.error('Server error:', data.message);
          break;
        default:
          console.error('API Error:', data.message);
      }
    } else if (error.request) {
      // リクエストは送信されたがレスポンスがない
      console.error('No response from server');
    } else {
      // リクエスト設定時のエラー
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);
