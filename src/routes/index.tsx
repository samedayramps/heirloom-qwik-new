import { component$ } from "@builder.io/qwik";
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
