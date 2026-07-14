<script lang="ts">
  import type { ResolvedPathname } from '$app/types';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { preserveSearch } from '$lib/attachments/preserve-search.svelte';

  interface NavItem {
    label: string;
    route: ResolvedPathname;
  }

  const navItems: NavItem[] = [
    { label: 'Home', route: resolve('/') },
    { label: 'Cat', route: resolve('/cat') }
  ];

  const isCurrent = (path: ResolvedPathname): boolean => {
    return page.url.pathname === path;
  };
</script>

<header
  class="bg-primary text-primary-foreground px-4 py-4 gap-4 flex items-center justify-between"
>
  <a href={resolve('/')} class="text-xl font-bold">Cat Factory</a>

  <nav class="flex items-center gap-4">
    {#each navItems as item (item.route)}
      <a
        {@attach preserveSearch(item.route)}
        href={item.route}
        class="text-base hover:underline"
        class:underline={isCurrent(item.route)}
        aria-current={isCurrent(item.route)}
      >
        {item.label}
      </a>
    {/each}
  </nav>
</header>
