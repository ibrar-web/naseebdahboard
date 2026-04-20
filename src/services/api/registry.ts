import { authModule } from '@/services/api/modules/auth.module';
import { dealsModule } from '@/services/api/modules/deals.module';
import { marketplaceModule } from '@/services/api/modules/marketplace.module';
import { usersModule } from '@/services/api/modules/users.module';

export const apiRegistry = {
  auth: authModule,
  users: usersModule,
  marketplace: marketplaceModule,
  deals: dealsModule,
};
