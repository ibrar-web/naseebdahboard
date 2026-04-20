import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { AppRouter } from '@/routes';

export const App = () => (
  <ErrorBoundary>
    <AppRouter />
  </ErrorBoundary>
);
