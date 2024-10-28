import { component$, useSignal, useOnDocument, $ } from '@builder.io/qwik';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
}

export const Stepper = component$<StepperProps>(({ steps }) => {
  const isVisible = useSignal(false);
  const stepperRef = useSignal<Element>();

  // Simplified visibility detection
  useOnDocument('scroll', $(() => {
    if (!stepperRef.value) return;
    
    const rect = stepperRef.value.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isInViewport) {
      isVisible.value = true;
    }
  }));

  return (
    <div ref={stepperRef} class="relative">
      {/* Desktop version */}
      <div class="hidden md:block">
        <ul class="grid grid-cols-4">
          {steps.map((step, index) => (
            <li 
              key={step.number} 
              class={[
                "relative transform transition-transform duration-500",
                isVisible.value ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                `transition-delay-${index * 100}`
              ].join(" ")}
            >
              <div class="flex items-center w-full">
                {/* Circle with number */}
                <div class="relative z-10 flex-shrink-0 w-10 h-10 bg-[#d5c6ad] rounded-full flex items-center justify-center">
                  <span class="font-opensans text-[#faf9f6] text-base font-medium">
                    {step.number}
                  </span>
                </div>
                {/* Connecting line */}
                {index !== steps.length - 1 && (
                  <div class={[
                    "h-0.5 flex-1 mx-2 bg-[#d5c6ad] rounded-full transform transition-transform duration-500",
                    isVisible.value ? "scale-x-100" : "scale-x-0",
                    `transition-delay-${index * 100}`
                  ].join(" ")}></div>
                )}
              </div>
              {/* Content */}
              <div class="mt-4 pr-6">
                <h3 class="font-playfair text-xl text-gray-800 mb-2">{step.title}</h3>
                <p class="font-opensans text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile version */}
      <ul class="md:hidden space-y-6">
        {steps.map((step, index) => (
          <li 
            key={step.number} 
            class={[
              "flex group transform transition-transform duration-500",
              isVisible.value ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
              `transition-delay-${index * 100}`
            ].join(" ")}
          >
            <div class="flex flex-col items-center">
              {/* Circle with number */}
              <div class="relative z-10 w-10 h-10 bg-[#d5c6ad] rounded-full flex items-center justify-center">
                <span class="font-opensans text-[#faf9f6] text-base font-medium">
                  {step.number}
                </span>
              </div>
              {/* Vertical line */}
              {index !== steps.length - 1 && (
                <div class={[
                  "w-0.5 flex-1 my-2 bg-[#d5c6ad] rounded-full transform transition-transform duration-500",
                  isVisible.value ? "scale-y-100" : "scale-y-0",
                  `transition-delay-${index * 100}`
                ].join(" ")}></div>
              )}
            </div>
            {/* Content */}
            <div class="ml-6 pb-6">
              <h3 class="font-playfair text-xl text-gray-800 mb-2">{step.title}</h3>
              <p class="font-opensans text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
