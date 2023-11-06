<script lang="ts" context="module">
  const browser = !!globalThis.window;
  let screenWidth = writable(browser ? window.innerWidth : 0);

  browser &&
    window.addEventListener('resize', () => {
      screenWidth.set(window.innerWidth);
    });
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { expandedImage } from '../svelteStores';
  import { mdiClose } from '@mdi/js';
  import { writable } from 'svelte/store';

  function dismiss() {
    $expandedImage = null;
  }

  let overlay: HTMLDivElement;

  $: {
    if (overlay) {
      overlay.focus();
    }
  }

  $: canExpandImage = $screenWidth && $screenWidth > 900; // TODO: figure out a nicer way to do this

  $: {
    if (browser) {
      if (canExpandImage) {
        document.body.classList.add('page-overlay-can-expand-image');
      } else {
        document.body.classList.remove('page-overlay-can-expand-image');
      }
    }
  }

  onMount(() => {
    // Add event listeners to all images
    for (const element of document.querySelectorAll('.prose img')) {
      const img = element as HTMLImageElement;

      img.addEventListener('click', () => {
        if (canExpandImage) {
          $expandedImage = {
            src: img.src,
            alt: img.alt,
          };
        }
      });
    }
  });
</script>

{#if $expandedImage}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center cursor-pointer"
    tabindex="-1"
    role="button"
    on:click={dismiss}
    on:keydown={dismiss}
    bind:this={overlay}
  >
    <svg viewBox="0 0 24 24" role="img" class="m-2 fill-slate-100 absolute top-2 right-2 w-4 h-4">
      <title>Close Image</title>
      <path d={mdiClose} />
    </svg>
    <img class="max-w-full max-h-full" src={$expandedImage.src} alt={$expandedImage.alt} />
  </div>
{/if}

<style lang="postcss">
  :global(.page-overlay-can-expand-image .prose img) {
    cursor: pointer;
  }
</style>
