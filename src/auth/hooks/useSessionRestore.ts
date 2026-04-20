import { useEffect } from 'react';
import { useAuth } from '@/auth/hooks/useAuth';

export const useSessionRestore = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.restore();
    // restore once at boot
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return auth;
};
