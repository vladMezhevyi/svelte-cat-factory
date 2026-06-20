<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Cat Factory</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div class="wrapper">
		<Header />

		<main class="main">
			{@render children()}
		</main>

		<Footer />
	</div>
</QueryClientProvider>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	.main {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
