import { component$ } from '@builder.io/qwik';
import { Stepper } from '../Stepper/Stepper';
import { ContentWrapper } from '../ContentWrapper/ContentWrapper';

const STEPS = [
  {
    number: 1,
    title: "Initial Consultation",
    description: "We'll discuss your vision, preferences, and wedding details.",
  },
  // ... other steps
];

export default component$(() => {
  return (
    <section class="py-24">
      <ContentWrapper>
        <div class="max-w-7xl mx-auto">
          <Stepper steps={STEPS} />
        </div>
      </ContentWrapper>
    </section>
  );
});
