import { useLocation } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/useAuth';
import { appRoutes } from '@/routes/routeConfig';
import { useAppSelector } from '@/store/hooks';

export const Topbar = () => {
  const { logout } = useAuth();
  const user = useAppSelector((state) => state.auth.session?.user);
  const location = useLocation();
  const activeRoute = appRoutes.find((route) => route.path === location.pathname);

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Operations</p>
        <h2 className="mt-1 text-2xl font-semibold text-ink">
          {activeRoute?.label ?? 'Dashboard'} command center
        </h2>
        <p className="mt-1 text-sm text-slate-500">Secure broker-agent workspace with controlled visibility into mobile marketplace data.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-ink">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{user?.role}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-300 hover:text-brand-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
