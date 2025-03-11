import { CONFIG } from '../config';
import { formatarParaURL } from '../utils/format-url';

export interface Vaga {
  id?: string;
  Titulo: string;
  Local_da_vaga: string;
  Status_da_vaga: 'PUBLICADO' | 'RASCUNHO';
  Descricao_da_vaga: string;
}

class VagasService {
  private baseUrl = `${CONFIG.CMS_URL}/items/Catrastro_de_Vagas`;
  private token = CONFIG.CMS_TOKEN;

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  async listarVagas(pagina: number = 1, limite: number = 6): Promise<Vaga[]> {
    try {
      const offset = (pagina - 1) * limite;
      const response = await fetch(`${this.baseUrl}?filter[Status_da_vaga][_eq]=PUBLICADO&limit=${limite}&offset=${offset}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar vagas');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Erro ao listar vagas:', error);
      throw error;
    }
  }

  async buscarVaga(id: string): Promise<Vaga> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar vaga');
    }

    const data = await response.json();
    return data.data;
  }

  async buscarVagaPorSlug(slug: string): Promise<Vaga | null> {
    try {
      // Decodifica o slug para extrair título e local
      const partes = slug.split('-');
      const local = partes.pop() || ''; // último item é a UF
      const cidade = partes.pop() || ''; // penúltimo item é a cidade
      const titulo = partes.join('-'); // o resto é o título

      // Reconstrói o local da vaga
      const localDaVaga = `${cidade.toUpperCase()} - ${local.toUpperCase()}`;

      // Busca todas as vagas publicadas
      const vagas = await this.listarVagas(1, 100);
      
      // Encontra a vaga que corresponde ao slug
      const vaga = vagas.find(v => {
        const vagaSlug = `${formatarParaURL(v.Titulo)}-${formatarParaURL(v.Local_da_vaga)}`;
        return vagaSlug === slug;
      });

      return vaga || null;
    } catch (error) {
      console.error('Erro ao buscar vaga por slug:', error);
      return null;
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

// Around line 63, you have unused variables:
// Change this:
// Add this comment above the line with unused variables
/* eslint-disable @typescript-eslint/no-unused-vars */
const { titulo, descricao, localDaVaga, ...otherProps } = vaga;

// To this:
const { descricao, ...otherProps } = vaga;
// or if you need to destructure but not use those variables:
const { titulo: _, descricao, localDaVaga: __, ...otherProps } = vaga;
