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
import { AdminPlaceholderPage } from '@/modules/admin/pages/AdminPlaceholderPage';
import { CategoriesPage } from '@/modules/categories/pages/CategoriesPage';
import { CategoryDetailPage } from '@/modules/categories/pages/CategoryDetailPage';
import { CategoryFormPage } from '@/modules/categories/pages/CategoryFormPage';
import { AccountPage } from '@/modules/settings/pages/AccountPage';
import { SettingsPage } from '@/modules/settings/pages/SettingsPage';

export type NavIconKey =
  | 'dashboard'
  | 'users'
  | 'categories'
  | 'forms'
  | 'posts'
  | 'offers'
  | 'deals'
  | 'payments'
  | 'mills'
  | 'disputes'
  | 'rates'
  | 'ratings'
  | 'alerts'
  | 'reports'
  | 'team';

export interface AppRouteConfig {
  label: string;
  path: string;
  permission: AppPermission;
  element: ReactNode;
  brokerOnly?: boolean;
  icon: NavIconKey;
  badge?: number;
  showInNav?: boolean;
}

export const appRoutes: AppRouteConfig[] = [
  {
    label: 'Dashboard',
    path: '/',
    permission: 'dashboard.view',
    element: <DashboardPage />,
    icon: 'dashboard',
  },
  {
    label: 'Users',
    path: '/users',
    permission: 'users.view',
    element: <UsersPage />,
    icon: 'users',
    badge: 2,
  },
  {
    label: 'Categories',
    path: '/categories',
    permission: 'categories.view',
    element: <CategoriesPage />,
    icon: 'categories',
  },
  {
    label: 'New Category',
    path: '/categories/new',
    permission: 'categories.view',
    element: <CategoryFormPage />,
    icon: 'categories',
    showInNav: false,
  },
  {
    label: 'Category Details',
    path: '/categories/:categoryId',
    permission: 'categories.view',
    element: <CategoryDetailPage />,
    icon: 'categories',
    showInNav: false,
  },
  {
    label: 'Forms',
    path: '/forms',
    permission: 'forms.view',
    element: (
      <AdminPlaceholderPage
        title="Forms"
        description="Review onboarding, verification, shipment, and dispute forms submitted through admin workflows."
        accent="blue"
      />
    ),
    icon: 'forms',
  },
  {
    label: 'Posts',
    path: '/posts',
    permission: 'posts.view',
    element: <MarketplacePage />,
    icon: 'posts',
    badge: 3,
  },
  {
    label: 'Offers',
    path: '/offers',
    permission: 'offers.view',
    element: <RequestsPage />,
    icon: 'offers',
    badge: 1,
  },
  {
    label: 'Deals',
    path: '/deals',
    permission: 'deals.view',
    element: <DealsPage />,
    icon: 'deals',
  },
  {
    label: 'Payments',
    path: '/payments',
    permission: 'payments.view',
    element: (
      <AdminPlaceholderPage
        title="Payments"
        description="Track payment verification, pending transfers, commission events, and escalated financial checks."
        accent="red"
      />
    ),
    icon: 'payments',
    badge: 2,
  },
  {
    label: 'Mills',
    path: '/mills',
    permission: 'mills.view',
    element: (
      <AdminPlaceholderPage
        title="Mills"
        description="Maintain mill profiles, buying capacity, active demand, and operational risk signals."
        accent="green"
      />
    ),
    icon: 'mills',
  },
  {
    label: 'Disputes',
    path: '/disputes',
    permission: 'disputes.view',
    element: (
      <AdminPlaceholderPage
        title="Disputes"
        description="Monitor buyer, seller, payment, and shipment disputes that require admin mediation."
        accent="red"
      />
    ),
    icon: 'disputes',
    badge: 2,
  },
  {
    label: 'Market Rates',
    path: '/market-rates',
    permission: 'marketRates.view',
    element: (
      <AdminPlaceholderPage
        title="Market Rates"
        description="Publish and review commodity rates used for pricing checks, offer negotiation, and deal margin review."
        accent="amber"
      />
    ),
    icon: 'rates',
  },
  {
    label: 'Ratings',
    path: '/ratings',
    permission: 'ratings.view',
    element: (
      <AdminPlaceholderPage
        title="Ratings"
        description="Review trust scores, service ratings, and account quality signals across marketplace participants."
        accent="amber"
      />
    ),
    icon: 'ratings',
  },
  {
    label: 'Alerts',
    path: '/alerts',
    permission: 'alerts.view',
    element: (
      <AdminPlaceholderPage
        title="Alerts"
        description="Investigate system alerts for KYC, payment, offer, listing, and delivery exceptions."
        accent="red"
      />
    ),
    icon: 'alerts',
    badge: 5,
  },
  {
    label: 'Reports',
    path: '/reports',
    permission: 'reports.view',
    element: <AnalyticsPage />,
    icon: 'reports',
  },
  {
    label: "Naseeb's Team",
    path: '/team',
    permission: 'team.view',
    element: (
      <AdminPlaceholderPage
        title="Naseeb's Team"
        description="Manage internal operations members, responsibilities, and admin workspace visibility."
        accent="purple"
      />
    ),
    icon: 'team',
  },
  {
    label: 'My Account',
    path: '/account',
    permission: 'account.view',
    element: <AccountPage />,
    icon: 'team',
    showInNav: false,
  },
  {
    label: 'Settings',
    path: '/settings',
    permission: 'settings.view',
    element: <SettingsPage />,
    icon: 'forms',
    showInNav: false,
  },
  {
    label: 'Buyers',
    path: '/buyers',
    permission: 'buyers.view',
    element: <BuyersViewPage />,
    icon: 'users',
    showInNav: false,
  },
  {
    label: 'Sellers',
    path: '/sellers',
    permission: 'sellers.view',
    element: <SellersViewPage />,
    icon: 'users',
    showInNav: false,
  },
  {
    label: 'Marketplace',
    path: '/marketplace',
    permission: 'marketplace.view',
    element: <MarketplacePage />,
    icon: 'posts',
    showInNav: false,
  },
  {
    label: 'Requests',
    path: '/requests',
    permission: 'requests.view',
    element: <RequestsPage />,
    icon: 'offers',
    showInNav: false,
  },
  {
    label: 'Documents',
    path: '/documents',
    permission: 'documents.view',
    element: <DocumentsPage />,
    icon: 'forms',
    showInNav: false,
  },
  {
    label: 'Analytics',
    path: '/analytics',
    permission: 'analytics.view',
    element: <AnalyticsPage />,
    brokerOnly: true,
    icon: 'reports',
    showInNav: false,
  },
];
