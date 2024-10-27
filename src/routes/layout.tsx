import { component$, Slot, useStore, useOnDocument, $, useTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { NavBar } from '~/components/NavBar/NavBar';
import { Footer } from '~/components/Footer/Footer';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  const store = useStore({
    isModalOpen: false,
    ModalComponent: null as any,
  });

  useTask$(({ track }) => {
    track(() => store.isModalOpen);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = store.isModalOpen ? 'hidden' : '';
    }
  });

  useOnDocument(
    'keydown',
    $((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        store.isModalOpen = false;
      }
    })
  );

  return (
    <div class="flex flex-col min-h-screen">
      <NavBar 
        onOpenModal$={$(async () => {
          if (!store.ModalComponent) {
            const module = await import('~/components/LeadForm/LeadForm');
            store.ModalComponent = module.Modal;
          }
          store.isModalOpen = true;
        })}
      />
      <main class="flex-grow pt-16">
        <Slot />
      </main>
      <Footer />
      {store.isModalOpen && store.ModalComponent && (
        <store.ModalComponent 
          onClose$={() => store.isModalOpen = false}
        />
      )}
    </div>
  );
});
