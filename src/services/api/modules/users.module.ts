import type { ApiListParams } from '@/services/api/core/http.types';
import { http } from '@/services/api/core/client';
import type { AdminUserRecord } from '@/modules/shared/data/adminData';

export const usersModule = {
  list(params?: ApiListParams) {
    return http.get<AdminUserRecord[]>('/admin/users', {
      params,
    });
  },
};
