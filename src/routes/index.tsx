import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthGuard } from '@/auth/guards/AuthGuard';
import { PermissionGuard } from '@/auth/guards/PermissionGuard';
import { LoginPage } from '@/auth/pages/LoginPage';
import { UnauthorizedPage } from '@/auth/pages/UnauthorizedPage';
import { AdminShell } from '@/layouts/AdminShell';
import { DashboardPage } from '@/modules/dashboard/pages/DashboardPage';

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="rounded-[28px] bg-white p-8 shadow-panel">
    <p className="text-xs uppercase tracking-[0.25em] text-brand-600">Module Ready</p>
    <h1 className="mt-3 text-3xl font-semibold text-ink">{title}</h1>
    <p className="mt-3 text-sm leading-6 text-slate-600">
      This module is scaffolded and ready for API integration inside `naseebdabord`.
    </p>
  </div>
);

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
    <Route
      path="/"
      element={
        <AuthGuard>
          <AdminShell>
            <DashboardPage />
          </AdminShell>
        </AuthGuard>
      }
    />
    <Route
      path="/users"
      element={
        <AuthGuard>
          <PermissionGuard permission="users.view">
            <AdminShell>
              <PlaceholderPage title="Users" />
            </AdminShell>
          </PermissionGuard>
        </AuthGuard>
      }
    />
    <Route
      path="/buyers"
      element={
        <AuthGuard>
          <PermissionGuard permission="buyers.view">
            <AdminShell>
              <PlaceholderPage title="Buyers View" />
            </AdminShell>
          </PermissionGuard>
        </AuthGuard>
      }
    />
    <Route
      path="/sellers"
      element={
        <AuthGuard>
          <PermissionGuard permission="sellers.view">
            <AdminShell>
              <PlaceholderPage title="Sellers View" />
            </AdminShell>
          </PermissionGuard>
        </AuthGuard>
      }
    />
    <Route
      path="/marketplace"
      element={
        <AuthGuard>
          <PermissionGuard permission="marketplace.view">
            <AdminShell>
              <PlaceholderPage title="Marketplace" />
            </AdminShell>
          </PermissionGuard>
        </AuthGuard>
      }
    />
    <Route
      path="/requests"
      element={
        <AuthGuard>
          <PermissionGuard permission="requests.view">
            <AdminShell>
              <PlaceholderPage title="Requests" />
            </AdminShell>
          </PermissionGuard>
        </AuthGuard>
      }
    />
    <Route
      path="/deals"
      element={
        <AuthGuard>
          <PermissionGuard permission="deals.view">
            <AdminShell>
              <PlaceholderPage title="Deals" />
            </AdminShell>
          </PermissionGuard>
        </AuthGuard>
      }
    />
    <Route
      path="/documents"
      element={
        <AuthGuard>
          <PermissionGuard permission="documents.view">
            <AdminShell>
              <PlaceholderPage title="Documents" />
            </AdminShell>
          </PermissionGuard>
        </AuthGuard>
      }
    />
    <Route
      path="/analytics"
      element={
        <AuthGuard>
          <PermissionGuard permission="analytics.view">
            <AdminShell>
              <PlaceholderPage title="Analytics" />
            </AdminShell>
          </PermissionGuard>
        </AuthGuard>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
