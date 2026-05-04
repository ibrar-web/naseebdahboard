import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { appRoutes, type NavIconKey } from '@/routes/routeConfig';
import { can } from '@/utils/permissions/can';

type IconProps = {
  name: NavIconKey;
  className?: string;
};

const iconPaths: Record<NavIconKey, string[]> = {
  dashboard: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  users: ['M16 19c0-2.4-1.8-4-4-4s-4 1.6-4 4', 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M18 10c1.5.4 2.5 1.6 2.5 3.3'],
  categories: ['M4 7.5 12 3l8 4.5-8 4.5L4 7.5Z', 'M4 12l8 4.5 8-4.5', 'M4 16.5 12 21l8-4.5'],
  forms: ['M5 4h14v16H5z', 'M8 8h8', 'M8 12h8', 'M8 16h5'],
  posts: ['M6 7h12', 'M6 12h12', 'M6 17h8', 'M3 7h.01', 'M3 12h.01', 'M3 17h.01'],
  offers: ['M20 12 12 20 4 12l8-8h8v8Z', 'M14 6h2'],
  deals: ['M7 7h10v13H7z', 'M9 7V4h6v3', 'M10 12h4', 'M10 16h4'],
  payments: ['M3 6h18v12H3z', 'M3 10h18', 'M7 15h4'],
  mills: ['M4 20h16', 'M6 20V9l5 3V9l5 3V8h3v12', 'M8 16h2', 'M14 16h2'],
  disputes: ['M12 3 21 19H3L12 3Z', 'M12 9v4', 'M12 17h.01'],
  rates: ['M5 19V9', 'M10 19V5', 'M15 19v-7', 'M20 19V8'],
  ratings: ['M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z'],
  alerts: ['M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9', 'M10 21h4'],
  reports: ['M5 19V5', 'M5 19h14', 'M9 15v-4', 'M13 15V8', 'M17 15v-6'],
  team: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M4 20c.6-3.2 3.6-5 8-5s7.4 1.8 8 5', 'M17 11a3 3 0 0 0 0-6'],
};

const SidebarIcon = ({ name, className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    {iconPaths[name].map((path) => (
      <path key={path} d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </svg>
);

export const Sidebar = () => {
  const role = useAppSelector((state) => state.auth.session?.user.role ?? null);
  const allowedRoutes = appRoutes.filter((item) => item.showInNav !== false && can(role, item.permission));

  return (
    <>
      <aside className="border-b border-white/10 bg-[#0c351d] px-4 py-4 text-white lg:hidden">
        <div className="flex items-center gap-3">
          <img src="/logo/naseeb.png" alt="Naseeb" className="h-12 w-12 shrink-0 object-cover" />
          <div>
            <p className="text-2xl font-extrabold leading-none text-white">Naseeb</p>
            <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.28em] text-white/50">Admin</p>
          </div>
        </div>
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {allowedRoutes.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-extrabold transition ${
                  isActive ? 'bg-white text-[#0c351d]' : 'bg-white/5 text-white/[0.65]'
                }`
              }
            >
              <SidebarIcon name={item.icon} className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <aside className="hidden h-screen w-[292px] shrink-0 flex-col overflow-hidden bg-[#0c351d] px-3 py-5 text-white lg:flex">
        <div className="flex items-center gap-4 px-3 pb-7">
          <img src="/logo/naseeb.png" alt="Naseeb" className="h-[58px] w-[58px] shrink-0 object-cover" />
          <div>
            <p className="text-[26px] font-extrabold leading-none text-white">Naseeb</p>
            <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.28em] text-white/50">Admin</p>
          </div>
        </div>

        <div className="mx-1 border-t border-white/10" />

        <nav className="min-h-0 flex-1 overflow-y-auto py-4 pr-1">
          {allowedRoutes.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative mb-1 flex min-h-[48px] items-center gap-4 rounded-[14px] px-4 text-[17px] font-extrabold transition ${
                  isActive
                    ? 'bg-[#1b4f2d] text-[#69e889]'
                    : 'text-white/[0.48] hover:bg-white/[0.07] hover:text-white/75'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? <span className="absolute -left-3 top-2 h-8 w-1 rounded-r-full bg-[#69e889]" /> : null}
                  <SidebarIcon name={item.icon} className="h-[21px] w-[21px] shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.badge ? (
                    <span className="inline-flex h-6 min-w-7 items-center justify-center rounded-full bg-[#ef5555] px-2 text-xs font-extrabold text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
