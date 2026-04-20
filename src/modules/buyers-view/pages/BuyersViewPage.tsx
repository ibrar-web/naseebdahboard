import { DataTable, type DataColumn } from '@/components/ui/DataTable';
import { InfoCard } from '@/components/ui/InfoCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { buyerProfiles, buyerRequests, type AdminUserRecord } from '@/modules/shared/data/adminData';

const columns: DataColumn<AdminUserRecord>[] = [
  {
    key: 'buyer',
    header: 'Buyer Profile',
    render: (row) => (
      <div>
        <p className="font-semibold text-ink">{row.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{row.email}</p>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge value={row.status} />,
  },
  {
    key: 'owner',
    header: 'Assigned Admin',
    render: (row) => row.owner,
  },
  {
    key: 'activity',
    header: 'Recent Activity',
    render: (row) => row.lastAction,
  },
];

export const BuyersViewPage = () => (
  <div className="space-y-6">
    <SectionHeading
      eyebrow="Buyer Reference"
      title="Read-only visibility into buyer accounts"
      description="Operations can inspect buyer identities, request history, and negotiation state, but the dashboard does not let buyers act here. Their workflows remain in the mobile app."
      action={`${buyerRequests.length} open buyer requests linked to admin workflows`}
    />

    <section className="grid gap-5 xl:grid-cols-3">
      <InfoCard
        eyebrow="Control Boundary"
        title="Reference only"
        detail="Use this area for profile review, approvals, suspension decisions, and request assignment. Do not expose buyer-side actions."
        tone="brand"
      />
      <InfoCard
        eyebrow="Request Handling"
        title="Agent-led negotiation flow"
        detail="Agents can receive and forward requests while brokers retain the authority for exceptions and final commercial approval."
      />
      <InfoCard
        eyebrow="Escalation"
        title="Broker review required"
        detail="Margin exceptions, suspicious identity patterns, and high-value request overrides should route to the broker."
        tone="accent"
      />
    </section>

    <DataTable columns={columns} rows={buyerProfiles} />
  </div>
);
