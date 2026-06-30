import { page } from '$app/state';
import type { ResolvedPathname } from '$app/types';
import type { Attachment } from 'svelte/attachments';

export const preserveSearch =
  (route: ResolvedPathname): Attachment<HTMLAnchorElement> =>
  (element) => {
    const isCurrent = page.url.pathname === route;

    const handleClick = (e: MouseEvent): void => {
      // Let modifier-key/middle clicks behave normally (open in new tab, etc...)
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    };
  };
