import { authApi } from '@/auth/api/auth.api';
import { authStorage } from '@/auth/services/authStorage.service';
import type { LoginPayload } from '@/auth/types/auth.types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearSession, restoreSession, setSession } from '@/store/slices/auth.slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const login = async (payload: LoginPayload) => {
    const session = await authApi.login(payload);

    if (!['broker', 'agent'].includes(session.user.role)) {
      throw new Error('Only broker and agent accounts can access this dashboard.');
    }

    authStorage.save(session);
    dispatch(setSession(session));
    return session;
  };

  const restore = () => {
    const session = authStorage.get();
    dispatch(restoreSession(session));
    return session;
  };

  const logout = () => {
    authStorage.clear();
    dispatch(clearSession());
  };

  return {
    ...auth,
    login,
    logout,
    restore,
  };
};
