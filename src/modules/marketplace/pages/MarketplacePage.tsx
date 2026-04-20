import { DataTable, type DataColumn } from '@/components/ui/DataTable';
import { InfoCard } from '@/components/ui/InfoCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { marketplaceListings, type MarketplaceListingRecord } from '@/modules/shared/data/adminData';

const columns: DataColumn<MarketplaceListingRecord>[] = [
  {
    key: 'commodity',
    header: 'Listing',
    render: (row) => (
      <div>
        <p className="font-semibold text-ink">{row.commodity}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{row.id}</p>
      </div>
    ),
  },
  {
    key: 'seller',
    header: 'Seller',
    render: (row) => `${row.seller} · ${row.region}`,
  },
  {
    key: 'quantity',
    header: 'Volume',
    render: (row) => `${row.quantity} · ${row.askingPrice}`,
  },
  {
    key: 'status',
    header: 'Approval',
    render: (row) => <StatusBadge value={row.status} />,
  },
  {
    key: 'agent',
    header: 'Assigned Agent',
    render: (row) => row.assignedAgent,
  },
];

export const MarketplacePage = () => (
  <div className="space-y-6">
    <SectionHeading
      eyebrow="Marketplace View"
      title="Commodity listings under broker-controlled review"
      description="Listings originate from the seller mobile app, then flow through admin review for pricing sanity, commodity compliance, and seller trust checks before becoming broadly visible."
      action="Filter by seller, category, region, and moderation state"
    />

    <section className="grid gap-5 xl:grid-cols-3">
      <InfoCard
        eyebrow="Moderation"
        title="Approve only compliant listings"
        detail="Keep broker and agent review separate from seller actions. The dashboard is the control tower, not the marketplace editing surface."
        tone="brand"
      />
      <InfoCard
        eyebrow="Lifecycle"
        title="Listing to shipment"
        detail="Once approved, listings should remain traceable through buyer interest, negotiation, deal formation, and shipment evidence."
      />
      <InfoCard
        eyebrow="Exceptions"
        title="Flag price anomalies early"
        detail="Outlier prices, repeated document issues, or category mismatches should be routed to broker review before the listing reaches deal flow."
        tone="accent"
      />
    </section>

    <DataTable columns={columns} rows={marketplaceListings} />
  </div>
);
