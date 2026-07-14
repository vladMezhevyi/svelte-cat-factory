<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { catsCountQueryOptions } from '$lib/api/cat.queries.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import Spinner from '$lib/components/ui/spinner/spinner.svelte';
  import { CAT_RANDOM_DEP } from '$lib/constants/deps.js';
  import { createQuery } from '@tanstack/svelte-query';
  import { MaskSadIcon, PawPrintIcon } from 'phosphor-svelte';

  const { data } = $props();
  let loading = $state<boolean>(false);

  let reloadLabel = $derived(loading ? 'Loading' : 'New Cat');

  const query = createQuery(() => catsCountQueryOptions);

  const reload = (): void => {
    loading = true;
    invalidate(CAT_RANDOM_DEP).finally(() => (loading = false));
  };
</script>

<svelte:head>
  <title>Cat Factory</title>
</svelte:head>

<section
  class="sm:flex-1 py-8 px-4 my-auto sm:my-0 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8 items-center justify-items-center"
>
  <article>
    <div class="text-lg sm:text-xl not-last:mb-4">
      <p>A random cat, every time.</p>
      <p>Because the internet can never have enough cats.</p>
    </div>

    <div class="text-lg" aria-live="polite" aria-atomic="true">
      {#if query.isPending}
        <p class="flex items-center gap-2">
          <Spinner aria-hidden="true" />
          <span>Loading stats</span>
        </p>
      {:else if query.isError}
        <p class="flex items-center gap-2 text-destructive">
          <MaskSadIcon aria-hidden="true" />
          Couldn't count the cats.
        </p>
      {:else if query.isSuccess}
        <div class="flex items-center gap-2">
          <PawPrintIcon aria-hidden="true" class="text-2xl text-primary" />
          <p>
            <b>{query.data.count}</b> cats available
          </p>
        </div>
      {/if}
    </div>
  </article>

  <div class="flex flex-col gap-4">
    <div aria-live="polite" aria-atomic="true">
      {#if data.cat}
        <img src={data.cat.url} alt="Random cat" />
      {:else}
        <p class="flex items-baseline gap-2 text-lg text-destructive">
          <MaskSadIcon aria-hidden="true" />
          Couldn't load the image. Might be a shy cat, might be the network.
        </p>
      {/if}
    </div>

    <Button disabled={loading} onclick={reload}>
      {#if loading}
        <Spinner />
      {/if}
      {reloadLabel}
    </Button>
  </div>
</section>
