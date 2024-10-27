import ImgLogo from '~/media/images/logo.svg?jsx';
import { component$, useSignal, type QRL, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

interface NavLink {
  href: string;
  text: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/about', text: 'About' },
  { href: '/films', text: 'Films' },
  { href: '/blog', text: 'Blog' },
];

export interface NavBarProps {
  onOpenModal$: QRL<() => void>;
}

export const NavBar = component$<NavBarProps>(({ onOpenModal$ }) => {
  const isMenuOpen = useSignal(false);
  const isScrolled = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          isScrolled.value = window.scrollY > 50;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <nav class="fixed w-full z-50">
      {/* Main navbar */}
      <div class={[
        'transition-all duration-700 ease-in-out transform',
        isScrolled.value ? 'px-4 mt-4' : ''
      ]}>
        <div class={[
          'bg-[#2d2d2d] transition-all duration-700 ease-in-out transform',
          isScrolled.value ? 'container rounded-full shadow-lg' : ''
        ]}>
          <div class={[
            'transition-all duration-700 ease-in-out',
            isScrolled.value ? '' : 'px-4 sm:px-6 lg:px-8'
          ]}>
            <div class="flex items-center justify-between h-16">
              {/* Left side: Hamburger menu and Logo */}
              <div class="flex items-center space-x-4">
                <button
                  onClick$={() => isMenuOpen.value = !isMenuOpen.value}
                  class="inline-flex md:hidden items-center justify-center p-2 rounded-md text-[#faf9f6] hover:bg-gray-700 focus:outline-none transition-colors duration-300"
                  aria-label="Toggle menu"
                >
                  <svg 
                    class="h-6 w-6 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d={isMenuOpen.value ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </button>

                <Link href="/" class="flex-shrink-0">
                  <ImgLogo 
                    class="h-8 w-auto" 
                    role="img"
                  >
                    <title>Heirloom Wedding Films Logo</title>
                  </ImgLogo>
                </Link>

                <div class="hidden md:block">
                  <div class="ml-6 flex items-baseline space-x-4">
                    {NAV_LINKS.map((link) => (
                      <Link 
                        key={link.href} 
                        class="nav-link transition-colors duration-300" 
                        href={link.href}
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side: Let's Talk button */}
              <button
                onClick$={onOpenModal$}
                class={[
                  'talk-button',
                  'md:px-6 px-4',
                  'transition-all duration-300'
                ]}
              >
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div 
        class={[
          'md:hidden container mt-4 transition-all duration-500 ease-in-out transform',
          isMenuOpen.value ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        ]}
      >
        <div class="bg-[#2d2d2d] rounded-2xl shadow-lg overflow-hidden">
          <div class="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href}
                class="nav-link block w-full text-left transition-colors duration-300" 
                href={link.href}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
});