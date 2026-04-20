import { permissionMatrix } from '@/utils/permissions/permissionMatrix';
import type { AdminRole, AppPermission } from '@/utils/permissions/roles';

export const can = (role: AdminRole | null, permission: AppPermission) => {
  if (!role) {
    return false;
  }

  return permissionMatrix[role].includes(permission);
};
