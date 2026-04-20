import type { ApiListParams } from '@/services/api/core/http.types';
import { http } from '@/services/api/core/client';
import type { DealRecord } from '@/modules/shared/data/adminData';

export const dealsModule = {
  list(params?: ApiListParams) {
    return http.get<DealRecord[]>('/admin/deals', {
      params,
    });
  },
};
