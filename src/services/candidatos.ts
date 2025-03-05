import { CONFIG } from '../config';

export interface Candidato {
  id?: string;
  Nome: string;
  email: string;
  telefone: string;
  cpf: string;
  pretensao_salarial: string;
  cidade: string;
  mensagem: string;
  curriculo?: string; // UUID do arquivo no Directus
  vaga: string;
  local_da_vaga: string;
}

class CandidatosService {
  private baseUrl = `${CONFIG.CMS_URL}/items/Candidatos`;

  private getHeaders() {
    return {
      'Authorization': `Bearer ${CONFIG.CMS_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  async cadastrarCandidato(candidato: Omit<Candidato, 'id'>): Promise<Candidato> {
    try {
      console.log('Cadastrando candidato:', candidato);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(candidato),
      });

      if (!response.ok) {
        throw new Error('Falha ao cadastrar candidato');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro ao cadastrar candidato:', error);
      throw error;
    }
  }

  async uploadCurriculo(file: File): Promise<string> {
    try {
      console.log('Fazendo upload do currículo:', file.name);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${CONFIG.CMS_URL}/files`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CONFIG.CMS_TOKEN}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Falha ao fazer upload do currículo');
      }

      const data = await response.json();
      return data.data.id; // Retorna o UUID do arquivo
    } catch (error) {
      console.error('Erro ao fazer upload do currículo:', error);
      throw error;
    }
  }

  async cadastrarCandidatoComCurriculo(
    candidato: Omit<Candidato, 'id' | 'curriculo'>,
    curriculo?: File
  ): Promise<Candidato> {
    try {
      let curriculoId: string | undefined;

      // Se houver currículo, faz o upload primeiro
      if (curriculo) {
        curriculoId = await this.uploadCurriculo(curriculo);
      }

      // Cadastra o candidato com o ID do currículo
      const candidatoCompleto = {
        ...candidato,
        curriculo: curriculoId,
      };

      return await this.cadastrarCandidato(candidatoCompleto);
    } catch (error) {
      console.error('Erro ao cadastrar candidato com currículo:', error);
      throw error;
    }
  }
}

export const candidatosService = new CandidatosService();
