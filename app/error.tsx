'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Algo deu errado!</h2>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => reset()}
      >
        Tentar novamente
      </button>
    </div>
  );
}
