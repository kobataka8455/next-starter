/**
 * 共通で使用する型定義
 */

// API関連の共通型
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type ApiError = {
  message: string;
  code?: string;
  details?: unknown;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

// ID型
export type ID = number | string;

// 日付型
export type DateString = string;

// ステータス型
export type Status = 'idle' | 'loading' | 'success' | 'error';
