import { DataTable, type DataColumn } from '@/components/ui/DataTable';
import { InfoCard } from '@/components/ui/InfoCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { deals, type DealRecord } from '@/modules/shared/data/adminData';

const columns: DataColumn<DealRecord>[] = [
  {
    key: 'deal',
    header: 'Deal',
    render: (row) => (
      <div>
        <p className="font-semibold text-ink">{row.commodity}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{row.id}</p>
      </div>
    ),
  },
  {
    key: 'parties',
    header: 'Buyer / Seller',
    render: (row) => (
      <div>
        <p className="font-medium text-ink">{row.buyer}</p>
        <p className="mt-1 text-slate-500">{row.seller}</p>
      </div>
    ),
  },
  {
    key: 'stage',
    header: 'Stage',
    render: (row) => <StatusBadge value={row.stage} />,
  },
  {
    key: 'pricing',
    header: 'Buy vs Sell',
    render: (row) => `${row.buyPrice} → ${row.sellPrice}`,
  },
  {
    key: 'margin',
    header: 'Commission / Margin',
    render: (row) => `${row.commission} · ${row.margin}`,
  },
];

export const DealsPage = () => (
  <div className="space-y-6">
    <SectionHeading
      eyebrow="Deal Management"
      title="Track every deal from negotiation to completion"
      description="Deals are the commercial spine of the platform. The dashboard should make pricing spread, commission, document readiness, and stage progression visible to operations in real time."
      action="Stage-based controls: negotiation, approval, shipment, completion"
    />

    <section className="grid gap-5 xl:grid-cols-3">
      <InfoCard
        eyebrow="Margin Control"
        title="Commercial visibility"
        detail="Brokers need immediate access to buy-side price, sell-side price, commission, and margin to detect weak economics before approval."
        tone="brand"
      />
      <InfoCard
        eyebrow="Execution"
        title="Operational lifecycle"
        detail="Keep shipment, delivery evidence, and completion criteria attached to the same deal record rather than splitting them across disconnected screens."
      />
      <InfoCard
        eyebrow="Authority"
        title="Broker override only"
        detail="Agents can progress operational work, but they should not be able to override broker pricing decisions or audit-critical approvals."
        tone="accent"
      />
    </section>

    <DataTable columns={columns} rows={deals} />
  </div>
);
