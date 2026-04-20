import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { can } from '@/utils/permissions/can';
import type { AppPermission } from '@/utils/permissions/roles';

interface PermissionGuardProps extends PropsWithChildren {
  permission: AppPermission;
}

export const PermissionGuard = ({ permission, children }: PermissionGuardProps) => {
  const role = useAppSelector((state) => state.auth.session?.user.role ?? null);

  if (!can(role, permission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
