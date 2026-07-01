<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { resolve } from '$app/paths';
  import { catApi } from '$lib/api/cat.api';
  import { SvelteURLSearchParams } from 'svelte/reactivity';
  import { CatFilter, CatType, type Cat, type CatFilters } from '$lib/types/cat.types';
  import Filters from './Filters.svelte';
  import { onMount } from 'svelte';
  import { isCatTypeValid } from '$lib/validators/cat.validators';

  interface CatParams extends CatFilters {
    id?: string | null;
  }

  const queryClient = useQueryClient();

  let bootstrapping = $state<boolean>(false);
  let bootstrapError = $state<string | null>(null);

  let params = $derived(page.url.searchParams);

  let id = $derived(params.get('id') ?? undefined);
  let type = $derived<CatType | undefined>((params.get('type') as CatType) ?? undefined);
  let filter = $derived<CatFilter | undefined>(params.get('filter' as CatType) ?? undefined);

  const query = createQuery(() => ({
    queryKey: ['cat', id, type, filter] as const,
    queryFn: ({ signal }) => catApi.getCat(id, { type, filter }, signal),
    retry: false,
    enabled: !!id,
    staleTime: Infinity, // Don't refetch on background
    gcTime: 60 * 1000 // Delete cached objects after 1 minute
  }));

  const shuffleCat = createMutation(() => ({
    mutationFn: () => catApi.getCat(undefined, { type, filter }),
    onSuccess: (cat: Cat) => {
      queryClient.setQueryData(['cat', cat.id, type, filter], cat);
      updateUrl({ id: cat.id });
    }
  }));

  let disabled = $derived(query.isPending || shuffleCat.isPending);

  $effect(() => console.log('Params: ', { id, type, filter }));

  const bootstrap = (controller: AbortController): void => {
    bootstrapping = true;
    bootstrapError = null;

    catApi
      .getCat(undefined, undefined, controller.signal)
      .then((cat) => {
        queryClient.setQueryData(['cat', cat.id, type, filter], cat);
        updateUrl({ id: cat.id });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        bootstrapError = error instanceof Error ? error.message : 'Failed to load a cat';
      })
      .finally(() => (bootstrapping = false));
  };

  const setOrDelete = (
    params: URLSearchParams,
    key: string,
    value: string | null | undefined
  ): void => {
    if (value === undefined) return;
    if (value === null) {
      params.delete(key);
      return;
    }

    params.set(key, value);
  };

  const updateUrl = (next: CatParams): void => {
    const params = new SvelteURLSearchParams(page.url.searchParams);

    setOrDelete(params, 'id', next.id);
    setOrDelete(params, 'type', next.type);
    setOrDelete(params, 'filter', next.filter);

    goto(resolve(`/cat?${params.toString()}`), {
      replaceState: true,
      noScroll: true,
      keepFocus: true
    });
  };

  onMount(() => {
    if (!isCatTypeValid(type)) {
      updateUrl({ type: null });
    }

    const controller = new AbortController();
    if (!id) {
      bootstrap(controller);
    }

    return () => controller.abort();
  });
</script>

<section class="container">
  <div class="filters">
    <button type="button" {disabled} onclick={() => shuffleCat.mutate()}>
      {shuffleCat.isPending ? 'Shuffling...' : 'New random cat'}
    </button>

    <Filters {type} {filter} {disabled} onFiltersChange={(filters) => updateUrl(filters)} />
  </div>

  {#if bootstrapping}
    <p>Finding a cat...</p>
  {:else if bootstrapError}
    <p role="alert">{bootstrapError}</p>
  {:else if query.isPending}
    <p>Loading a cat...</p>
  {:else if query.isError}
    <p role="alert">{query.error.message}</p>
  {:else if query.data}
    <img src={query.data.url} alt={query.data.tags?.join(', ') ?? 'cat'} />
  {/if}
</section>
