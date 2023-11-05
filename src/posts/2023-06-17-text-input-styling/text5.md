Unlike other approaches like using a `contenteditable` div, you can render the content using React/Svelte, since the user won't edit the elements directly.

But, there's a lot of edge cases with this approach:

- By default, the caret will use the text color (which is transparent in this case). You'll need to recolor it.
- You need to carefully manage the whitespace on the rendering element and make sure it perfectly matches the input.
- If the text is too long and overflows the input, you'll need to sync the scrolling state between the input and the rendering element.
- If you have newlines at the end of your text, they will not be rendered even if you're using `pre-wrap`. But a `&lt;textarea&gt;` will render it. To align the rendering behavior, you need to add another character after the end of the newline.

There's probably other edge cases that I don't know of yet. You're probably better off using `contenteditable` for most cases.
