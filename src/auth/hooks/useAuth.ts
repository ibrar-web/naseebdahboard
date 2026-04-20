import { authApi } from '@/auth/api/auth.api';
import { authStorage } from '@/auth/services/authStorage.service';
import type { LoginPayload } from '@/auth/types/auth.types';
import { disconnectSocket } from '@/services/sockets/socket';
import { useAppStore } from '@/store/app.store';

export const useAuth = () => {
  const auth = useAppStore((state) => state.auth);
  const setAuthSession = useAppStore((state) => state.setAuthSession);
  const restoreAuthSession = useAppStore((state) => state.restoreAuthSession);
  const clearAuthSession = useAppStore((state) => state.clearAuthSession);

  const login = async (payload: LoginPayload) => {
    const session = await authApi.login(payload);

    if (!['broker', 'agent'].includes(session.user.role)) {
      throw new Error('Only broker and agent accounts can access this dashboard.');
    }

    authStorage.save(session);
    setAuthSession(session);
    return session;
  };

  const restore = () => {
    const session = authStorage.get();
    restoreAuthSession(session);
    return session;
  };

  const logout = () => {
    disconnectSocket();
    authStorage.clear();
    clearAuthSession();
  };

  return {
    ...auth,
    login,
    logout,
    restore,
  };
};
