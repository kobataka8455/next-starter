/**
 * UI状態を管理するZustandストア
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UIState } from './uiStore.types';

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // モーダル
      isModalOpen: false,
      modalContent: null,
      openModal: (content) =>
        set({ isModalOpen: true, modalContent: content }, false, 'openModal'),
      closeModal: () =>
        set({ isModalOpen: false, modalContent: null }, false, 'closeModal'),

      // サイドバー
      isSidebarCollapsed: false,
      toggleSidebar: () =>
        set(
          (state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed }),
          false,
          'toggleSidebar'
        ),
      setSidebarCollapsed: (collapsed) =>
        set({ isSidebarCollapsed: collapsed }, false, 'setSidebarCollapsed'),

      // テーマ
      theme: 'light',
      setTheme: (theme) => set({ theme }, false, 'setTheme'),
      toggleTheme: () =>
        set(
          (state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }),
          false,
          'toggleTheme'
        ),

      // ローディング
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }, false, 'setLoading'),
    }),
    { name: 'UIStore' }
  )
);
