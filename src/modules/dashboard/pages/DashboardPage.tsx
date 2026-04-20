import { StatCard } from '@/components/ui/StatCard';

const stats = [
  { label: 'Active Deals', value: '184', delta: '+12 this week' },
  { label: 'Pending User Approvals', value: '29', delta: '8 require broker review' },
  { label: 'Open Requests', value: '67', delta: '14 assigned to agents' },
  { label: 'Commission This Month', value: 'PKR 2.4M', delta: '+18.6% vs last month' },
];

const approvals = [
  '7 new sellers uploaded verification documents',
  '5 listings are waiting for final commodity compliance review',
  '3 deals crossed shipment milestone without ponch upload',
];

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#314430_0%,#486945_45%,#d97706_140%)] p-8 text-white shadow-panel">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Broker Control System</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight">
          Centralized oversight for users, commodity flow, approvals, negotiations, and shipment evidence.
        </h1>
      </section>

      <section className="grid gap-5 xl:grid-cols-4 md:grid-cols-2">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[28px] bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-600">Live Activity</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">Operational heat map</h2>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              Real time
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-brand-50 p-5">
              <p className="text-sm text-brand-700">North Region</p>
              <p className="mt-3 text-2xl font-semibold text-ink">42 deals</p>
            </div>
            <div className="rounded-3xl bg-amber-50 p-5">
              <p className="text-sm text-amber-700">Margin Watchlist</p>
              <p className="mt-3 text-2xl font-semibold text-ink">11 deals</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-5">
              <p className="text-sm text-emerald-700">Verified Sellers</p>
              <p className="mt-3 text-2xl font-semibold text-ink">328</p>
            </div>
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Approvals Queue</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Attention required</h2>
          <div className="mt-6 space-y-4">
            {approvals.map((item) => (
              <div key={item} className="rounded-3xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
