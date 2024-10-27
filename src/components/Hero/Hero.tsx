import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="bg-[#faf9f6] w-full py-16">
      <div class="container">
        <div class="max-w-6xl mx-auto text-center">
          <h1 class="font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-2">
            Your wedding day, remembered for <span class="font-ephesis">generations</span>
          </h1>
          <p class="font-opensans text-base md:text-lg text-gray-600 mb-6">
            30+ Minute Wedding Films — All Day Coverage Included
          </p>
          <Link 
            href="/films" 
            class="bg-[#2d2d2d] text-white font-opensans font-light py-2 px-6 rounded-full text-sm uppercase tracking-wider hover:bg-gray-800 transition duration-300"
          >
            Watch Films
          </Link>
        </div>
      </div>
    </section>
  );
});
