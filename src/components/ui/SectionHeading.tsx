interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: string;
}

export const SectionHeading = ({ eyebrow, title, description, action }: SectionHeadingProps) => (
  <div className="flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-panel lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p className="text-xs uppercase tracking-[0.28em] text-brand-600">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
    </div>
    {action ? (
      <div className="rounded-2xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">{action}</div>
    ) : null}
  </div>
);
