<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';

	const catUrl = `${PUBLIC_API_URL}/cat`;
	// import { invalidate } from '$app/navigation';
	// import type { Cat } from '$lib/types/cat.js';

	// const { data } = $props();

	// let cat = $state<Cat | null>(null);
	// let loading = $state<boolean>(false);
	// let error = $state<Error | null>(null);

	// $effect(() => {
	// 	cat = null;
	// 	loading = true;
	// 	error = null;

	// 	data.cat
	// 		.then((response) => {
	// 			console.log('Response: ', response);
	// 			cat = response;
	// 		})
	// 		.catch((err) => (error = err))
	// 		.finally(() => (loading = false));
	// });

	// function reload(): void {
	// 	invalidate('cat:random');
	// }
</script>

<h1>Cat</h1>

<img src={catUrl} alt="Random cat" />

<!-- <button type="button" disabled={loading} onclick={reload}>Reload</button>

{#if error}
	<div>Error - ${error.message}</div>
{:else if !cat}
	<div>Loading...</div>
{:else}
	<div>
		<img src={cat.url} alt="A random cat" />
	</div>
{/if} -->
