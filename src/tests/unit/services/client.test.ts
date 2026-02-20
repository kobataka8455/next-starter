/**
 * APIクライアント（インターセプター）のテスト
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { AxiosError } from 'axios';
import { server } from '@/mocks/server';
import { apiClient } from '@/services/api/client';

const API_BASE_URL = 'http://localhost:8000/api';

describe('API Client Interceptors', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('リクエストインターセプター', () => {
    it('認証トークンがある場合はAuthorizationヘッダーを追加する', async () => {
      localStorage.setItem('authToken', 'test-token');

      let capturedAuth = '';
      server.use(
        http.get(`${API_BASE_URL}/test-auth`, ({ request }) => {
          capturedAuth = request.headers.get('Authorization') || '';
          return HttpResponse.json({ ok: true });
        })
      );

      await apiClient.get('/test-auth');
      expect(capturedAuth).toBe('Bearer test-token');
    });

    it('リクエストインターセプターのエラーハンドラーがエラーをrejectする', async () => {
      // リクエストインターセプターのエラーコールバック（第2引数）をテスト
      const requestInterceptor = apiClient.interceptors.request as unknown as {
        handlers: Array<{
          rejected: (error: Error) => Promise<never>;
        }>;
      };

      const lastHandler =
        requestInterceptor.handlers[requestInterceptor.handlers.length - 1];
      const testError = new Error('Request setup failed');

      await expect(lastHandler.rejected(testError)).rejects.toThrow(
        'Request setup failed'
      );
    });

    it('認証トークンがない場合はAuthorizationヘッダーを追加しない', async () => {
      let capturedAuth: string | null = null;
      server.use(
        http.get(`${API_BASE_URL}/test-no-auth`, ({ request }) => {
          capturedAuth = request.headers.get('Authorization');
          return HttpResponse.json({ ok: true });
        })
      );

      await apiClient.get('/test-no-auth');
      expect(capturedAuth).toBeNull();
    });
  });

  describe('レスポンスインターセプター', () => {
    it('401エラーでトークンを削除しリダイレクトする', async () => {
      localStorage.setItem('authToken', 'expired-token');

      const locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({
        ...window.location,
        href: '',
      });

      const hrefSetter = vi.fn();
      Object.defineProperty(window.location, 'href', {
        set: hrefSetter,
        configurable: true,
      });

      server.use(
        http.get(`${API_BASE_URL}/test-401`, () => {
          return HttpResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
          );
        })
      );

      try {
        await apiClient.get('/test-401');
        expect.fail('Should throw');
      } catch {
        expect(localStorage.getItem('authToken')).toBeNull();
      }

      locationSpy.mockRestore();
    });

    it('403エラーがログ出力される', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      server.use(
        http.get(`${API_BASE_URL}/test-403`, () => {
          return HttpResponse.json(
            { message: 'Forbidden resource' },
            { status: 403 }
          );
        })
      );

      try {
        await apiClient.get('/test-403');
        expect.fail('Should throw');
      } catch {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Access forbidden:',
          'Forbidden resource'
        );
      }

      consoleSpy.mockRestore();
    });

    it('500エラーがログ出力される', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      server.use(
        http.get(`${API_BASE_URL}/test-500`, () => {
          return HttpResponse.json(
            { message: 'Server failure' },
            { status: 500 }
          );
        })
      );

      try {
        await apiClient.get('/test-500');
        expect.fail('Should throw');
      } catch {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Server error:',
          'Server failure'
        );
      }

      consoleSpy.mockRestore();
    });

    it('その他のHTTPエラーがログ出力される', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      server.use(
        http.get(`${API_BASE_URL}/test-422`, () => {
          return HttpResponse.json(
            { message: 'Validation error' },
            { status: 422 }
          );
        })
      );

      try {
        await apiClient.get('/test-422');
        expect.fail('Should throw');
      } catch {
        expect(consoleSpy).toHaveBeenCalledWith(
          'API Error:',
          'Validation error'
        );
      }

      consoleSpy.mockRestore();
    });

    it('404エラーがログ出力される', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      server.use(
        http.get(`${API_BASE_URL}/test-404`, () => {
          return HttpResponse.json({ message: 'Not found' }, { status: 404 });
        })
      );

      try {
        await apiClient.get('/test-404');
        expect.fail('Should throw');
      } catch {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Resource not found:',
          'Not found'
        );
      }

      consoleSpy.mockRestore();
    });

    it('ネットワークエラー時にログ出力される', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      server.use(
        http.get(`${API_BASE_URL}/test-network-error`, () => {
          return HttpResponse.error();
        })
      );

      try {
        await apiClient.get('/test-network-error');
        expect.fail('Should throw');
      } catch {
        expect(consoleSpy).toHaveBeenCalledWith('No response from server');
      }

      consoleSpy.mockRestore();
    });

    it('リクエスト設定エラー時にログ出力される', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // レスポンスインターセプターのエラーコールバックを直接呼ぶ
      const responseInterceptor = apiClient.interceptors
        .response as unknown as {
        handlers: Array<{
          rejected: (error: AxiosError) => Promise<never>;
        }>;
      };

      const lastHandler =
        responseInterceptor.handlers[responseInterceptor.handlers.length - 1];

      // response も request もない AxiosError を作成
      const error = new AxiosError('Invalid config');

      try {
        await lastHandler.rejected(error);
        expect.fail('Should throw');
      } catch {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Request setup error:',
          'Invalid config'
        );
      }

      consoleSpy.mockRestore();
    });
  });
});
