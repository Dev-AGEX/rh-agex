import Link from 'next/link';
import { Vaga } from '@/src/services/vagas';
import { formatarParaURL } from '@/src/utils/format-url';

interface VagaCardProps extends Vaga {}

export function VagaCard({ Titulo, Local_da_vaga }: VagaCardProps) {
  const urlAmigavel = `${formatarParaURL(Titulo)}-${formatarParaURL(Local_da_vaga)}`;

  return (
    <div className="bg-[#FF4B12] rounded-lg shadow-lg group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-[280px]">
      <div className="p-6 text-white flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 line-clamp-3">{Titulo.toUpperCase()}</h3>
          <h3 className="text-xl font-bold line-clamp-1">{Local_da_vaga.toUpperCase()}</h3>
        </div>
        
        <div className="flex items-center justify-center">
          <Link 
            href={`/vaga/${urlAmigavel}`}
            className="inline-block bg-white text-[#FF4B12] px-6 py-2 rounded font-medium group-hover:bg-gray-100 transition-colors"
          >
            VER DETALHES
          </Link>
        </div>
      </div>
    </div>
  );
}
