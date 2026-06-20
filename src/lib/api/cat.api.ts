import { PUBLIC_API_URL } from '$env/static/public';
import type { Cat, CatsCountResponse } from '$lib/types/cat';

type Fetch = typeof globalThis.fetch;

class CatApi {
	private readonly apiUrl = PUBLIC_API_URL;
	protected readonly nativeFetch: Fetch = fetch;

	getRandomCat = async (fetch?: Fetch): Promise<Cat> => {
		const res = await this.resolveFetch(`${this.apiUrl}/cat`, undefined, fetch);
		if (!res.ok) throw new Error(`Failed to fetch random cat: ${res.status}`);
		return res.json();
	};

	getCatsCount = async (fetch?: Fetch): Promise<CatsCountResponse> => {
		const res = await this.resolveFetch(`${this.apiUrl}/api/count`, undefined, fetch);
		if (!res.ok) throw new Error(`Failed to fetch cats count: ${res.status}`);
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
