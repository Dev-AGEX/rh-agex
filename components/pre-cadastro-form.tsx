'use client';

import { useState, useCallback, memo } from 'react';
import Link from 'next/link';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const PreCadastroForm = memo(function PreCadastroForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    pretensaoSalarial: '',
    cidade: '',
    mensagem: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aceitaPolitica, setAceitaPolitica] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!aceitaPolitica) {
      alert('Você precisa aceitar as políticas de privacidade para continuar.');
      return;
    }
    console.log({ ...formData, curriculo: selectedFile, aceitaPolitica });
  }, [formData, selectedFile, aceitaPolitica]);

  const validateFile = useCallback((file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      alert('O arquivo é muito grande. Por favor, selecione um arquivo menor que 5MB.');
      return false;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      alert('Por favor, selecione um arquivo PDF ou Word (.doc, .docx)');
      return false;
    }
    return true;
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  }, [validateFile]);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    const fileInput = document.getElementById('curriculo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-medium mb-6">Pré cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          key !== 'mensagem' ? (
            <input
              key={key}
              type={key === 'email' ? 'email' : key === 'telefone' ? 'tel' : 'text'}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              value={value}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
              required
            />
          ) : (
            <textarea
              key={key}
              name={key}
              placeholder="Mensagem"
              value={value}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          )
        ))}

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

        <div className="flex items-start space-x-2">
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="privacy-policy"
                name="privacy-policy"
                type="checkbox"
                checked={aceitaPolitica}
                onChange={(e) => setAceitaPolitica(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#E64100] focus:ring-[#E64100]"
                required
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="privacy-policy" className="font-medium text-gray-900">
                Eu aceito a{' '}
                <Link
                  href="https://agex.com.br/politica-de-privacidade"
                  className="text-[#E64100] underline hover:text-[#CC3A00]"
                >
                  política de privacidade
                </Link>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!aceitaPolitica}
          className={`w-full py-3 px-4 rounded-[14px] font-semibold text-base flex justify-center items-center gap-2 transition-colors duration-200 ${aceitaPolitica
              ? 'bg-[#E64100] text-white hover:bg-[#CC3A00]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Enviar o currículo
        </button>
      </form>
    </div>
  );
});
