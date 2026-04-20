import { useState } from 'react';
import { DataTable, type DataColumn } from '@/components/ui/DataTable';
import { InfoCard } from '@/components/ui/InfoCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { systemUsers, type AdminUserRecord } from '@/modules/shared/data/adminData';

const columns: DataColumn<AdminUserRecord>[] = [
  {
    key: 'identity',
    header: 'Identity',
    render: (row) => (
      <div>
        <p className="font-semibold text-ink">{row.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
          {row.id} · {row.email}
        </p>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    render: (row) => (
      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
        {row.role}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge value={row.status} />,
  },
  {
    key: 'owner',
    header: 'Owner',
    render: (row) => (
      <div>
        <p className="font-medium text-ink">{row.owner}</p>
        <p className="mt-1 text-slate-500">{row.region}</p>
      </div>
    ),
  },
  {
    key: 'activity',
    header: 'Last Action',
    render: (row) => row.lastAction,
  },
];

export const UsersPage = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="User Management"
        title="Internal admins and external marketplace accounts"
        description="Brokers and agents can create users and control approvals, but buyer and seller records remain operational references for the mobile marketplace."
        action="Broker can create, suspend, and assign agents. Agents can onboard buyers and sellers."
      />

      <section className="grid gap-5 xl:grid-cols-3">
        <InfoCard
          eyebrow="Approval Queue"
          title="29 pending profiles"
          detail="User creation is centralized here so internal operators can verify KYC, business documents, and ownership before any marketplace record becomes active."
          tone="brand"
        />
        <InfoCard
          eyebrow="Access Model"
          title="Broker and agent only"
          detail="The admin dashboard is not a buyer or seller login surface. External marketplace users stay in the mobile app."
        />
        <InfoCard
          eyebrow="Audit Trail"
          title="Every action attributable"
          detail="Approvals, suspensions, and agent assignments should be written to the audit log with actor, timestamp, and entity reference."
          tone="accent"
        />
      </section>

      <DataTable columns={columns} rows={systemUsers} page={page} totalPages={3} onPageChange={setPage} />
    </div>
  );
};
