import { component$ } from '@builder.io/qwik';
import { Stepper } from '../Stepper/Stepper';

const EXPERIENCE_STEPS = [
  {
    number: 1,
    title: 'Initial Call',
    description: "We'll have a friendly chat about your wedding vision and answer your questions. This helps us both decide if we're the perfect match for your special day."
  },
  {
    number: 2,
    title: 'Custom Plan',
    description: "Before the big day, we'll meet to get to know you, your family, and your wedding details. This ensures we capture your unique story in the most authentic way."
  },
  {
    number: 3,
    title: 'Wedding Day',
    description: "On your wedding day, we'll be there from start to finish. We'll capture all the special moments discreetly, allowing you to fully enjoy your celebration."
  },
  {
    number: 4,
    title: 'Film Delivery',
    description: "Within 90 days, you'll get your wedding film. Gather your loved ones to relive the magic – it's not just a video, but a family heirloom."
  }
];

export default component$(() => {
  return (
    <section class="bg-white w-full py-16">
      <div class="container">
        <div class="max-w-6xl mx-auto">
          <h2 class="font-playfair text-3xl md:text-4xl text-gray-800 mb-4 text-center">
            Your <span class="font-ephesis">experience </span> with us
          </h2>
          <p class="text-center font-opensans text-gray-600 mb-12 max-w-3xl mx-auto">
            From our first hello to the moment you receive your heirloom film, we're here to make everything easy and enjoyable.
          </p>
          
          <Stepper steps={EXPERIENCE_STEPS} />
        </div>
      </div>
    </section>
  );
});
