When I started reading TWI, I wondered why the author decided to use black background by default. Then
the colored text started appearing, and it makes sense.

If you have a lot of these animated text, the animations will take a significant amount of CPU time.
You can disable them when they're outside the viewport using `InteractionObserver`.

```ts
const observer = new IntersectionObserver(callback, options);

function callback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('glowing-text');
    } else {
      entry.target.classList.remove('glowing-text');
    }
  });
}

observer.observe(animatedTextSpan);
```

[You can check out the final component here.](https://github.com/ishamf/site/blob/main/src/lib/posts/2023-06-18-glowing-text-effects/GlowingText.svelte)
