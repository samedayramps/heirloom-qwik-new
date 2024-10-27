import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Footer = component$(() => {
  return (
    <footer class="relative bg-[#2d2d2d] text-[#faf9f6] py-16">
      {/* Texture Overlay */}
      <div 
        class="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: 'url(/images/9-texture.webp)',
          backgroundRepeat: 'repeat',
          backgroundSize: '500px',
        }}
      ></div>

      {/* Content */}
      <div class="container relative z-10">
        {/* Logo */}
        <div class="flex justify-center mb-12">
          <img 
            src="/images/logo.svg" 
            alt="Heirloom Wedding Films" 
            class="h-12"
          />
        </div>

        {/* Social Links */}
        <div class="flex justify-center space-x-8 mb-12">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            class="opacity-70 hover:opacity-100 transition-opacity"
          >
            <img 
              src="/images/twitter.svg" 
              alt="Twitter" 
              class="h-6 w-6"
            />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            class="opacity-70 hover:opacity-100 transition-opacity"
          >
            <img 
              src="/images/youtube.svg" 
              alt="YouTube" 
              class="h-6 w-6"
            />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            class="opacity-70 hover:opacity-100 transition-opacity"
          >
            <img 
              src="/images/facebook.svg" 
              alt="Facebook" 
              class="h-6 w-6"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <div class="flex justify-center space-x-6 mb-12">
          <Link href="/about" class="opacity-70 hover:opacity-100 transition-opacity">
            About
          </Link>
          <Link href="/films" class="opacity-70 hover:opacity-100 transition-opacity">
            Films
          </Link>
          <Link href="/blog" class="opacity-70 hover:opacity-100 transition-opacity">
            Blog
          </Link>
        </div>

        {/* Copyright */}
        <div class="text-center opacity-70">
          <p>© {new Date().getFullYear()} Heirloom Wedding Films. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});
