import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Hero from "~/components/Hero/Hero";
import UniqueApproach from "~/components/UniqueApproach/UniqueApproach";
import HeirloomDifference from "~/components/HeirloomDifference/HeirloomDifference";
import Experience from '~/components/Experience/Experience';
import FAQ from "~/components/FAQ/FAQ";

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

export const head: DocumentHead = {
  title: "Heirloom Wedding Films",
  meta: [
    {
      name: "description",
      content: "Your wedding day, remembered for generations. 30+ Minute Wedding Films with All Day Coverage Included.",
    },
  ],
};
