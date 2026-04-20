import type { ReactNode } from 'react';

interface InfoCardProps {
  eyebrow: string;
  title: string;
  detail: string;
  tone?: 'default' | 'brand' | 'accent';
  footer?: ReactNode;
}

const toneClass: Record<NonNullable<InfoCardProps['tone']>, string> = {
  default: 'bg-white',
  brand: 'bg-brand-50',
  accent: 'bg-amber-50',
};

export const InfoCard = ({ eyebrow, title, detail, tone = 'default', footer }: InfoCardProps) => (
  <article className={`rounded-[28px] p-6 shadow-panel ${toneClass[tone]}`}>
    <p className="text-xs uppercase tracking-[0.25em] text-brand-600">{eyebrow}</p>
    <h2 className="mt-3 text-2xl font-semibold text-ink">{title}</h2>
    <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
    {footer ? <div className="mt-5">{footer}</div> : null}
  </article>
);
