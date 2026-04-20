import { DataTable, type DataColumn } from '@/components/ui/DataTable';
import { InfoCard } from '@/components/ui/InfoCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { buyerRequests, type BuyerRequestRecord } from '@/modules/shared/data/adminData';

const columns: DataColumn<BuyerRequestRecord>[] = [
  {
    key: 'request',
    header: 'Request',
    render: (row) => (
      <div>
        <p className="font-semibold text-ink">{row.commodity}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{row.id}</p>
      </div>
    ),
  },
  {
    key: 'buyer',
    header: 'Buyer',
    render: (row) => row.buyer,
  },
  {
    key: 'commercial',
    header: 'Target',
    render: (row) => `${row.quantity} · ${row.targetPrice}`,
  },
  {
    key: 'status',
    header: 'State',
    render: (row) => <StatusBadge value={row.status} />,
  },
  {
    key: 'agent',
    header: 'Handling',
    render: (row) => (
      <div>
        <p className="font-medium text-ink">{row.assignedAgent}</p>
        <p className="mt-1 text-slate-500">{row.negotiation}</p>
      </div>
    ),
  },
];

export const RequestsPage = () => (
  <div className="space-y-6">
    <SectionHeading
      eyebrow="Buyer Requests"
      title="Negotiation intake and agent assignment"
      description="Buyer requests are sourced from the mobile app. Admins can inspect, assign, approve, reject, or forward them while preserving a clear broker-agent authority boundary."
      action="Socket-driven queue for new requests and status movement"
    />

    <section className="grid gap-5 xl:grid-cols-3">
      <InfoCard
        eyebrow="Source of Truth"
        title="Mobile app origin"
        detail="Requests are created by buyers externally, then mirrored into the dashboard for operational handling and controlled decisions."
        tone="brand"
      />
      <InfoCard
        eyebrow="Routing"
        title="Assign the right agent"
        detail="Use region, commodity expertise, and current capacity to balance request load across the broker team."
      />
      <InfoCard
        eyebrow="Oversight"
        title="Broker exceptions"
        detail="Margin overrides, high-value requests, and unusual negotiation flows should escalate automatically to broker review."
        tone="accent"
      />
    </section>

    <DataTable columns={columns} rows={buyerRequests} />
  </div>
);
