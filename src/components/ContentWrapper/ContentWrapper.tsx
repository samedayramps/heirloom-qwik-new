import { component$, Slot } from '@builder.io/qwik';

export const ContentWrapper = component$(() => {
  return (
    <div class="container">
      <Slot />
    </div>
  );
});
