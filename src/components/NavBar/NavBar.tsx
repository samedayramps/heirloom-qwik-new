import { component$, useSignal, useOnDocument, $, useComputed$, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import LogoSvg from '~/media/images/logo.svg?jsx';
import LogoMobileSvg from '~/media/images/logo-mobile.svg?jsx';
import { GlobalStore } from '~/context/global';

interface NavLink {
  href: string;
  text: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/about', text: 'About' },
  { href: '/films', text: 'Films' },
  { href: '/blog', text: 'Blog' },
];

// Remove NavBarProps interface since we're using global store
export const NavBar = component$(() => {
  const isMenuOpen = useSignal(false);
  const isScrolled = useSignal(false);
  const globalStore = useContext(GlobalStore);

  useOnDocument(
    'scroll',
    $(() => {
      requestAnimationFrame(() => {
        isScrolled.value = window.scrollY > 50;
      });
    })
  );

  const mainNavClasses = useComputed$(() => ({
    'fixed w-full z-50 transition-all duration-700 ease-in-out transform': true,
    'px-4 mt-4': isScrolled.value
  }));

  const containerClasses = useComputed$(() => ({
    'transition-all duration-700 ease-in-out transform': true,
    'bg-[#2d2d2d] rounded-full shadow-lg': isScrolled.value,
    'bg-[#2d2d2d]': !isScrolled.value
  }));

  const innerContainerClasses = useComputed$(() => ({
    'transition-all duration-700 ease-in-out': true,
    'px-4 sm:px-6 lg:px-8': !isScrolled.value,
    'px-6': isScrolled.value
  }));

  // Handler for opening modal using global store
  const handleOpenModal = $(() => {
    globalStore.isModalOpen = true;
  });

  return (
    <nav class={mainNavClasses.value}>
      <div class={containerClasses.value}>
        <div class={innerContainerClasses.value}>
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
                <LogoSvg class="hidden md:block h-8 w-auto" />
                <LogoMobileSvg class="block md:hidden h-8 w-auto" />
              </Link>

              <div class="hidden md:block">
                <div class="ml-6 flex items-baseline space-x-4">
                  {NAV_LINKS.map((link) => (
                    <Link 
                      key={link.href} 
                      class="nav-link transition-colors duration-300" 
                      href={link.href}
                      prefetch
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Let's Talk button */}
            <button
              onClick$={handleOpenModal}
              class={{
                'talk-button': true,
                'md:px-6': true,
                'px-4': true,
                'transition-all': true,
                'duration-300': true
              }}
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div 
        class={{
          'md:hidden container mt-4 transition-all duration-500 ease-in-out transform': true,
          'opacity-100 translate-y-0': isMenuOpen.value,
          'opacity-0 -translate-y-4 pointer-events-none': !isMenuOpen.value
        }}
      >
        <div class="bg-[#2d2d2d] rounded-2xl shadow-lg overflow-hidden">
          <div class="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href}
                class="nav-link block w-full text-left transition-colors duration-300" 
                href={link.href}
                prefetch
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
