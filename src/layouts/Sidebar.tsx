import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { appRoutes } from '@/routes/routeConfig';
import { can } from '@/utils/permissions/can';

export const Sidebar = () => {
  const role = useAppSelector((state) => state.auth.session?.user.role ?? null);
  const allowedRoutes = appRoutes.filter((item) => can(role, item.permission));

  return (
    <>
      <aside className="border-b border-white/10 bg-ink px-4 py-4 text-white lg:hidden">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">Naseeb</p>
          <h1 className="mt-2 text-xl font-semibold">Admin Control</h1>
        </div>
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {allowedRoutes.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-white text-ink' : 'bg-white/5 text-white/70'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <aside className="hidden w-72 shrink-0 flex-col bg-ink px-6 py-8 text-white lg:flex">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">Naseeb</p>
          <h1 className="mt-3 text-2xl font-semibold">Admin Control</h1>
          <p className="mt-4 max-w-[14rem] text-sm leading-6 text-white/60">
            Broker-managed oversight for users, listings, negotiations, deals, and shipment evidence.
          </p>
        </div>
        <nav className="mt-10 space-y-2">
          {allowedRoutes.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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
        <div className="mt-auto rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Security</p>
          <p className="mt-3 text-sm leading-6 text-white/70">
            RBAC is enforced at route and feature level. Buyer and seller accounts remain external to this admin session.
          </p>
        </div>
      </aside>
    </>
  );
};
