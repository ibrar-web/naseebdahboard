import { useEffect, useRef, useState } from 'react';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
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

const UserIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" />
    <path d="M4 20c.7-3.2 3.6-5 8-5s7.3 1.8 8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" />
    <path d="M19 13.5v-3l-2.1-.5c-.2-.5-.4-.9-.7-1.3l1.1-1.9-2.1-2.1-1.9 1.1c-.4-.2-.8-.5-1.3-.6L11.5 3h-3l-.5 2.2c-.5.2-.9.4-1.3.6L4.8 4.7 2.7 6.8l1.1 1.9c-.2.4-.5.8-.6 1.3L1 10.5v3l2.2.5c.2.5.4.9.6 1.3l-1.1 1.9 2.1 2.1 1.9-1.1c.4.3.8.5 1.3.7l.5 2.1h3l.5-2.1c.5-.2.9-.4 1.3-.7l1.9 1.1 2.1-2.1-1.1-1.9c.3-.4.5-.8.7-1.3l2.1-.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = ({ className }: IconProps) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M10 6H6v12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Topbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.session?.user);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const activeRoute = appRoutes.find((route) => matchPath({ path: route.path, end: true }, location.pathname));
  const displayName =
    user?.firstName || user?.lastName ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() : 'Super Admin';
  const displayEmail = user?.email ?? 'admin@naseeb.pk';
  const initial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSignOut = () => {
    logout();
    setMenuOpen(false);
    navigate('/login', { replace: true });
  };

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

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-14 min-w-0 items-center gap-3 rounded-[16px] border border-slate-200 bg-slate-50 px-3 pr-4 text-left shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition hover:bg-white"
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

          {menuOpen ? (
            <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 rounded-[18px] border border-slate-100 bg-white p-3 shadow-[0_16px_42px_rgba(15,23,42,0.16)]">
              <div className="border-b border-slate-100 px-3 py-3">
                <p className="truncate text-base font-extrabold text-ink">{displayName}</p>
                <p className="truncate text-sm font-bold text-slate-400">{displayEmail}</p>
              </div>
              <div className="py-2">
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-[12px] px-3 py-3 text-sm font-extrabold text-slate-600 transition hover:bg-slate-50 hover:text-ink"
                >
                  <UserIcon className="h-5 w-5" />
                  My Account
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-[12px] px-3 py-3 text-sm font-extrabold text-slate-600 transition hover:bg-slate-50 hover:text-ink"
                >
                  <SettingsIcon className="h-5 w-5" />
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-2 flex w-full items-center gap-3 rounded-[12px] bg-red-50 px-3 py-3 text-left text-sm font-extrabold text-red-600 transition hover:bg-red-100"
                >
                  <LogoutIcon className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};
