import { PUBLIC_API_URL } from '$env/static/public';
import { CAT_RANDOM_DEP } from '$lib/constants/deps';
import type { Cat } from '$lib/types/cat';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, depends }) => {
	depends(CAT_RANDOM_DEP);

	const response = await fetch(`${PUBLIC_API_URL}/cat?json=true`);

	if (!response.ok) {
		return { cat: null };
	}

	const cat: Cat = await response.json();

	return { cat };
};
