import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  const isTextureLoaded = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const img = new Image();
    img.src = '/images/16-texture-square.webp';
    img.onload = () => {
      isTextureLoaded.value = true;
    };
  });

  return (
    <section class="relative bg-[#d5c6ad] w-full py-16 overflow-hidden">
      {/* Texture Overlay */}
      <div 
        class={[
          "absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700",
          isTextureLoaded.value ? "opacity-30" : "opacity-0"
        ].join(" ")}
        style={{
          backgroundImage: isTextureLoaded.value ? 'url(/images/16-texture-square.webp)' : undefined,
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
          backgroundRepeat: 'repeat-y',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div class="container relative z-10">
        <div class="max-w-6xl mx-auto">
          <h2 class="font-playfair text-3xl md:text-4xl text-gray-800 mb-6 text-center">
            Our <span class="font-ephesis">unique </span> approach
          </h2>
          <div class="font-opensans text-gray-700 space-y-4">
            <p>
              At HEIRLOOM Wedding Films, we craft cinematic stories that you'll cherish for a lifetime and pass down through generations. Whether it's a traditional ceremony close to home or an exotic destination elopement, we're here to capture your unique love story in full.
            </p>
            <p>
              We take the time to get to know you, so your film truly reflects who you are. As passionate storytellers, we're constantly honing our craft to match the depth of your love. We love working with couples who are excited about preserving their memories as much as we are about capturing them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
