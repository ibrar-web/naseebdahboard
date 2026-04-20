import type { ApiListParams } from '@/services/api/core/http.types';
import { http } from '@/services/api/core/client';
import type { MarketplaceListingRecord } from '@/modules/shared/data/adminData';

export const marketplaceModule = {
  list(params?: ApiListParams) {
    return http.get<MarketplaceListingRecord[]>('/admin/marketplace/listings', {
      params,
    });
  },
};
