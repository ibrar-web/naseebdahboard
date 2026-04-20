import { DataTable, type DataColumn } from '@/components/ui/DataTable';
import { InfoCard } from '@/components/ui/InfoCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { documents, type DocumentRecord } from '@/modules/shared/data/adminData';

const columns: DataColumn<DocumentRecord>[] = [
  {
    key: 'document',
    header: 'Document',
    render: (row) => (
      <div>
        <p className="font-semibold text-ink">{row.type}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{row.id}</p>
      </div>
    ),
  },
  {
    key: 'deal',
    header: 'Deal',
    render: (row) => `${row.dealId} · ${row.party}`,
  },
  {
    key: 'uploaded',
    header: 'Uploaded',
    render: (row) => row.uploadedAt,
  },
  {
    key: 'verification',
    header: 'Verification',
    render: (row) => <StatusBadge value={row.verification} />,
  },
  {
    key: 'notes',
    header: 'Verification Notes',
    render: (row) => row.flaggedReason,
  },
];

export const DocumentsPage = () => (
  <div className="space-y-6">
    <SectionHeading
      eyebrow="Document Verification"
      title="Bilti, waybill, and ponch oversight"
      description="Shipment documents must stay verifiable, attributable, and linked to the deal they support. This module is designed for authenticity review, exception handling, and fraud prevention."
      action="Flag suspicious uploads and preserve verification notes in audit history"
    />

    <section className="grid gap-5 xl:grid-cols-3">
      <InfoCard
        eyebrow="Verification Desk"
        title="Evidence before completion"
        detail="No shipment or completion transition should be allowed without the required document set and an explicit verification state."
        tone="brand"
      />
      <InfoCard
        eyebrow="Risk Handling"
        title="Suspicious uploads quarantined"
        detail="Signature mismatches, duplicate scans, and inconsistent timestamps should create visible risk signals for broker oversight."
      />
      <InfoCard
        eyebrow="Audit"
        title="Every document review logged"
        detail="Capture reviewer, outcome, reason, and timestamp so disputes can be reconstructed later without manual chasing."
        tone="accent"
      />
    </section>

    <DataTable columns={columns} rows={documents} />
  </div>
);
