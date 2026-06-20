<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="wrapper">
	<Header />

	<main class="main">
		{@render children()}
	</main>

	<Footer />
</div>

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
