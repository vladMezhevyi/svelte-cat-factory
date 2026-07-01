import { PUBLIC_API_URL } from '$env/static/public';
import type { Cat, CatFilters, CatsCountResponse } from '$lib/types/cat.types';

type Fetch = typeof globalThis.fetch;

class CatApi {
  private readonly apiUrl = PUBLIC_API_URL;
  protected readonly nativeFetch: Fetch = fetch;

  getCat = async (
    catId?: string,
    filters?: CatFilters,
    signal?: AbortSignal,
    fetch?: Fetch
  ): Promise<Cat> => {
    // TODO: Remove fake delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const params = new URLSearchParams();

    if (filters?.type) params.set('type', filters.type);
    if (filters?.filter) params.set('filter', filters.filter);

    const queryParams = params.toString();
    const url = `${this.apiUrl}/cat${catId ? `/${catId}` : ''}${queryParams ? `?${queryParams}` : ''}`;

    const res = await this.resolveFetch(url, { signal }, fetch);
    if (!res.ok) throw new Error(`Failed to fetch a cat: ${res.status}`);

    return res.json();
  };

  getRandomCat = async (signal?: AbortSignal, fetch?: Fetch): Promise<Cat> => {
    const res = await this.resolveFetch(`${this.apiUrl}/cat`, { signal }, fetch);
    if (!res.ok) throw new Error(`Failed to fetch random cat: ${res.status}`);
    return res.json();
  };

  getCatsCount = async (fetch?: Fetch): Promise<CatsCountResponse> => {
    const res = await this.resolveFetch(`${this.apiUrl}/api/count`, undefined, fetch);
    if (!res.ok) throw new Error(`Failed to fetch cats count: ${res.status}`);
    return res.json();
  };

  getCatById = async (
    catId: string,
    filters?: CatFilters,
    signal?: AbortSignal,
    fetch?: Fetch
  ): Promise<Cat> => {
    const params = new URLSearchParams();
    if (filters?.type) params.set('type', filters.type);

    const queryParams = params.toString();
    const url = `${this.apiUrl}/cat/${catId}${queryParams ? `?${queryParams}` : ''}`;

    const res = await this.resolveFetch(url, { signal }, fetch);
    if (!res.ok) throw new Error(`Failed to fetch cat: ${res.status}`);
    return res.json();
  };

  private resolveFetch(
    input: string | URL | Request,
    init?: RequestInit | undefined,
    fetch?: Fetch
  ): Promise<Response> {
    const resolvedFetch = fetch ?? this.nativeFetch;
    return this.intercept(resolvedFetch)(input, init);
  }

  private intercept(fetch: Fetch): Fetch {
    return (input, init) => {
      const url = input.toString();
      const headers = new Headers(init?.headers);

      if (this.mustAppendHeader(url)) {
        headers.append('Accept', 'application/json');
      }

      return fetch(input, { ...init, headers });
    };
  }

  private mustAppendHeader(url: string): boolean {
    return url.includes('/cat') && !url.includes('/api');
  }
}

export const catApi = new CatApi();
