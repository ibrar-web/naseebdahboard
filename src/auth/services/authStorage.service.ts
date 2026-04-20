import type { AuthSession } from '@/auth/types/auth.types';
import { secureStorage } from '@/utils/encryption/secureStorage';

const STORAGE_KEY = 'naseebdabord.auth.session';

export const authStorage = {
  save(session: AuthSession) {
    secureStorage.set(STORAGE_KEY, session);
  },
  get() {
    return secureStorage.get<AuthSession>(STORAGE_KEY);
  },
  clear() {
    secureStorage.remove(STORAGE_KEY);
  },
};
