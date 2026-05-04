import { useAppSelector } from "@/store/hooks";

export const AccountPage = () => {
  const user = useAppSelector((state) => state.auth.session?.user);
  const displayName =
    user?.firstName || user?.lastName
      ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
      : "Super Admin";

  return (
    <div className="space-y-6">
      <section className="rounded-[26px] bg-white p-8 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-slate-400">My Account</p>
        <h1 className="mt-3 text-3xl font-extrabold text-ink">{displayName}</h1>
        <p className="mt-2 text-lg font-semibold text-slate-500">{user?.email}</p>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-[22px] bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-extrabold text-slate-500">Role</p>
          <p className="mt-3 text-2xl font-extrabold capitalize text-ink">{user?.role ?? "admin"}</p>
        </article>
        <article className="rounded-[22px] bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-extrabold text-slate-500">Session</p>
          <p className="mt-3 text-2xl font-extrabold text-emerald-700">Active</p>
        </article>
        <article className="rounded-[22px] bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-extrabold text-slate-500">Access</p>
          <p className="mt-3 text-2xl font-extrabold text-ink">Admin Portal</p>
        </article>
      </section>
    </div>
  );
};
