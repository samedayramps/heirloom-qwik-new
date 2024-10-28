import { component$, useSignal, useTask$, useOnWindow, $ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';

// Move static data outside component
const FEATURES = [
  {
    title: "The Full Story",
    content: "This isn't a quick highlight video—it's the complete story of your day. Get comfortable, pour some wine, and relive every moment. Our films typically run 30 minutes."
  },
  {
    title: "Unlimited Hours",
    content: "We film your entire day—from the wedding party getting ready until your sparkler exit. No hourly limits. No watching the clock. Just enjoy your wedding day."
  },
  {
    title: "All Your People",
    content: "Your wedding film includes everyone you love. We capture real moments and natural conversations with family and friends throughout your day. Because they're part of your story."
  }
] as const;

export default component$(() => {
  const isVisible = useSignal(false);
  const sectionRef = useSignal<Element>();

  // Use Intersection Observer to detect when section is visible
  useOnWindow('scroll', $(() => {
    if (!sectionRef.value) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            observer.disconnect();
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' 
      }
    );

    observer.observe(sectionRef.value);
    return () => observer.disconnect();
  }));

  // Server-side guard for initial state
  useTask$(() => {
    if (isServer) {
      isVisible.value = false;
    }
  });

  return (
    <section ref={sectionRef} class="bg-[#52453A] w-full py-16">
      <div class="container">
        <div class="max-w-6xl mx-auto">
          <h2 class="font-playfair text-3xl md:text-4xl text-white mb-8 text-center">
            HEIRLOOM is <span class="font-ephesis">different</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((item) => (
              <div 
                key={item.title}
                class={[
                  "p-6 rounded-lg flex flex-col h-full", // Added h-full
                  isVisible.value 
                    ? "bg-[url('/images/white-paint-block.webp')] bg-cover bg-center" // Changed to bg-cover
                    : "bg-white/90",
                  "transition-all duration-300"
                ].join(" ")}
                style={{
                  // Backup styles for better background handling
                  backgroundSize: isVisible.value ? '100% 100%' : undefined,
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div class="flex flex-col h-full items-center"> {/* Added wrapper for content */}
                  <h3 class="font-playfair text-xl mb-4 text-center">{item.title}</h3>
                  <p class="font-opensans text-sm text-justify leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
