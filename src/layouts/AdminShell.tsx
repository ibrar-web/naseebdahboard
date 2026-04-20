import type { PropsWithChildren } from 'react';
import { Sidebar } from '@/layouts/Sidebar';
import { Topbar } from '@/layouts/Topbar';

export const AdminShell = ({ children }: PropsWithChildren) => (
  <div className="flex min-h-screen bg-sand">
    <Sidebar />
    <div className="flex min-h-screen flex-1 flex-col">
      <Topbar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  </div>
);
