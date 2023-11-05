I've been reading [The Wandering Inn](https://wanderinginn.com/) recently.
In this story, the author does not limit themselves to regular white text on black background.
They will emphasize some unique or magical words by using <span style="color: #990099">different colors</span>.
Later on, they used <span style="font-family: serif; font-size: 1.05em">different fonts</span>
and even some <span class="moving-text">animated text</span>
. <span class="text-slate-50 dark:text-slate-800">In some scenes involving invisible characters,
the text is actually invisible.</span>

There's a scene involving some magical documents where the characters remark that the text in it is glowing.
Although it's written <span style="color:#f29b68">in a different color</span>,
I thought it's a shame there isn't actually any glowing effect. So I thought it would be cool to make one.

What would be an appropriate glow effect? You can make
a <span class="static-glow">static glow effect</span>
easily enough by using `text-shadow` with a high blur.
But this glow is less "magical text" and more "neon sign".

I decided the magical text should have an uneven glow that is constantly changing. To achieve this using CSS, you have to wrap each character with a `span`,
and animate their `text-shadow` separately, since you need to have a different duration and start time for each of them.

```html
<span class="glowing-text"
  ><span style="animation-delay: -1.00s; animation-duration: 1.28s">T</span
  ><span style="animation-delay: -1.31s; animation-duration: 1.39s">h</span
  ><span style="animation-delay: -0.37s; animation-duration: 1.02s">i</span
  ><span style="animation-delay: -1.70s; animation-duration: 1.14s">s</span>
  <!-- You probably will have to do this programatically -->
</span>
```

I also animated the font color a bit. To get the appropriate color from the original one, I used [chroma-js](https://github.com/gka/chroma.js) to increase the lightness
in [`oklch`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch). This color is also used in some of the `text-shadow`s.

```css
/* --lighter-color and --lighter-font-color is set by js */

.glowing-text span {
  animation: waverShadow infinite, waverText infinite;
}

@keyframes waverShadow {
  from {
    text-shadow: 0px 0px 10px currentColor, 0px 0px 10px var(--lighter-color);
  }

  50% {
    text-shadow: 0px 0px 10px currentColor, 0px 0px 20px var(--lighter-color);
  }

  to {
    text-shadow: 0px 0px 10px currentColor, 0px 0px 10px var(--lighter-color);
  }
}

@keyframes waverText {
  from {
    color: currentColor;
  }

  50% {
    color: var(--lighter-font-color);
  }

  to {
    color: currentColor;
  }
}
```

This is the result. <span class="hidden dark:inline">It looks best on dark backgrounds.</span>