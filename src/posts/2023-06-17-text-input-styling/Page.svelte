<script lang="ts">
  import CoveredInput from './CoveredInput.svelte';
  import { onMount } from 'svelte';

  export let pageText: string[];

  let firstValue = 'This is some text inside a text input';
  let secondValue =
    'This looks identical to the above input, but the text inside is rendered differently.';
  let thirdValue =
    'This is some text inside a text input which shows every word with "text" in it in red.' +
    ' You can edit the text and it will automatically update.';

  $: transformedThirdValue = thirdValue.split(' ').map((text, i) => ({
    text: i === 0 ? text : ' ' + text,
    style: text.toLowerCase().includes('text') ? 'red' : 'normal',
  }));

  let isBrowser = false;

  onMount(() => {
    isBrowser = true;
  });
</script>

{@html pageText[0]}

<input class="dark:bg-slate-900 bg-slate-100 p-1" bind:value={firstValue} />

<p>
  <span class="p-1">{firstValue}</span>
</p>

{#if !isBrowser}
  {@html pageText[1]}
{/if}

{@html pageText[2]}

<CoveredInput bind:value={secondValue} rows={2}>
  {secondValue}
</CoveredInput>

{@html pageText[3]}

<CoveredInput bind:value={thirdValue} rows={3}
  >{#each transformedThirdValue as elem}{#if elem.style === 'normal'}{elem.text}{:else}<span
        class="text-red-500">{elem.text}</span
      >{/if}{/each}</CoveredInput
>

{@html pageText[4]}

<style>
  input {
    width: 100%;
  }
</style>
