import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SessionBootstrap } from '@/auth/components/SessionBootstrap';
import { store } from '@/store';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SessionBootstrap />
        {children}
      </BrowserRouter>
    </Provider>
  );
};
