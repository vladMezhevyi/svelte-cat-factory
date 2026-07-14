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
  <div class="flex flex-col min-h-dvh">
    <Header />

    <main class="flex-1 flex flex-col">
      {@render children()}
    </main>

    <Footer />
  </div>
</QueryClientProvider>
