import { component$, Slot, useStore, useOnDocument, $, useTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { NavBar } from '~/components/NavBar/NavBar';
import { Footer } from '~/components/Footer/Footer';

// Enhanced caching strategy
export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    // Increase stale-while-revalidate time for better performance
    staleWhileRevalidate: 60 * 60 * 24 * 7, // 7 days
    // Reduce maxAge to ensure content freshness
    maxAge: 60 * 5, // 5 minutes
    // Add cache control headers
    public: true,
    immutable: false,
  });
};

export default component$(() => {
  // Optimize modal state management
  const store = useStore({
    isModalOpen: false,
    ModalComponent: null as any,
    isModalLoading: false,
    isPrefetched: false
  });

  // Handle body scroll lock more efficiently
  useTask$(({ track }) => {
    track(() => store.isModalOpen);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = store.isModalOpen ? 'hidden' : '';
    }
  });

  // Optimize keyboard event handling
  useOnDocument(
    'keydown',
    $((event: KeyboardEvent) => {
      if (event.key === 'Escape' && store.isModalOpen) {
        store.isModalOpen = false;
      }
    })
  );

  // Use intersection observer for prefetching
  useOnDocument(
    'scroll',
    $(async () => {
      if (!store.isPrefetched && typeof window !== 'undefined') {
        // Check if user has scrolled more than 25% of the page
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercentage > 25) {
          try {
            store.isPrefetched = true; // Set flag to prevent multiple prefetch attempts
            await import('~/components/LeadForm/LeadForm');
          } catch (error) {
            console.error('Failed to prefetch modal:', error);
          }
        }
      }
    })
  );

  return (
    <div class="flex flex-col min-h-screen">
      <NavBar 
        onOpenModal$={$(async () => {
          if (store.isModalOpen || store.isModalLoading) return;
          
          try {
            store.isModalLoading = true;
            if (!store.ModalComponent) {
              const module = await import('~/components/LeadForm/LeadForm');
              store.ModalComponent = module.Modal;
            }
            store.isModalOpen = true;
          } catch (error) {
            console.error('Failed to load modal:', error);
          } finally {
            store.isModalLoading = false;
          }
        })}
      />
      
      <main class="flex-grow pt-16">
        <Slot />
      </main>
      
      <Footer />
      
      {store.isModalOpen && store.ModalComponent && (
        <store.ModalComponent 
          onClose$={() => {
            store.isModalOpen = false;
          }}
        />
      )}
    </div>
  );
});
