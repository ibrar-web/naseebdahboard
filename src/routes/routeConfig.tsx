import type { ReactNode } from 'react';
import type { AppPermission } from '@/utils/permissions/roles';
import { DashboardPage } from '@/modules/dashboard/pages/DashboardPage';
import { UsersPage } from '@/modules/users/pages/UsersPage';
import { BuyersViewPage } from '@/modules/buyers-view/pages/BuyersViewPage';
import { SellersViewPage } from '@/modules/sellers-view/pages/SellersViewPage';
import { MarketplacePage } from '@/modules/marketplace/pages/MarketplacePage';
import { RequestsPage } from '@/modules/requests/pages/RequestsPage';
import { DealsPage } from '@/modules/deals/pages/DealsPage';
import { DocumentsPage } from '@/modules/documents/pages/DocumentsPage';
import { AnalyticsPage } from '@/modules/analytics/pages/AnalyticsPage';

export interface AppRouteConfig {
  label: string;
  path: string;
  permission: AppPermission;
  element: ReactNode;
  brokerOnly?: boolean;
}

export const appRoutes: AppRouteConfig[] = [
  {
    label: 'Dashboard',
    path: '/',
    permission: 'dashboard.view',
    element: <DashboardPage />,
  },
  {
    label: 'Users',
    path: '/users',
    permission: 'users.view',
    element: <UsersPage />,
  },
  {
    label: 'Buyers',
    path: '/buyers',
    permission: 'buyers.view',
    element: <BuyersViewPage />,
  },
  {
    label: 'Sellers',
    path: '/sellers',
    permission: 'sellers.view',
    element: <SellersViewPage />,
  },
  {
    label: 'Marketplace',
    path: '/marketplace',
    permission: 'marketplace.view',
    element: <MarketplacePage />,
  },
  {
    label: 'Requests',
    path: '/requests',
    permission: 'requests.view',
    element: <RequestsPage />,
  },
  {
    label: 'Deals',
    path: '/deals',
    permission: 'deals.view',
    element: <DealsPage />,
  },
  {
    label: 'Documents',
    path: '/documents',
    permission: 'documents.view',
    element: <DocumentsPage />,
  },
  {
    label: 'Analytics',
    path: '/analytics',
    permission: 'analytics.view',
    element: <AnalyticsPage />,
    brokerOnly: true,
  },
];
