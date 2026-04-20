import clsx from 'clsx';
import type { ApprovalState, DealStage } from '@/modules/shared/data/adminData';

type BadgeTone = ApprovalState | DealStage | 'active' | 'suspended' | 'low' | 'medium' | 'high';

const toneMap: Record<BadgeTone, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-rose-100 text-rose-800',
  flagged: 'bg-rose-100 text-rose-800',
  'in-review': 'bg-sky-100 text-sky-800',
  negotiation: 'bg-violet-100 text-violet-800',
  approval: 'bg-amber-100 text-amber-800',
  shipment: 'bg-cyan-100 text-cyan-800',
  completion: 'bg-emerald-100 text-emerald-800',
  active: 'bg-emerald-100 text-emerald-800',
  suspended: 'bg-slate-200 text-slate-700',
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-rose-100 text-rose-800',
};

const formatValue = (value: string) =>
  value
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');

export const StatusBadge = ({ value }: { value: BadgeTone }) => (
  <span
    className={clsx(
      'inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
      toneMap[value],
    )}
  >
    {formatValue(value)}
  </span>
);
