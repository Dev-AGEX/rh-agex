import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { DynamicOptionsLoadingProps } from 'next/dynamic';

interface DynamicImportProps {
  import: () => Promise<React.ComponentType>;
  loading?: ((props: DynamicOptionsLoadingProps) => JSX.Element | null);
  children: (Component: React.ComponentType) => React.ReactNode;
}

export function DynamicImport({ import: importFn, loading, children }: DynamicImportProps) {
  const DynamicComponent = dynamic(importFn, {
    loading,
    ssr: false,
  });

  return (
    <Suspense fallback={loading ? loading({
      error: null,
      isLoading: true,
      pastDelay: false,
      timedOut: false,
    }) : null}>
      {children(DynamicComponent)}
    </Suspense>
  );
}

// Exemplo de uso:
/*
const LoadingComponent = ({ error, retry, timedOut }: DynamicOptionsLoadingProps) => {
  if (error) return <div>Error! <button onClick={retry}>Retry</button></div>;
  if (timedOut) return <div>Taking a long time... <button onClick={retry}>Retry</button></div>;
  return <div>Carregando...</div>;
};

<DynamicImport
  import={() => import('@/components/HeavyComponent')}
  loading={LoadingComponent}
>
  {(Component) => <Component {...props} />}
</DynamicImport>
*/
