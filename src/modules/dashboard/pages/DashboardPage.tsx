import { StatCard } from '@/components/ui/StatCard';
import { InfoCard } from '@/components/ui/InfoCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { dashboardSummary, deals, documents, notifications } from '@/modules/shared/data/adminData';

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
        {dashboardSummary.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <InfoCard
          eyebrow="Live Activity"
          title="Operational heat map"
          detail="The broker control system needs a single place to see deal movement, approval pressure, and document readiness without jumping between external user journeys."
          footer={
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-white/70 p-5">
                <p className="text-sm text-brand-700">North Region</p>
                <p className="mt-3 text-2xl font-semibold text-ink">42 deals</p>
              </div>
              <div className="rounded-3xl bg-white/70 p-5">
                <p className="text-sm text-amber-700">Margin Watchlist</p>
                <p className="mt-3 text-2xl font-semibold text-ink">11 deals</p>
              </div>
              <div className="rounded-3xl bg-white/70 p-5">
                <p className="text-sm text-emerald-700">Verified Sellers</p>
                <p className="mt-3 text-2xl font-semibold text-ink">328</p>
              </div>
            </div>
          }
          tone="brand"
        />

        <article className="rounded-[28px] bg-white p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Notifications</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Real-time signal feed</h2>
          <div className="mt-6 space-y-4">
            {notifications.map((notification) => (
              <div key={notification.title} className="rounded-3xl border border-slate-100 bg-slate-50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-ink">{notification.title}</p>
                  <StatusBadge value={notification.channel === 'system' ? 'approved' : 'in-review'} />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{notification.detail}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{notification.timestamp}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[28px] bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-600">Document Readiness</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">Shipment evidence desk</h2>
            </div>
            <StatusBadge value="shipment" />
          </div>
          <div className="mt-6 space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="rounded-3xl border border-slate-100 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">
                      {document.type} · {document.dealId}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{document.party}</p>
                  </div>
                  <StatusBadge value={document.verification} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{document.flaggedReason}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-600">Deal Lifecycle</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Commercial watchlist</h2>
          <div className="mt-6 space-y-4">
            {deals.map((deal) => (
              <div key={deal.id} className="rounded-3xl bg-slate-50 px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">
                      {deal.id} · {deal.commodity}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {deal.buyer} vs {deal.seller}
                    </p>
                  </div>
                  <StatusBadge value={deal.stage} />
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
                  <p>Buy: {deal.buyPrice}</p>
                  <p>Sell: {deal.sellPrice}</p>
                  <p>Margin: {deal.margin}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
