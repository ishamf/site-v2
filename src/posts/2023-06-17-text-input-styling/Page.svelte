<script lang="ts">
  import CoveredInput from './CoveredInput.svelte';
  import { onMount } from 'svelte';

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

<div>
  <slot name="text-1" />
</div>

<input class="dark:bg-slate-900 bg-slate-100 p-1" bind:value={firstValue} />

<p>
  <span class="p-1">{firstValue}</span>
</p>

{#if !isBrowser}
  <div>
    <slot name="text-2" />
  </div>
{/if}

<div>
  <slot name="text-3" />
</div>

<CoveredInput bind:value={secondValue} rows={2}>
  {secondValue}
</CoveredInput>

<div>
  <slot name="text-4" />
</div>

<CoveredInput bind:value={thirdValue} rows={3}
  >{#each transformedThirdValue as elem}{#if elem.style === 'normal'}{elem.text}{:else}<span
        class="text-red-500">{elem.text}</span
      >{/if}{/each}</CoveredInput
>

<div>
  <slot name="text-5" />
</div>

<style>
  input {
    width: 100%;
  }
</style>
