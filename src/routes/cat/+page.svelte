<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { resolve } from '$app/paths';
	import { catApi } from '$lib/api/cat.api';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { CatType } from '$lib/types/cat';

	interface GotoParams {
		id?: string;
		type?: CatType;
	}

	const queryClient = useQueryClient();

	let bootstrapping = $state<boolean>(false);
	let bootstrapError = $state<string | null>(null);

	let params = $derived(page.url.searchParams);

	let id = $derived(params.get('id') ?? undefined);
	let type = $derived((params.get('type') as CatType) ?? undefined);

	const query = createQuery(() => ({
		queryKey: ['cat', id, type] as const,
		queryFn: ({ signal }) => {
			const key = ['cat', id, type];
			console.log('Query triggered', key);
			return catApi.getCat(id, { type }, signal);
		},
		enabled: !!id,
		staleTime: Infinity
	}));

	const types = Object.values(CatType);

	$effect(() => console.log('Cat: ', query.data));

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

	const updateUrl = (next: GotoParams): void => {
		const params = new SvelteURLSearchParams(page.url.searchParams);

		if (next.id) params.set('id', next.id);
		if (next.type) params.set('type', next.type);

		goto(resolve(`/cat?${params.toString()}`), {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		});
	};
</script>

<section class="container">
	<div class="filters">
		<select value={type} onchange={(e) => updateUrl({ type: e.currentTarget.value as CatType })}>
			{#each types as type (type)}
				<option value={type}>{type}</option>
			{/each}
		</select>
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
