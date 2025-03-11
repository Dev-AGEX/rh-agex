import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Banner } from '@/components/Banner';
import { VagaCard } from '@/components/vaga-card';
import { vagasService } from '@/src/services/vagas';

async function getVagas() {
  try {
    // Change the boolean parameter to a number (1) to indicate published vagas
    return await vagasService.listarVagas(1); // 1 for published vagas
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    return [];
  }
}

export default async function Home() {
  const vagas = await getVagas();

  return (
    <main className="flex flex-col min-h-screen">
      <Banner />

      <section className="py-16 contain-paint">
        <div className="container mx-auto px-4">
          <main className="pt-32 pb-16 px-4">
            <div className="max-w-[1400px] mx-auto">
            

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

          <div className="mt-12 text-center">
            <Link
              href="/trabalhe-conosco"
              className="inline-flex items-center gap-2 bg-[#FF4B12] text-white px-6 py-3 rounded-lg hover:bg-[#E64100] transition-colors duration-300"
            >
              <FileText size={20} />
              <span>Cadastre seu currículo</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}