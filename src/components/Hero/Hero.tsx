import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

// Extract static classes to prevent recreation on each render
const HERO_CLASSES = {
  section: 'bg-[#faf9f6] w-full py-16',
  container: 'container',
  content: 'max-w-6xl mx-auto text-center',
  heading: 'font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-2',
  accent: 'font-ephesis',
  description: 'font-opensans text-base md:text-lg text-gray-600 mb-6',
  cta: [
    'bg-[#2d2d2d]',
    'text-white',
    'font-opensans',
    'font-light',
    'py-2',
    'px-6',
    'rounded-full',
    'text-sm',
    'uppercase',
    'tracking-wider',
    'hover:bg-gray-800',
    'transition',
    'duration-300'
  ].join(' ')
} as const;

export default component$(() => {
  return (
    <section class={HERO_CLASSES.section}>
      <div class={HERO_CLASSES.container}>
        <div class={HERO_CLASSES.content}>
          <h1 class={HERO_CLASSES.heading}>
            Your wedding day, remembered for{' '}
            <span class={HERO_CLASSES.accent}>generations</span>
          </h1>
          
          <p class={HERO_CLASSES.description}>
            30+ Minute Wedding Films — All Day Coverage Included
          </p>
          
          <Link 
            href="/films" 
            class={HERO_CLASSES.cta}
            prefetch // Since it's above the fold, we want immediate prefetch
          >
            Watch Films
          </Link>
        </div>
      </div>
    </section>
  );
});
