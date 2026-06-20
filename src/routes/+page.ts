import { PUBLIC_API_URL } from '$env/static/public';
import type { Cat } from '$lib/types/cat';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ fetch, depends }) => {
	depends('cat:random');
	return { cat: fetch(`${PUBLIC_API_URL}/cat?json=true`).then((r) => r.json() as Promise<Cat>) };
};
