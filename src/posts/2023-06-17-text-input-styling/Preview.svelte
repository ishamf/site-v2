<script lang="ts">
  import { onMount } from 'svelte';
  import CoveredInput from './CoveredInput.svelte';

  const basethirdValue =
    'This is some text inside a text input which shows every word with "text" in it in red.' +
    ' You can edit the text and it will automatically update.';

  let thirdValue =
    basethirdValue +
    ` This only works with JavaScript though, seems you haven't finished loading it or it's disabled.`;

  let isBrowser = false;

  onMount(() => {
    thirdValue = basethirdValue;
    isBrowser = true;
  });

  $: transformedThirdValue = thirdValue.split(' ').map((text, i) => ({
    text: i === 0 ? text : ' ' + text,
    style: text.toLowerCase().includes('text') ? 'red' : 'normal',
  }));
</script>

<CoveredInput bind:value={thirdValue} rows={3} disabled={!isBrowser}
  >{#each transformedThirdValue as elem}{#if elem.style === 'normal'}{elem.text}{:else}<span
        class="text-red-500">{elem.text}</span
      >{/if}{/each}</CoveredInput
>
