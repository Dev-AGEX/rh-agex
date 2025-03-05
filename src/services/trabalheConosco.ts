import { CONFIG } from '@/src/config';

export interface TrabalheConosco {
  id?: string;
  nome: string;
  email: string;
  celular: string;
  cpf: string;
  pretensao_salarial: string;
  Cidades_onde_reside: string;
  Area_onde_atua: string;
  curriculo: string | null;
}

class TrabalheConoscoService {
  private baseUrl = `${CONFIG.CMS_URL}/items/trabalhe_conosco`;

  private getHeaders() {
    return {
      'Authorization': `Bearer ${CONFIG.CMS_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  async listarCandidaturas(): Promise<TrabalheConosco[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar candidaturas');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro ao listar candidaturas:', error);
      throw error;
    }
  }

  async cadastrarCandidatura(dados: Omit<TrabalheConosco, 'id'>): Promise<TrabalheConosco> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Falha ao cadastrar candidatura');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro ao cadastrar candidatura:', error);
      throw error;
    }
  }

  async uploadCurriculo(file: File): Promise<string> {
    try {
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
      return data.data.id;
    } catch (error) {
      console.error('Erro ao fazer upload do currículo:', error);
      throw error;
    }
  }

  async buscarCandidatura(id: string): Promise<TrabalheConosco> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar candidatura');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro ao buscar candidatura:', error);
      throw error;
    }
  }
}

export const trabalheConoscoService = new TrabalheConoscoService();
