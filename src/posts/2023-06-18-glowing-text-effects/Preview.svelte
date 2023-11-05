<script lang="ts">
  import GlowingText from './GlowingText.svelte';
</script>

<p>
  Making text that
  <span class="dark:hidden">
    <GlowingText color="#009944" text="glow" /><!--
    --></span
  ><!--
	--><span class="hidden dark:inline">
    <GlowingText color="#ff55ff" text="glow" /><!--
	--></span
  >.
</p>
