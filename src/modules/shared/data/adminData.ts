import type { AdminRole } from '@/utils/permissions/roles';

export type ApprovalState = 'pending' | 'approved' | 'rejected' | 'flagged' | 'in-review';
export type DealStage = 'negotiation' | 'approval' | 'shipment' | 'completion';

export interface SummaryMetric {
  label: string;
  value: string;
  delta: string;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: AdminRole | 'buyer' | 'seller';
  status: ApprovalState | 'active' | 'suspended';
  owner: string;
  region: string;
  lastAction: string;
}

export interface MarketplaceListingRecord {
  id: string;
  commodity: string;
  seller: string;
  quantity: string;
  region: string;
  askingPrice: string;
  status: ApprovalState;
  assignedAgent: string;
}

export interface BuyerRequestRecord {
  id: string;
  buyer: string;
  commodity: string;
  quantity: string;
  targetPrice: string;
  status: ApprovalState;
  assignedAgent: string;
  negotiation: string;
}

export interface SellerProfileRecord {
  id: string;
  company: string;
  contact: string;
  verification: ApprovalState;
  listings: number;
  region: string;
  risk: 'low' | 'medium' | 'high';
}

export interface DealRecord {
  id: string;
  commodity: string;
  buyer: string;
  seller: string;
  stage: DealStage;
  buyPrice: string;
  sellPrice: string;
  commission: string;
  margin: string;
}

export interface DocumentRecord {
  id: string;
  type: 'Bilti' | 'Waybill' | 'Ponch';
  dealId: string;
  party: string;
  uploadedAt: string;
  verification: ApprovalState;
  flaggedReason: string;
}

export interface NotificationRecord {
  title: string;
  detail: string;
  timestamp: string;
  channel: 'fcm' | 'socket' | 'system';
}

export interface AgentPerformanceRecord {
  agent: string;
  region: string;
  activeDeals: number;
  approvalsClosed: number;
  avgMargin: string;
  responseTime: string;
}

export const dashboardSummary: SummaryMetric[] = [
  { label: 'Active Deals', value: '184', delta: '+12 this week' },
  { label: 'Pending User Approvals', value: '29', delta: '8 require broker review' },
  { label: 'Open Requests', value: '67', delta: '14 assigned to agents' },
  { label: 'Commission This Month', value: 'PKR 2.4M', delta: '+18.6% vs last month' },
];

export const systemUsers: AdminUserRecord[] = [
  {
    id: 'USR-1001',
    name: 'Areeba Khan',
    email: 'areeba@sabztraders.pk',
    role: 'seller',
    status: 'approved',
    owner: 'Agent Salman',
    region: 'Lahore',
    lastAction: 'Verification approved 2h ago',
  },
  {
    id: 'USR-1002',
    name: 'Hamza Agro Buying',
    email: 'procurement@hamzaagro.pk',
    role: 'buyer',
    status: 'pending',
    owner: 'Agent Kainat',
    region: 'Multan',
    lastAction: 'Awaiting NTN review',
  },
  {
    id: 'ADM-2001',
    name: 'Salman Riaz',
    email: 'salman@naseeb.local',
    role: 'agent',
    status: 'active',
    owner: 'Broker Office',
    region: 'South Punjab',
    lastAction: 'Closed 4 deal approvals today',
  },
  {
    id: 'ADM-1000',
    name: 'Ibrahim Broker',
    email: 'broker@naseeb.local',
    role: 'broker',
    status: 'active',
    owner: 'Executive',
    region: 'National',
    lastAction: 'Reviewed audit trail 20m ago',
  },
  {
    id: 'USR-1003',
    name: 'Sadiq Commodities',
    email: 'ops@sadiqcommodities.pk',
    role: 'seller',
    status: 'suspended',
    owner: 'Agent Hira',
    region: 'Bahawalpur',
    lastAction: 'Suspended for duplicate bilti upload',
  },
];

export const buyerProfiles: AdminUserRecord[] = systemUsers.filter((user) => user.role === 'buyer');
export const sellerProfiles: SellerProfileRecord[] = [
  {
    id: 'SEL-3301',
    company: 'Sabz Traders',
    contact: 'Areeba Khan',
    verification: 'approved',
    listings: 14,
    region: 'Lahore',
    risk: 'low',
  },
  {
    id: 'SEL-3302',
    company: 'Rehmat Grain House',
    contact: 'Usman Rehmat',
    verification: 'in-review',
    listings: 9,
    region: 'Sahiwal',
    risk: 'medium',
  },
  {
    id: 'SEL-3303',
    company: 'Sadiq Commodities',
    contact: 'Farooq Sadiq',
    verification: 'flagged',
    listings: 3,
    region: 'Bahawalpur',
    risk: 'high',
  },
];

