import { CONFIG } from '@/src/config';
import { formatarParaURL } from '@/src/utils/format-url';

export interface Vaga {
  id?: string;
  Titulo: string;
  Local_da_vaga: string;
  Status_da_vaga: 'PUBLICADO' | 'RASCUNHO' | 'ARQUIVADO';
  Descricao_da_vaga: string;
}

class VagasService {
  // Corrigindo o nome da coleção de "Catrastro_de_Vagas" para "Cadastro_de_Vagas"
  private baseUrl = `${CONFIG.CMS_URL}/items/Cadastro_de_Vagas`;

  private getHeaders() {
    return {
      'Authorization': `Bearer ${CONFIG.CMS_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  async listarVagas(apenasPublicadas: boolean = true): Promise<Vaga[]> {
    try {
      let url = this.baseUrl;
      
      // Se apenasPublicadas for true, adiciona filtro para Status_da_vaga
      if (apenasPublicadas) {
        url += '?filter[Status_da_vaga][_eq]=PUBLICADO&filter[Status_da_vaga][_neq]=ARQUIVADO';
      }

      console.log('Buscando vagas em:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
        cache: 'no-store' // Não usar cache para sempre pegar os dados mais recentes
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Resposta da API:', response.status, errorData);
        throw new Error(`Falha ao buscar vagas: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Dados recebidos:', data);
      
      // Verifica se data.data existe antes de filtrar
      if (!data.data) {
        console.warn('Resposta sem dados:', data);
        return [];
      }
      
      // Filtra novamente no lado do cliente para garantir
      return data.data.filter((vaga: Vaga) => !apenasPublicadas || (vaga.Status_da_vaga === 'PUBLICADO'));
    } catch (error) {
      console.error('Erro ao listar vagas:', error);
      throw error;
    }
  }

  // Resto do código permanece igual
  async buscarVagaPorSlug(slug: string): Promise<Vaga | null> {
    try {
      console.log('Buscando vaga por slug:', slug);
      
      // Busca todas as vagas publicadas
      const vagas = await this.listarVagas(true);
      
      // Encontra a vaga que corresponde ao slug
      const vagaEncontrada = vagas.find(vaga => {
        const vagaSlug = `${formatarParaURL(vaga.Titulo)}-${formatarParaURL(vaga.Local_da_vaga)}`;
        return vagaSlug === slug;
      });

      if (!vagaEncontrada) {
        return null;
      }

      return vagaEncontrada;
    } catch (error) {
      console.error('Erro ao buscar vaga por slug:', error);
      throw error;
    }
  }

  async buscarVaga(id: string): Promise<Vaga> {
    try {
      console.log('Buscando vaga:', id);
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar vaga');
      }

      const data = await response.json();
      console.log('Dados da vaga:', data);
      
      // Garante que todos os campos necessários estão presentes
      if (!data.data) {
        throw new Error('Dados da vaga não encontrados');
      }

      const vaga: Vaga = {
        id: data.data.id,
        Titulo: data.data.Titulo || '',
        Local_da_vaga: data.data.Local_da_vaga || '',
        Status_da_vaga: data.data.Status_da_vaga || 'RASCUNHO',
        Descricao_da_vaga: data.data.Descricao_da_vaga || '',
      };

      return vaga;
    } catch (error) {
      console.error('Erro ao buscar vaga:', error);
      throw error;
    }
  }

  async cadastrarVaga(dados: Omit<Vaga, 'id'>): Promise<Vaga> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Falha ao cadastrar vaga');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro ao cadastrar vaga:', error);
      throw error;
    }
  }

  async atualizarVaga(id: string, dados: Partial<Vaga>): Promise<Vaga> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Falha ao atualizar vaga');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
      throw error;
    }
  }
}

export const vagasService = new VagasService();
