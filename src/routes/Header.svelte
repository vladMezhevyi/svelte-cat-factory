<script lang="ts">
  import type { ResolvedPathname } from '$app/types';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';

  interface NavItem {
    label: string;
    route: ResolvedPathname;
  }

  const navItems: NavItem[] = [
    { label: 'Home', route: resolve('/') },
    { label: 'Cat', route: resolve('/cat') }
  ];

  function isCurrent(path: ResolvedPathname): boolean {
    return page.url.pathname === path;
  }
</script>

<header class="header">
  <a href={resolve('/')} class="logo">Cat Factory</a>

  <nav class="nav">
    {#each navItems as item (item.route)}
      <a
        href={item.route}
        class="nav-link"
        class:active={isCurrent(item.route)}
        aria-current={isCurrent(item.route)}
      >
        {item.label}
      </a>
    {/each}
  </nav>
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    background-color: lightgreen;
  }

  .logo {
    font-size: 20px;
    color: green;
  }

  .nav {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-link {
    font-size: 18px;
    color: green;
  }

  .nav-link.active {
    font-weight: 700;
  }

  .logo:hover,
  .nav-link:hover {
    text-decoration: none;
  }
</style>
