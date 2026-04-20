interface StatCardProps {
  label: string;
  value: string;
  delta: string;
}

export const StatCard = ({ label, value, delta }: StatCardProps) => (
  <article className="rounded-[28px] bg-white p-6 shadow-panel">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-4 text-3xl font-semibold text-ink">{value}</p>
    <p className="mt-3 text-sm font-medium text-brand-700">{delta}</p>
  </article>
);
