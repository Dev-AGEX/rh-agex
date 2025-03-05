'use client';

import { useEffect, useState, FormEvent } from 'react';
import { vagasService, Vaga } from '@/src/services/vagas';
import { candidatosService } from '@/src/services/candidatos';
import { useParams } from 'next/navigation';

export default function VagaDetalhesPage() {
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    Nome: '',
    email: '',
    telefone: '',
    cpf: '',
    pretensao_salarial: '',
    cidade: '',
    mensagem: '',
  });
  const [curriculo, setCurriculo] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [aceitouPolitica, setAceitouPolitica] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function carregarVaga() {
      try {
        console.log('Carregando vaga com slug:', params.slug);
        const vagaData = await vagasService.buscarVagaPorSlug(params.slug as string);
        console.log('Dados carregados:', vagaData);
        
        if (!vagaData) {
          setError('Vaga não encontrada');
          return;
        }
        
        setVaga(vagaData);
      } catch (err) {
        console.error('Erro ao carregar vaga:', err);
        setError('Não foi possível carregar os detalhes da vaga. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      carregarVaga();
    }
  }, [params.slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurriculo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!vaga || !aceitouPolitica) return;

    try {
      setEnviando(true);
      await candidatosService.cadastrarCandidatoComCurriculo(
        {
          ...formData,
          vaga: vaga.Titulo,
          local_da_vaga: vaga.Local_da_vaga,
        },
        curriculo || undefined
      );
      setSucesso(true);
      // Limpa o formulário
      setFormData({
        Nome: '',
        email: '',
        telefone: '',
        cpf: '',
        pretensao_salarial: '',
        cidade: '',
        mensagem: '',
      });
      setCurriculo(null);
      setAceitouPolitica(false);
    } catch (err) {
      console.error('Erro ao enviar candidatura:', err);
      setError('Não foi possível enviar sua candidatura. Tente novamente mais tarde.');
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 pt-32 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Carregando...</h1>
        </div>
      </main>
    );
  }

  if (error || !vaga) {
    return (
      <main className="container mx-auto px-4 pt-32 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Ops!</h1>
          <p className="text-red-500">{error || 'Vaga não encontrada'}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 pt-32 pb-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-[#FF4B12]">{vaga.Titulo}</h1>
        <p className="text-gray-600 mb-8">{vaga.Local_da_vaga}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Descrição das Atividades:</h2>
              <div 
                className="text-gray-700" 
                dangerouslySetInnerHTML={{ __html: vaga.Descricao_da_vaga }} 
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-medium mb-6">Pré cadastro</h2>
            {sucesso ? (
              <div className="text-green-600 font-medium">
                Candidatura enviada com sucesso! Entraremos em contato em breve.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="Nome"
                  value={formData.Nome}
                  onChange={handleInputChange}
                  placeholder="Nome"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="Telefone"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="CPF"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
                <input
                  type="text"
                  name="pretensao_salarial"
                  value={formData.pretensao_salarial}
                  onChange={handleInputChange}
                  placeholder="Pretensão Salarial"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  placeholder="Cidade"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  placeholder="Mensagem"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                />

                <div className="space-y-2">
                  <label 
                    htmlFor="curriculo"
                    className="text-[#FF4B12] font-medium flex items-center gap-2 hover:text-[#ff6e31] transition-colors duration-200 cursor-pointer"
                  >
                    {curriculo ? curriculo.name : 'Adicionar currículo'}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </label>
                  <input 
                    type="file" 
                    id="curriculo" 
                    onChange={handleFileChange}
                    className="hidden" 
                    accept=".pdf,.doc,.docx" 
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="privacy-policy"
                        name="privacy-policy"
                        type="checkbox"
                        checked={aceitouPolitica}
                        onChange={(e) => setAceitouPolitica(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[#E64100] focus:ring-[#E64100]"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="privacy-policy" className="font-medium text-gray-900">
                        Eu aceito a{' '}
                        <a
                          href="https://agex.com.br/politica-de-privacidade"
                          className="text-[#E64100] underline hover:text-[#CC3A00]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          política de privacidade
                        </a>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={enviando || !aceitouPolitica}
                  className={`w-full py-3 px-4 rounded-[14px] font-semibold text-base flex justify-center items-center gap-2 transition-colors duration-200 
                    ${enviando || !aceitouPolitica
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-[#FF4B12] text-white hover:bg-[#ff6e31]'
                    }`}
                >
                  {enviando ? 'Enviando...' : 'Enviar o currículo'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
