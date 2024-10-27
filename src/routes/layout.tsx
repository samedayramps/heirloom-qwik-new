import { component$, Slot, useStore, useOnDocument, $ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { NavBar } from '~/components/NavBar/NavBar';

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
      <main class="flex-grow pt-16"> {/* Added pt-16 to account for navbar height */}
        <Slot />
      </main>
      {store.isModalOpen && store.ModalComponent && (
        <store.ModalComponent 
          onClose$={() => store.isModalOpen = false}
        />
      )}
    </div>
  );
});
