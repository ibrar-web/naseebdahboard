import { useLocation } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/useAuth';
import { appRoutes } from '@/routes/routeConfig';
import { useAppSelector } from '@/store/hooks';

type IconProps = {
  className?: string;
};

const SearchIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="m20 20-4.4-4.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const BellIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 21h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Topbar = () => {
  const { logout } = useAuth();
  const user = useAppSelector((state) => state.auth.session?.user);
  const location = useLocation();
  const activeRoute = appRoutes.find((route) => route.path === location.pathname);
  const displayName =
    user?.firstName || user?.lastName ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() : 'Super Admin';
  const displayEmail = user?.email ?? 'admin@naseeb.pk';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="flex h-20 shrink-0 items-center justify-between gap-5 border-b border-slate-200 bg-white px-5 sm:px-8">
      <div className="min-w-0">
        <h2 className="truncate text-[22px] font-extrabold text-ink">{activeRoute?.label ?? 'Dashboard'}</h2>
      </div>

      <div className="flex min-w-0 items-center gap-4">
        <label className="relative hidden w-[280px] xl:block">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search..."
            className="h-12 w-full rounded-[16px] border border-slate-200 bg-slate-50 pl-12 pr-4 text-base font-semibold text-ink outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <button
          type="button"
          className="relative flex h-12 w-14 shrink-0 items-center justify-center rounded-[16px] border border-emerald-200 bg-emerald-50 text-[#216338] transition hover:bg-emerald-100"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          onClick={logout}
          className="flex h-14 min-w-0 items-center gap-3 rounded-[16px] border border-slate-200 bg-slate-50 px-3 pr-4 text-left shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition hover:bg-white"
          title="Logout"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#1f6336] text-lg font-extrabold text-white">
            {initial}
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-base font-extrabold leading-5 text-ink">{displayName}</span>
            <span className="block truncate text-sm font-bold leading-5 text-slate-400">{displayEmail}</span>
          </span>
          <ChevronDownIcon className="hidden h-4 w-4 shrink-0 text-slate-400 sm:block" />
        </button>
      </div>
    </header>
  );
};
