import { catApi } from '$lib/api/cat';
import { CAT_RANDOM_DEP } from '$lib/constants/deps';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, depends }) => {
	depends(CAT_RANDOM_DEP);

	try {
		const cat = await catApi.getRandomCat(fetch);
		return { cat };
	} catch {
		return { cat: null };
	}
};
