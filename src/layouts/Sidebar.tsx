import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { can } from '@/utils/permissions/can';

const items = [
  { label: 'Dashboard', to: '/', permission: 'dashboard.view' as const },
  { label: 'Users', to: '/users', permission: 'users.view' as const },
  { label: 'Buyers', to: '/buyers', permission: 'buyers.view' as const },
  { label: 'Sellers', to: '/sellers', permission: 'sellers.view' as const },
  { label: 'Marketplace', to: '/marketplace', permission: 'marketplace.view' as const },
  { label: 'Requests', to: '/requests', permission: 'requests.view' as const },
  { label: 'Deals', to: '/deals', permission: 'deals.view' as const },
  { label: 'Documents', to: '/documents', permission: 'documents.view' as const },
  { label: 'Analytics', to: '/analytics', permission: 'analytics.view' as const },
];

export const Sidebar = () => {
  const role = useAppSelector((state) => state.auth.session?.user.role ?? null);

  return (
    <aside className="hidden w-72 shrink-0 flex-col bg-ink px-6 py-8 text-white lg:flex">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Naseeb</p>
        <h1 className="mt-3 text-2xl font-semibold">Admin Control</h1>
      </div>
      <nav className="mt-10 space-y-2">
        {items
          .filter((item) => can(role, item.permission))
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-white text-ink' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};
