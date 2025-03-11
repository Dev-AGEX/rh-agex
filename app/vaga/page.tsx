'use client';

import { useEffect, useState } from 'react';
import { VagaCard } from '@/components/vaga-card';
import { vagasService, Vaga } from '@/src/services/vagas';

export default function VagasPage() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarVagas() {
      try {
        const vagasData = await vagasService.listarVagas(1); // Busca a primeira página de vagas publicadas
        setVagas(vagasData);
      } catch (err) {
        console.error('Erro ao carregar vagas:', err);
        setError('Não foi possível carregar as vagas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    carregarVagas();
  }, []);

  if (loading) {
    return (
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl font-bold mb-8">Carregando vagas...</h1>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl font-bold mb-4">Ops!</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold mb-12">Vagas Disponíveis</h1>
        
        {vagas.length === 0 ? (
          <p className="text-gray-500">Nenhuma vaga disponível no momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vagas.map((vaga) => (
              <VagaCard key={vaga.id} {...vaga} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
