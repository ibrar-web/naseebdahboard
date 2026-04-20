import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const { status } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (status === 'restoring') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand text-ink">
        Restoring secure session...
      </div>
    );
  }

  if (status !== 'authenticated') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
