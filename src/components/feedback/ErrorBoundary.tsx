import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { AppFallback } from '@/components/feedback/AppFallback';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Dashboard error boundary captured an error', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <AppFallback />;
    }

    return this.props.children;
  }
}
