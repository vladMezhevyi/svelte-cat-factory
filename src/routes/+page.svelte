<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { catsCountQueryOptions } from '$lib/api/cat.queries.js';
	import { CAT_RANDOM_DEP } from '$lib/constants/deps.js';
	import { createQuery } from '@tanstack/svelte-query';

	const { data } = $props();
	let loading = $state<boolean>(false);

	const query = createQuery(() => catsCountQueryOptions);

	const reload = (): void => {
		loading = true;
		invalidate(CAT_RANDOM_DEP).finally(() => (loading = false));
	};
</script>

<svelte:head>
	<title>Cat Factory</title>
</svelte:head>

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

		<button
			type="button"
			class="reload-btn"
			aria-label="Get a random cat"
			disabled={loading}
			onclick={reload}
		>
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

	.info > p:not(:last-child) {
		margin-bottom: 0.5rem;
	}

	.media {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.image-wrapper {
		border-radius: 4px;
		overflow: hidden;
	}

	.image-wrapper img {
		display: block;
		width: 100%;
		height: auto;
		max-height: 60vh;
		object-fit: contain;
	}

	@media (max-width: 768px) {
		.container {
			grid-template-columns: 1fr;
			grid-template-rows: min-content 1fr;
			gap: 1rem;
			max-width: 425px;
			margin: 0 auto;
			padding: 2rem 1rem;
		}

		.image-wrapper img {
			max-height: none;
		}
	}
</style>
