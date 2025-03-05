import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Página não encontrada</h2>
      <p>Não foi possível encontrar o recurso solicitado</p>
      <Link
        href="/"
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
