import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthGuard } from '@/auth/guards/AuthGuard';
import { PermissionGuard } from '@/auth/guards/PermissionGuard';
import { LoginPage } from '@/auth/pages/LoginPage';
import { UnauthorizedPage } from '@/auth/pages/UnauthorizedPage';
import { AdminShell } from '@/layouts/AdminShell';
import { appRoutes } from '@/routes/routeConfig';

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
    {appRoutes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          <AuthGuard>
            <PermissionGuard permission={route.permission}>
              <AdminShell>{route.element}</AdminShell>
            </PermissionGuard>
          </AuthGuard>
        }
      />
    ))}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
