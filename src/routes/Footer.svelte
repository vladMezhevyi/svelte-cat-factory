<script lang="ts">
  import {
    PUBLIC_API_URL,
    PUBLIC_GITHUB_PROFILE_URL,
    PUBLIC_OWNER_NAME,
    PUBLIC_API_NAME
  } from '$env/static/public';

  import { DotIcon } from 'phosphor-svelte';

  const rel = 'external noopener noreferrer';
  const target = '_blank';
  const className = 'text-primary hover:underline';
</script>

<footer
  class="bg-secondary text-secondary-foreground text-xs sm:text-base flex items-center px-4 py-2 gap-1 sm:gap-2 flex-wrap"
>
  <p>
    Made by
    <a href={PUBLIC_GITHUB_PROFILE_URL} class={className} {rel} {target}>
      {PUBLIC_OWNER_NAME}
    </a>
  </p>

  <DotIcon size="2rem" class="text-secondary-foreground text-base" />

  <p>
    Cat magic by
    <a href={PUBLIC_API_URL} class={className} {rel} {target}>{PUBLIC_API_NAME}</a>
  </p>
</footer>
