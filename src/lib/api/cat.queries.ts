import { QUERY_KEYS } from '$lib/constants/query.keys';
import { queryOptions } from '@tanstack/svelte-query';
import { catApi } from './cat.api';

export const catsCountQueryOptions = queryOptions({
  queryKey: QUERY_KEYS.catsCount,
  queryFn: () => catApi.getCatsCount(),
  staleTime: Infinity
});
