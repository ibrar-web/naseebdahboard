interface AdminPlaceholderPageProps {
  title: string;
  description: string;
  accent?: 'green' | 'amber' | 'blue' | 'red' | 'purple';
}

const accentClass = {
  green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  red: 'bg-red-50 text-red-700 border-red-100',
  purple: 'bg-purple-50 text-purple-700 border-purple-100',
};

export const AdminPlaceholderPage = ({ title, description, accent = 'green' }: AdminPlaceholderPageProps) => (
  <div className="space-y-6">
    <section className="rounded-[24px] border border-white bg-white p-7 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-slate-400">Admin Workspace</p>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">{title}</h1>
      <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-slate-500">{description}</p>
    </section>

    <section className="grid gap-5 lg:grid-cols-3">
      {['Queue', 'Controls', 'Audit'].map((label, index) => (
        <article key={label} className="rounded-[20px] border border-white bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${accentClass[accent]}`}>
            {label}
          </span>
          <h2 className="mt-5 text-xl font-extrabold text-ink">
            {index === 0 ? 'Operational view' : index === 1 ? 'Admin actions' : 'Tracked decisions'}
          </h2>
          <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
            This section is routed and ready for API-backed workflows while preserving the fixed admin shell.
          </p>
        </article>
      ))}
    </section>
  </div>
);
