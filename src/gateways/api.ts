import { CONFIG } from "../config";

interface IpropsApi {
  collection: string;
  nextTag: string[];
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: FormData | object;
}

export const apiCMS = async ({ nextTag, collection, method = "GET", body }: IpropsApi) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${CONFIG.CMS_TOKEN}`);

  if (!(body instanceof FormData)) {
    headers.append("Content-Type", "application/json");
  }

  const url = `${CONFIG.CMS_URL}/items/${collection}`;
  console.log('URL:', url);

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
      next: {
        tags: nextTag
      }
    });

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.message || 'Erro na requisição');
    }

    return data.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};