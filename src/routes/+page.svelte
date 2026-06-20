<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { catApi } from '$lib/api/cat.js';
	import { CAT_RANDOM_DEP } from '$lib/constants/deps.js';
	import { createQuery } from '@tanstack/svelte-query';

	const { data } = $props();
	let loading = $state<boolean>(false);

	const query = createQuery(() => ({
		queryKey: ['cats-count'],
		queryFn: () => catApi.getCatsCount()
	}));

	const reload = (): void => {
		loading = true;
		invalidate(CAT_RANDOM_DEP).finally(() => (loading = false));
	};
</script>

<section class="container">
	<article class="info">
		<p>A random cat, every time.</p>
		<p>Because the internet can never have enough cats.</p>

		{#if query.isLoading}
			<div>Loading stats...</div>
		{:else if query.isError}
			<div>Error: {query.error.message}</div>
		{:else if query.isSuccess}
			<div class="stats">
				<span>🐾</span>
				<b>{query.data.count}</b>
				<span>cats available</span>
			</div>
		{/if}
	</article>

	<div class="media">
		<div class="image-wrapper">
			{#if data.cat}
				<img src={data.cat.url} alt="Random cat" />
			{:else}
				<span>Failed to load an image</span>
			{/if}
		</div>

		<button type="button" class="reload-btn" disabled={loading} onclick={reload}>
			🔄 New cat
		</button>
	</div>
</section>

<style>
	.container {
		flex: 1;
		padding: 1rem;

		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		align-items: center;
		justify-items: center;
	}

	.info > p {
		font-size: 1.25rem;
	}

	.media {
		display: flex;
		flex-direction: column;
		max-height: 60vh;
	}

	.image-wrapper {
		width: 100%;
	}

	.image-wrapper img {
		display: block;
		width: 100%;
		height: auto;
		max-height: 70vh;
		object-fit: contain;
	}
</style>
