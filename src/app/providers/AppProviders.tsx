import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SessionBootstrap } from '@/auth/components/SessionBootstrap';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <SessionBootstrap />
      {children}
    </BrowserRouter>
  );
};
