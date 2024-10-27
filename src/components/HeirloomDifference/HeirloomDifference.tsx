import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section class="bg-[#52453A] w-full py-16">
      <div class="container">
        <div class="max-w-6xl mx-auto">
          <h2 class="font-playfair text-3xl md:text-4xl text-white mb-8 text-center">
            HEIRLOOM is <span class="font-ephesis">different</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
            ].map((item) => (
              <div key={item.title} class="bg-[url('/images/white-paint-block.png')] bg-no-repeat bg-center bg-[length:100%_100%] p-6 rounded-lg">
                <h3 class="font-playfair text-xl mb-4">{item.title}</h3>
                <p class="font-opensans text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
