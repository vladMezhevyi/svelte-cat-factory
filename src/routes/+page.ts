import { catApi } from '$lib/api/cat.api';
import { CAT_RANDOM_DEP } from '$lib/constants/deps';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, depends }) => {
	depends(CAT_RANDOM_DEP);

	try {
		const cat = await catApi.getRandomCat(undefined, fetch);
		return { cat };
	} catch (err) {
		return { cat: null, error: err as Error };
	}
};
