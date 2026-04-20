import { useSessionRestore } from '@/auth/hooks/useSessionRestore';

export const SessionBootstrap = () => {
  useSessionRestore();
  return null;
};
