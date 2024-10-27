import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "When will we receive our wedding film?",
    answer: "Your wedding film will be delivered within 12-16 weeks after your wedding date. We take great care in crafting each film to ensure it perfectly captures your special day.",
  },
  {
    question: "What's the process after booking?",
    answer: "After booking, we'll schedule a consultation to discuss your vision, timeline, and important moments you want captured. We'll stay in touch throughout the planning process and coordinate with your other vendors to ensure everything runs smoothly.",
  },
  {
    question: "Do you travel for weddings?",
    answer: "Yes! We travel nationwide and internationally for weddings. Travel fees may apply depending on the location. Contact us for specific details about your destination.",
  },
];

export default component$(() => {
  const openIndex = useSignal<number | null>(null);
  const isTextureLoaded = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const img = new Image();
    img.src = '/images/18-texture.webp';
    img.onload = () => {
      isTextureLoaded.value = true;
    };
  });

  return (
    <section class="relative bg-[#315141] py-24 overflow-hidden">
      {/* Texture Overlay */}
      <div 
        class={[
          "absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700",
          isTextureLoaded.value ? "opacity-30" : "opacity-0"
        ].join(" ")}
        style={{
          backgroundImage: isTextureLoaded.value ? 'url(/images/18-texture.webp)' : undefined,
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
          backgroundRepeat: 'repeat-y',
        }}
        aria-hidden="true"
      />
      
      {/* Content */}
      <ContentWrapper>
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <h2 class="font-playfair text-3xl md:text-4xl text-white mb-16 flex items-center justify-center gap-8">
            Have questions? <button class="talk-button px-8">LET'S TALK</button>
          </h2>

          <div class="space-y-4 text-left">
            {faqItems.map((item, index) => (
              <div
                key={index}
                class="bg-white rounded-lg overflow-hidden"
              >
                <button
                  onClick$={() => {
                    openIndex.value = openIndex.value === index ? null : index;
                  }}
                  class="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors duration-500"
                >
                  <span class="text-xl font-playfair">{item.question}</span>
                  <span 
                    class={[
                      "transform transition-transform duration-700 ease-in-out",
                      openIndex.value === index ? "rotate-180" : ""
                    ].join(" ")}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9L12 16L5 9"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  class="overflow-hidden transition-all duration-700 ease-in-out"
                  style={{
                    maxHeight: openIndex.value === index ? '500px' : '0',
                    opacity: openIndex.value === index ? '1' : '0',
                  }}
                >
                  <div class="px-6 pb-5 text-gray-600">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
});
