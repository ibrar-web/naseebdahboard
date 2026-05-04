type Tone = 'amber' | 'red' | 'blue' | 'purple' | 'green';

const taskMetrics = [
  { label: 'Posts to Review', value: '3', tone: 'amber' as Tone },
  { label: 'Payments Pending', value: '2', tone: 'red' as Tone },
  { label: 'KYC Pending', value: '2', tone: 'blue' as Tone },
  { label: 'Offer Interventions', value: '1', tone: 'purple' as Tone },
];

const reviewTabs = [
  { label: 'Review Posts', count: 3, tone: 'amber' as Tone },
  { label: 'Verify Payments', count: 2, tone: 'red' as Tone },
  { label: 'Pending KYC', count: 2, tone: 'blue' as Tone },
  { label: 'Mill Requests', count: 2, tone: 'purple' as Tone },
  { label: 'Admin Interventions', count: 1, tone: 'red' as Tone },
];

const overviewStats = [
  { label: 'Total Users', value: '8', change: '+ 12%', tone: 'blue' as Tone, icon: 'U' },
  { label: 'Active Listings', value: '24', change: '+ 8%', tone: 'amber' as Tone, icon: 'P' },
  { label: 'Active Deals', value: '12', change: '- 2%', tone: 'green' as Tone, icon: 'D', negative: true },
  { label: 'Pending Reviews', value: '5', detail: 'Needs attention', tone: 'red' as Tone, icon: 'R' },
  { label: 'Platform Revenue', value: 'Rs8.4M', change: '+ 18%', tone: 'green' as Tone, icon: 'Rs' },
  { label: 'Commission', value: 'Rs168K', change: '+ 5%', tone: 'amber' as Tone, icon: '%' },
];

const activeDeals = [
  { crop: 'Basmati Rice', id: 'DEL-001', qty: '200', amount: '840000', status: 'Deal Created', tone: 'green' as Tone },
  { crop: 'Punjab Wheat', id: 'DEL-002', qty: '500', amount: '1400000', status: 'Dispatch Prep', tone: 'blue' as Tone },
  { crop: 'Desi Cotton', id: 'DEL-003', qty: '50', amount: '425000', status: 'In Transit', tone: 'purple' as Tone },
  { crop: 'Yellow Maize', id: 'DEL-004', qty: '200', amount: '380000', status: 'Delivery', tone: 'green' as Tone },
  { crop: 'Mustard Seed', id: 'DEL-005', qty: '80', amount: '496000', status: 'Del. Verify', tone: 'amber' as Tone },
  { crop: 'Sugarcane', id: 'DEL-006', qty: '300', amount: '1120000', status: 'Pay Pending', tone: 'red' as Tone },
];

const interventions = [
  {
    id: 'OFF-001',
    title: 'Countering',
    detail: 'Offer needs broker review before moving to the buyer.',
    tone: 'amber' as Tone,
  },
  {
    id: 'OFF-003',
    title: 'Admin Mediation',
    detail: 'Buyer and seller pricing difference requires intervention.',
    tone: 'red' as Tone,
  },
];

const toneClass: Record<Tone, { pill: string; soft: string; text: string; border: string }> = {
  amber: {
    pill: 'bg-amber-100 text-amber-700',
    soft: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
  },
  red: {
    pill: 'bg-red-100 text-red-600',
    soft: 'bg-red-50',
    text: 'text-red-500',
    border: 'border-red-200',
  },
  blue: {
    pill: 'bg-blue-100 text-blue-600',
    soft: 'bg-blue-50',
    text: 'text-blue-500',
    border: 'border-blue-200',
  },
  purple: {
    pill: 'bg-purple-100 text-purple-600',
    soft: 'bg-purple-50',
    text: 'text-purple-500',
    border: 'border-purple-200',
  },
  green: {
    pill: 'bg-emerald-100 text-emerald-700',
    soft: 'bg-emerald-50',
    text: 'text-[#2f7a42]',
    border: 'border-emerald-200',
  },
};

const ListIcon = () => (
  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-[24px] font-extrabold tracking-[-0.01em] text-ink">{title}</h2>
);