export const marketplaceListings: MarketplaceListingRecord[] = [
  {
    id: 'LST-5102',
    commodity: 'Basmati Rice',
    seller: 'Sabz Traders',
    quantity: '120 tons',
    region: 'Lahore',
    askingPrice: 'PKR 318,000',
    status: 'approved',
    assignedAgent: 'Salman Riaz',
  },
  {
    id: 'LST-5114',
    commodity: 'Maize',
    seller: 'Rehmat Grain House',
    quantity: '85 tons',
    region: 'Sahiwal',
    askingPrice: 'PKR 92,000',
    status: 'pending',
    assignedAgent: 'Kainat Fatima',
  },
  {
    id: 'LST-5120',
    commodity: 'Wheat',
    seller: 'Sadiq Commodities',
    quantity: '200 tons',
    region: 'Bahawalpur',
    askingPrice: 'PKR 106,000',
    status: 'flagged',
    assignedAgent: 'Hira Javed',
  },
];

export const buyerRequests: BuyerRequestRecord[] = [
  {
    id: 'REQ-9101',
    buyer: 'Hamza Agro Buying',
    commodity: 'Maize',
    quantity: '60 tons',
    targetPrice: 'PKR 88,500',
    status: 'pending',
    assignedAgent: 'Kainat Fatima',
    negotiation: 'Supplier shortlist generated',
  },
  {
    id: 'REQ-9102',
    buyer: 'Pak Feed Mills',
    commodity: 'Soybean Meal',
    quantity: '40 tons',
    targetPrice: 'PKR 154,000',
    status: 'approved',
    assignedAgent: 'Salman Riaz',
    negotiation: 'Moved into pricing review',
  },
  {
    id: 'REQ-9103',
    buyer: 'Al Noor Foods',
    commodity: 'Basmati Rice',
    quantity: '110 tons',
    targetPrice: 'PKR 311,000',
    status: 'in-review',
    assignedAgent: 'Broker Desk',
    negotiation: 'Margin exception requested',
  },
];

export const deals: DealRecord[] = [
  {
    id: 'DEL-7001',
    commodity: 'Basmati Rice',
    buyer: 'Al Noor Foods',
    seller: 'Sabz Traders',
    stage: 'shipment',
    buyPrice: 'PKR 304,000',
    sellPrice: 'PKR 314,500',
    commission: 'PKR 620,000',
    margin: '3.5%',
  },
  {
    id: 'DEL-7002',
    commodity: 'Maize',
    buyer: 'Hamza Agro Buying',
    seller: 'Rehmat Grain House',
    stage: 'approval',
    buyPrice: 'PKR 86,000',
    sellPrice: 'PKR 91,000',
    commission: 'PKR 180,000',
    margin: '5.8%',
  },
  {
    id: 'DEL-7003',
    commodity: 'Wheat',
    buyer: 'Pak Feed Mills',
    seller: 'Sadiq Commodities',
    stage: 'negotiation',
    buyPrice: 'PKR 101,000',
    sellPrice: 'PKR 106,500',
    commission: 'PKR 240,000',
    margin: '5.4%',
  },
];

export const documents: DocumentRecord[] = [
  {
    id: 'DOC-4101',
    type: 'Bilti',
    dealId: 'DEL-7001',
    party: 'Sabz Traders',
    uploadedAt: '10 mins ago',
    verification: 'approved',
    flaggedReason: 'Verified against shipment manifest',
  },
  {
    id: 'DOC-4102',
    type: 'Waybill',
    dealId: 'DEL-7002',
    party: 'Rehmat Grain House',
    uploadedAt: '34 mins ago',
    verification: 'in-review',
    flaggedReason: 'Awaiting dispatch office call-back',
  },
  {
    id: 'DOC-4103',
    type: 'Ponch',
    dealId: 'DEL-7003',
    party: 'Sadiq Commodities',
    uploadedAt: '1h ago',
    verification: 'flagged',
    flaggedReason: 'Receiver signature mismatch',
  },
];

export const notifications: NotificationRecord[] = [
  {
    title: 'New seller registration',
    detail: 'Rehmat Grain House uploaded trade license and NTN documents.',
    timestamp: '2 mins ago',
    channel: 'fcm',
  },
  {
    title: 'Deal stage advanced',
    detail: 'DEL-7001 moved from approval to shipment after broker confirmation.',
    timestamp: '7 mins ago',
    channel: 'socket',
  },
  {
    title: 'Audit log captured',
    detail: 'Broker approved a margin override for REQ-9103.',
    timestamp: '18 mins ago',
    channel: 'system',
  },
];

export const agentPerformance: AgentPerformanceRecord[] = [
  {
    agent: 'Salman Riaz',
    region: 'South Punjab',
    activeDeals: 23,
    approvalsClosed: 18,
    avgMargin: '4.8%',
    responseTime: '11 mins',
  },
  {
    agent: 'Kainat Fatima',
    region: 'Central Punjab',
    activeDeals: 16,
    approvalsClosed: 11,
    avgMargin: '3.9%',
    responseTime: '14 mins',
  },
  {
    agent: 'Hira Javed',
    region: 'Bahawalpur',
    activeDeals: 8,
    approvalsClosed: 7,
    avgMargin: '3.2%',
    responseTime: '22 mins',
  },
];
