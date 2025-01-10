import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingFallback } from './LoadingFallback';
import { ErrorFallback } from './ErrorFallback';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  id?: string;
}

export const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  id = 'component'
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Limpa o cache do componente quando houver erro
        window.location.reload();
      }}
      resetKeys={[id]}
    >
      <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}; 