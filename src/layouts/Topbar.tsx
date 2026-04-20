import { useAuth } from '@/auth/hooks/useAuth';
import { useAppSelector } from '@/store/hooks';

export const Topbar = () => {
  const { logout } = useAuth();
  const user = useAppSelector((state) => state.auth.session?.user);

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Operations</p>
        <h2 className="mt-1 text-2xl font-semibold text-ink">Naseeb marketplace command center</h2>
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
