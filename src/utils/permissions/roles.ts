export type AdminRole = 'broker' | 'agent';

export type AppPermission =
  | 'dashboard.view'
  | 'users.view'
  | 'users.create'
  | 'users.verify'
  | 'users.suspend'
  | 'buyers.view'
  | 'sellers.view'
  | 'marketplace.view'
  | 'marketplace.review'
  | 'requests.view'
  | 'requests.assign'
  | 'deals.view'
  | 'deals.manage'
  | 'documents.view'
  | 'documents.verify'
  | 'analytics.view';
