"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { trabalheConoscoService, TrabalheConosco } from "@/src/services/trabalheConosco";

interface FormDataWithFileName extends Partial<TrabalheConosco> {
  curriculoNome?: string;
}

export default function TrabalhePage() {
  const [formData, setFormData] = useState<FormDataWithFileName>({});
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = useMemo(() => {
    return (file: File): { isValid: boolean; error?: string } => {
      if (!(file.type === 'application/pdf' || file.type.includes('word'))) {
        return { isValid: false, error: 'Por favor, selecione um arquivo PDF ou Word' };
      }
      if (file.size > 5 * 1024 * 1024) {
        return { isValid: false, error: 'O arquivo deve ter no máximo 5MB' };
      }
      return { isValid: true };
    };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateFile(file);
      if (validation.isValid) {
        try {
          const fileId = await trabalheConoscoService.uploadCurriculo(file);
          if (fileId) {
            setFormData(prev => ({
              ...prev,
              curriculo: fileId,
              curriculoNome: file.name
            }));
            setSelectedFile(file);
          }
        } catch (error) {
          console.error('Erro ao fazer upload:', error);
          alert('Erro ao fazer upload do arquivo');
        }
      } else if (validation.error) {
        alert(validation.error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.celular || !formData.cpf || !formData.curriculo) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!isPrivacyAccepted) {
      alert("Por favor, aceite os termos de privacidade.");
      return;
    }

    setIsProcessing(true);
    try {
      await trabalheConoscoService.cadastrarCandidatura(formData as TrabalheConosco);
      alert("Formulário enviado com sucesso!");
      setFormData({});
      setIsPrivacyAccepted(false);
      setSelectedFile(null);
      // Limpa o input de arquivo
      const fileInput = document.getElementById('curriculo') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files?.[0]) {
      handleFileChange(e);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('curriculo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/fundo.jpeg"
            alt="Fundo AGEX"
            priority={false}
            quality={75}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-[138px]">
            <div className="max-w-[500px]">
              <span className="inline-block bg-[#FF4B12] text-white px-4 py-2 rounded-[4px] text-sm font-bold">
                TRABALHE CONOSCO
              </span>
              <h1 className="text-white text-[32px] lg:text-[40px] font-bold leading-[1.2] lg:leading-[48px] mt-6">
                Cadastre seu currículo e faça parte da equipe que move o futuro do transporte!
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-[#F9F8F7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-[138px]">
          <div className="max-w-[400px] mx-auto">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <h2 className="text-[#231E16] text-sm leading-4 font-bold">Informações pessoais</h2>
                <input
                  className="placeholder:text-gray-500 text-black flex h-[56px] w-full rounded-[6px] border px-3 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 border-neutral-300 bg-white"
                  placeholder="Nome completo"
                  type="text"
                  name="nome"
                  onChange={handleChange}
                  value={formData.nome || ""}
                />
                <input
                  className="placeholder:text-gray-500 text-black flex h-[56px] w-full rounded-[6px] border px-3 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 border-neutral-300 bg-white"
                  placeholder="E-mail"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email || ""}
                />
                <input
                  className="placeholder:text-gray-500 text-black flex h-[56px] w-full rounded-[6px] border px-3 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 border-neutral-300 bg-white"
                  placeholder="Celular"
                  type="tel"
                  name="celular"
                  onChange={handleChange}
                  value={formData.celular || ""}
                />
                <input
                  className="placeholder:text-gray-500 text-black flex h-[56px] w-full rounded-[6px] border px-3 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 border-neutral-300 bg-white"
                  placeholder="CPF"
                  type="text"
                  name="cpf"
                  onChange={handleChange}
                  value={formData.cpf || ""}
                />
                <input
                  className="placeholder:text-gray-500 text-black flex h-[56px] w-full rounded-[6px] border px-3 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 border-neutral-300 bg-white"
                  placeholder="Pretensão salarial"
                  type="text"
                  name="pretensao_salarial"
                  onChange={handleChange}
                  value={formData.pretensao_salarial || ""}
                />
                <input
                  className="placeholder:text-gray-500 text-black flex h-[56px] w-full rounded-[6px] border px-3 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 border-neutral-300 bg-white"
                  placeholder="Cidade onde reside"
                  type="text"
                  name="Cidades_onde_reside"
                  onChange={handleChange}
                  value={formData.Cidades_onde_reside || ""}
                />
                <input
                  className="placeholder:text-gray-500 text-black flex h-[56px] w-full rounded-[6px] border px-3 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 border-neutral-300 bg-white"
                  placeholder="Área onde atua"
                  type="text"
                  name="Area_onde_atua"
                  onChange={handleChange}
                  value={formData.Area_onde_atua || ""}
                />
              </div>

              <div className="space-y-2">
                {!selectedFile ? (
                  <button
                    type="button"
                    onClick={() => document.getElementById('curriculo')?.click()}
                    className="text-[#FF4B12] font-medium flex items-center gap-2 hover:text-[#ff6e31] transition-colors duration-200"
                  >
                    Adicionar currículo
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF4B12]">
                          <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9M13 2L20 9M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="flex-shrink-0 ml-4 p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                      title="Remover arquivo"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  id="curriculo"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <input
                  type="checkbox"
                  id="checkbox-privacy-policy"
                  className="w-4 h-4 rounded bg-white border border-gray-300 accent-[#FF4B12] cursor-pointer flex-shrink-0"
                  checked={isPrivacyAccepted}
                  onChange={(e) => setIsPrivacyAccepted(e.target.checked)}
                />
                <label htmlFor="checkbox-privacy-policy" className="text-sm text-gray-700 cursor-pointer">
                  Eu aceito a <a href="https://agex.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">política de privacidade</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF4B12] text-white py-3 px-4 rounded-[32px] font-medium text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2 sm:mt-4"
                disabled={!isPrivacyAccepted || isProcessing}
              >
                {isProcessing ? "Enviando..." : "Cadastrar-se"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}