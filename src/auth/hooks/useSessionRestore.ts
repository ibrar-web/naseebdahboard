import { useEffect } from 'react';
import { authApi } from '@/auth/api/auth.api';
import { authStorage } from '@/auth/services/authStorage.service';
import type { AuthSession } from '@/auth/types/auth.types';
import { initFcm } from '@/services/firebase/fcm.service';
import {
  registerRefreshSessionHandler,
  registerUnauthorizedHandler,
} from '@/services/api';
import { connectSocket, disconnectSocket } from '@/services/sockets/socket';
import { useAppStore } from '@/store/app.store';

export const useSessionRestore = () => {
  const auth = useAppStore((state) => state.auth);
  const clearAuthSession = useAppStore((state) => state.clearAuthSession);
  const restoreAuthSession = useAppStore((state) => state.restoreAuthSession);
  const setAuthSession = useAppStore((state) => state.setAuthSession);

  useEffect(() => {
    let mounted = true;

    const handleUnauthorized = () => {
      disconnectSocket();
      clearAuthSession();
    };

    registerUnauthorizedHandler(handleUnauthorized);
    registerRefreshSessionHandler(async (refreshToken) => {
      const session = await authApi.refresh(refreshToken);
      authStorage.save(session);
      if (mounted) {
        setAuthSession(session);
      }
      return session;
    });

    const restoreValidatedSession = async () => {
      const session = authStorage.get();

      if (!session) {
        restoreAuthSession(null);
        return;
      }

      try {
        const currentUser = await authApi.me();

        if (!mounted || !['broker', 'agent'].includes(currentUser.role)) {
          throw new Error('Unauthorized role');
        }

        const validatedSession: AuthSession = {
          ...session,
          user: currentUser,
        };

        authStorage.save(validatedSession);
        restoreAuthSession(validatedSession);
        connectSocket(validatedSession.accessToken);
        void initFcm(() => undefined);
      } catch {
        handleUnauthorized();
      }
    };

    void restoreValidatedSession();

    return () => {
      mounted = false;
      registerUnauthorizedHandler(null);
      registerRefreshSessionHandler(null);
    };
    // bootstrap once at app load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearAuthSession, restoreAuthSession, setAuthSession]);

  return auth;
};
