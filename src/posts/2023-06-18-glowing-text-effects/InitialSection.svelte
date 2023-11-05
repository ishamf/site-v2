<div class="content">
  <slot />
</div>

<style lang="postcss">
  .content :global(.static-glow) {
    color: rgb(0, 89, 255);
    text-shadow:
      0 0 10px currentColor,
      0 0 20px currentColor;
  }

  @media (prefers-color-scheme: dark) {
    .content :global(.static-glow) {
      color: rgb(0, 255, 255);
    }
  }

  .content :global(.moving-text) {
    --moving-color: black;
    animation: moving-text 1s infinite;
    color: transparent;
  }

  @media (prefers-color-scheme: dark) {
    .content :global(.moving-text) {
      --moving-color: white;
    }
  }

  @keyframes moving-text {
    from {
      text-shadow: 0 -4px 0 var(--moving-color);
    }

    50% {
      text-shadow: 0 4px 0 var(--moving-color);
    }

    to {
      text-shadow: 0 -4px 0 var(--moving-color);
    }
  }
</style>
