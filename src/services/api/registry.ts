import { authEndpoint } from '@/services/api/endpoints/auth.endpoint';
import { dealsEndpoint } from '@/services/api/endpoints/deals.endpoint';
import { marketplaceEndpoint } from '@/services/api/endpoints/marketplace.endpoint';
import { usersEndpoint } from '@/services/api/endpoints/users.endpoint';

export const apiRegistry = {
  auth: authEndpoint,
  users: usersEndpoint,
  marketplace: marketplaceEndpoint,
  deals: dealsEndpoint,
};
