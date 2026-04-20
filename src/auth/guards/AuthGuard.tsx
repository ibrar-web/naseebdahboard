import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PageSkeleton } from '@/components/ui/PageSkeleton';
import { useAppSelector } from '@/store/hooks';

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const { status } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (status === 'restoring') {
    return (
      <div className="min-h-screen bg-sand p-6">
        <PageSkeleton />
      </div>
    );
  }

  if (status !== 'authenticated') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
