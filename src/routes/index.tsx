import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// Lazy load components using inline imports
const Hero = await import('~/components/Hero/Hero').then(m => m.default);
const UniqueApproach = await import('~/components/UniqueApproach/UniqueApproach').then(m => m.default);
const HeirloomDifference = await import('~/components/HeirloomDifference/HeirloomDifference').then(m => m.default);
const Experience = await import('~/components/Experience/Experience').then(m => m.default);
const FAQ = await import('~/components/FAQ/FAQ').then(m => m.default);

export default component$(() => {
  return (
    <>
      <Hero />
      <UniqueApproach />
      <HeirloomDifference />
      <Experience />
      <FAQ />
    </>
  );
});

// Enhanced metadata for better SEO
export const head: DocumentHead = {
  title: "Heirloom Wedding Films",
  meta: [
    {
      name: "description",
      content: "Your wedding day, remembered for generations. 30+ Minute Wedding Films with All Day Coverage Included.",
    },
    {
      name: "keywords",
      content: "wedding films, wedding videography, wedding videos, wedding cinematography",
    },
    {
      property: "og:title",
      content: "Heirloom Wedding Films",
    },
    {
      property: "og:description",
      content: "Your wedding day, remembered for generations. 30+ Minute Wedding Films with All Day Coverage Included.",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
  ],
  links: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preload',
      href: '/images/hero-bg.jpg',
      as: 'image',
    },
  ],
};
