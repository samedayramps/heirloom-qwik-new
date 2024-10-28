import { component$, useSignal, useOnWindow, $ } from "@builder.io/qwik";
import LogoSvg from '~/media/images/logo.svg?jsx';

export const Footer = component$(() => {
  const isVisible = useSignal(false);
  const footerRef = useSignal<Element>();

  useOnWindow('scroll', $(() => {
    if (!footerRef.value) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(footerRef.value);
    return () => observer.disconnect();
  }));

  return (
    <footer 
      ref={footerRef} 
      class="relative bg-[#2d2d2d] text-[#faf9f6] py-16"
    >
      {/* Texture Overlay */}
      <div 
        class={[
          "absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300",
          isVisible.value ? "opacity-20" : ""
        ].join(" ")}
        style={{
          backgroundImage: isVisible.value ? 'url(/images/9-texture.webp)' : undefined,
          backgroundRepeat: 'repeat',
          backgroundSize: '500px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div class="container relative z-10">
        {/* Logo */}
        <div class="flex flex-col items-center gap-8">
          <div class="h-12">
            <LogoSvg 
              class="h-full w-auto"
              aria-label="Heirloom Wedding Films"
            />
          </div>
          
          {/* Copyright */}
          <p class="text-center opacity-70 font-opensans text-sm">
            © {new Date().getFullYear()} Heirloom Wedding Films. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});
