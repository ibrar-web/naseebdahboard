import { create } from 'zustand';
import type { AuthSession } from '@/auth/types/auth.types';

export interface AuthStoreState {
  session: AuthSession | null;
  status: 'idle' | 'restoring' | 'authenticated' | 'guest';
}

export interface UiStoreState {
  sidebarOpen: boolean;
  pageTitle: string;
}

export interface AppStoreState {
  auth: AuthStoreState;
  ui: UiStoreState;
  setAuthSession: (session: AuthSession) => void;
  restoreAuthSession: (session: AuthSession | null) => void;
  clearAuthSession: () => void;
  toggleSidebar: () => void;
  setPageTitle: (pageTitle: string) => void;
}

const initialAuthState: AuthStoreState = {
  session: null,
  status: 'restoring',
};

const initialUiState: UiStoreState = {
  sidebarOpen: true,
  pageTitle: 'Dashboard',
};

export const useAppStore = create<AppStoreState>()((set) => ({
  auth: initialAuthState,
  ui: initialUiState,
  setAuthSession: (session) =>
    set(() => ({
      auth: {
        session,
        status: 'authenticated',
      },
    })),
  restoreAuthSession: (session) =>
    set(() => ({
      auth: {
        session,
        status: session ? 'authenticated' : 'guest',
      },
    })),
  clearAuthSession: () =>
    set(() => ({
      auth: {
        session: null,
        status: 'guest',
      },
    })),
  toggleSidebar: () =>
    set((state) => ({
      ui: {
        ...state.ui,
        sidebarOpen: !state.ui.sidebarOpen,
      },
    })),
  setPageTitle: (pageTitle) =>
    set((state) => ({
      ui: {
        ...state.ui,
        pageTitle,
      },
    })),
}));
