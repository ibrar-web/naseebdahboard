import { DataTable, type DataColumn } from '@/components/ui/DataTable';
import { InfoCard } from '@/components/ui/InfoCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { dashboardSummary, agentPerformance, type AgentPerformanceRecord } from '@/modules/shared/data/adminData';
import { StatCard } from '@/components/ui/StatCard';

const columns: DataColumn<AgentPerformanceRecord>[] = [
  {
    key: 'agent',
    header: 'Agent',
    render: (row) => (
      <div>
        <p className="font-semibold text-ink">{row.agent}</p>
        <p className="mt-1 text-slate-500">{row.region}</p>
      </div>
    ),
  },
  {
    key: 'deals',
    header: 'Active Deals',
    render: (row) => row.activeDeals,
  },
  {
    key: 'approvals',
    header: 'Approvals Closed',
    render: (row) => row.approvalsClosed,
  },
  {
    key: 'margin',
    header: 'Avg Margin',
    render: (row) => row.avgMargin,
  },
  {
    key: 'response',
    header: 'Response Time',
    render: (row) => row.responseTime,
  },
];

export const AnalyticsPage = () => (
  <div className="space-y-6">
    <SectionHeading
      eyebrow="Broker Analytics"
      title="Commercial, operational, and agent performance visibility"
      description="This broker-only area surfaces the health of the marketplace, not just UI counts. It is where revenue quality, throughput, and agent effectiveness become measurable."
      action="Restricted to broker role by RBAC"
    />

    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {dashboardSummary.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>

    <section className="grid gap-5 xl:grid-cols-3">
      <InfoCard
        eyebrow="Revenue"
        title="Commission discipline"
        detail="Track gross commission and margin quality together so volume growth does not hide weak deal economics."
        tone="brand"
      />
      <InfoCard
        eyebrow="Operations"
        title="Throughput by region"
        detail="Use request load, stage progression, and completion times to identify where broker staffing or process tuning is needed."
      />
      <InfoCard
        eyebrow="Governance"
        title="Audit-led leadership"
        detail="Analytics should tie back to who approved what and when, especially for margin exceptions, suspensions, and high-value shipments."
        tone="accent"
      />
    </section>

    <DataTable columns={columns} rows={agentPerformance} />
  </div>
);
