<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { resolve } from '$app/paths';
  import { catApi } from '$lib/api/cat.api';
  import { SvelteURLSearchParams } from 'svelte/reactivity';
  import { CatType, type Cat, type CatFilters } from '$lib/types/cat';
  import Filters from './Filters.svelte';

  interface GotoParams extends CatFilters {
    id?: string | null;
  }

  const queryClient = useQueryClient();

  let bootstrapping = $state<boolean>(false);
  let bootstrapError = $state<string | null>(null);

  let params = $derived(page.url.searchParams);

  let id = $derived(params.get('id') ?? undefined);
  let type = $derived((params.get('type') as CatType) ?? undefined);

  const query = createQuery(() => ({
    queryKey: ['cat', id, type] as const,
    queryFn: ({ signal }) => catApi.getCat(id, { type }, signal),
    enabled: !!id,
    staleTime: Infinity, // Don't refetch on background
    gcTime: 60 * 1000 // Delete cached objects after 1 minute
  }));

  const shuffleCat = createMutation(() => ({
    mutationFn: () => catApi.getCat(undefined, { type }),
    onSuccess: (cat: Cat) => {
      queryClient.setQueryData(['cat', cat.id, type], cat);
      updateUrl({ id: cat.id });
    }
  }));

  let disabled = $derived(query.isPending || shuffleCat.isPending);

  $effect(() => console.log('Params: ', { id, type }));

  $effect(() => {
    if (id) return;

    const controller = new AbortController();
    bootstrapping = true;
    bootstrapError = null;

    catApi
      .getCat(undefined, undefined, controller.signal)
      .then((cat) => {
        queryClient.setQueryData(['cat', cat.id, type], cat);
        updateUrl({ id: cat.id });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        bootstrapError = error instanceof Error ? error.message : 'Failed to load a cat';
      })
      .finally(() => (bootstrapping = false));

    return () => controller.abort();
  });

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

  const updateUrl = (next: GotoParams): void => {
    const params = new SvelteURLSearchParams(page.url.searchParams);

    setOrDelete(params, 'id', next.id);
    setOrDelete(params, 'type', next.type);

    goto(resolve(`/cat?${params.toString()}`), {
      replaceState: true,
      noScroll: true,
      keepFocus: true
    });
  };
</script>

<section class="container">
  <div class="filters">
    <button type="button" {disabled} onclick={() => shuffleCat.mutate()}>
      {shuffleCat.isPending ? 'Shuffling...' : 'New random cat'}
    </button>

    <Filters {type} {disabled} onFiltersChange={(filters) => updateUrl(filters)} />
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
