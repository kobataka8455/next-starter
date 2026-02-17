/**
 * UI状態管理の型定義
 */

export type UIState = {
  // モーダル状態
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;

  // サイドバー状態
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // テーマ
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // ローディング状態
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};
