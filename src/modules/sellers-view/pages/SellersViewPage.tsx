import { DataTable, type DataColumn } from '@/components/ui/DataTable';
import { InfoCard } from '@/components/ui/InfoCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sellerProfiles, type SellerProfileRecord } from '@/modules/shared/data/adminData';

const columns: DataColumn<SellerProfileRecord>[] = [
  {
    key: 'company',
    header: 'Seller',
    render: (row) => (
      <div>
        <p className="font-semibold text-ink">{row.company}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{row.id}</p>
      </div>
    ),
  },
  {
    key: 'contact',
    header: 'Contact',
    render: (row) => row.contact,
  },
  {
    key: 'verification',
    header: 'Verification',
    render: (row) => <StatusBadge value={row.verification} />,
  },
  {
    key: 'risk',
    header: 'Risk',
    render: (row) => <StatusBadge value={row.risk} />,
  },
  {
    key: 'capacity',
    header: 'Listings',
    render: (row) => `${row.listings} active · ${row.region}`,
  },
];

export const SellersViewPage = () => (
  <div className="space-y-6">
    <SectionHeading
      eyebrow="Seller Operations"
      title="Seller verification and marketplace quality control"
      description="This module gives the operations team a controlled view into seller businesses, document checks, and listing activity without turning the dashboard into a seller workspace."
      action="Document verification, suspension risk, and listing health in one place"
    />

    <section className="grid gap-5 xl:grid-cols-3">
      <InfoCard
        eyebrow="Verification"
        title="Business compliance first"
        detail="Seller onboarding should validate licenses, ownership, tax identifiers, and commodity evidence before listings reach the marketplace."
        tone="brand"
      />
      <InfoCard
        eyebrow="Operations"
        title="Listings tied to trust"
        detail="Every seller profile should expose document status, recent uploads, and broker intervention when duplicate or suspicious evidence appears."
      />
      <InfoCard
        eyebrow="Fraud Watch"
        title="Flagged sellers isolated"
        detail="High-risk sellers remain visible for audit and case management, but their operational privileges should be suspended until cleared."
        tone="accent"
      />
    </section>

    <DataTable columns={columns} rows={sellerProfiles} />
  </div>
);
