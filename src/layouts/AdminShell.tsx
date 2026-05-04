import type { PropsWithChildren } from 'react';
import { Sidebar } from '@/layouts/Sidebar';
import { Topbar } from '@/layouts/Topbar';

export const AdminShell = ({ children }: PropsWithChildren) => (
  <div className="flex h-screen overflow-hidden bg-[#eef0f3]">
    <Sidebar />
    <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
      <Topbar />
      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 py-6 sm:px-8">{children}</main>
    </div>
  </div>
);