export const DashboardPage = () => {
  return (
    <div className="space-y-8 pb-8">
      <section className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(100deg,#185038_0%,#2e7750_64%,#4ba06d_100%)] px-8 py-9 text-white">
        <div className="absolute -right-10 -top-12 h-56 w-56 rounded-full bg-white/[0.07]" />
        <div className="absolute right-20 top-14 h-40 w-40 rounded-full bg-white/[0.06]" />

        <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/55">Welcome Back</p>
            <h1 className="mt-3 text-[34px] font-extrabold leading-tight">Super Admin</h1>
            <p className="mt-2 text-lg font-semibold text-white/65">Here is what needs your attention today</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {taskMetrics.map((metric) => (
              <article
                key={metric.label}
                className="flex min-h-[74px] min-w-[170px] items-center gap-4 rounded-[16px] border border-white/15 bg-white/[0.12] px-5"
              >
                <ListIcon />
                <div>
                  <p className="text-2xl font-extrabold leading-none">{metric.value}</p>
                  <p className="mt-1 text-sm font-semibold text-white/58">{metric.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-wrap gap-3">
        {reviewTabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={`inline-flex h-[54px] items-center gap-3 rounded-[18px] border px-6 text-base font-extrabold ${toneClass[tab.tone].soft} ${toneClass[tab.tone].text} ${toneClass[tab.tone].border}`}
          >
            <ListIcon />
            {tab.label}
            <span className={`inline-flex h-6 min-w-8 items-center justify-center rounded-full px-2 text-xs font-extrabold ${toneClass[tab.tone].pill}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-slate-400">Platform Overview</p>
          <button type="button" className="rounded-[14px] border border-slate-200 bg-white px-5 py-2 text-sm font-extrabold text-slate-600">
            Monthly
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {overviewStats.map((stat) => (
            <article key={stat.label} className="min-h-[220px] rounded-[24px] bg-white p-7 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <span className={`flex h-14 min-w-14 items-center justify-center rounded-[16px] text-lg font-extrabold ${toneClass[stat.tone].soft} ${toneClass[stat.tone].text}`}>
                  {stat.icon}
                </span>
                {stat.change ? (
                  <span className={`rounded-full px-3 py-1 text-sm font-extrabold ${stat.negative ? 'bg-red-100 text-red-500' : 'bg-emerald-100 text-emerald-700'}`}>
                    {stat.change}
                  </span>
                ) : null}
              </div>
              <p className="mt-7 text-[36px] font-extrabold leading-none text-slate-950">{stat.value}</p>
              <p className="mt-2 text-base font-bold leading-6 text-slate-500">{stat.label}</p>
              {stat.detail ? <p className="text-base font-semibold leading-6 text-slate-400">{stat.detail}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden">
        <div className="mb-5 flex items-center justify-between">
          <SectionTitle title="Active Deals" />
          <button type="button" className="text-base font-extrabold text-[#2f7a42]">View All</button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-3">
          {activeDeals.map((deal) => (
            <article key={deal.id} className="min-h-[245px] min-w-[300px] rounded-[22px] bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-[14px] text-base font-extrabold ${toneClass[deal.tone].soft} ${toneClass[deal.tone].text}`}>
                  {deal.crop.slice(0, 2).toUpperCase()}
                </span>
                <span className="h-4 w-10 rounded-full bg-slate-100 after:ml-4 after:block after:h-2 after:w-2 after:translate-y-1 after:rounded-full after:bg-slate-400" />
              </div>
              <h3 className="mt-7 text-xl font-extrabold leading-tight text-ink">{deal.crop}</h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-slate-400">
                {deal.id} · {deal.qty}
              </p>
              <p className="mt-5 text-[30px] font-extrabold leading-none text-[#2f7a42]">{deal.amount}</p>
              <p className={`mt-5 text-sm font-extrabold ${toneClass[deal.tone].text}`}>{deal.status}</p>
            </article>
          ))}
        </div>
        <div className="mt-1 h-1 rounded-full bg-slate-300" />
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <SectionTitle title="Offers Requiring Intervention" />
          <button type="button" className="text-base font-extrabold text-[#2f7a42]">View All</button>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {interventions.map((item) => (
            <article key={item.id} className={`rounded-[22px] border bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.06)] ${toneClass[item.tone].border}`}>
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-400">{item.id}</p>
                <span className={`rounded-full px-4 py-1 text-sm font-extrabold ${toneClass[item.tone].pill}`}>{item.title}</span>
              </div>
              <p className="mt-5 text-lg font-extrabold text-ink">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
