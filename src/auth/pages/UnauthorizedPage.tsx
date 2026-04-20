import { Link } from 'react-router-dom';

export const UnauthorizedPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-sand px-6">
    <div className="max-w-md rounded-[28px] bg-white p-8 text-center shadow-panel">
      <p className="text-sm uppercase tracking-[0.25em] text-accent">Access Blocked</p>
      <h1 className="mt-4 text-3xl font-semibold text-ink">Permission required</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Your current admin role does not allow access to this area.
      </p>
      <Link
        className="mt-6 inline-flex rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white"
        to="/"
      >
        Return to dashboard
      </Link>
    </div>
  </div>
);
