import { component$, Slot, useStore, useContextProvider, useTask$ } from "@builder.io/qwik";
import { NavBar } from '~/components/NavBar/NavBar';
import { Footer } from '~/components/Footer/Footer';
import { GlobalStore, type GlobalStoreType } from "~/context/global";
import { Modal } from "~/components/LeadForm/LeadForm";

export default component$(() => {
  // Create and provide global store
  const globalStore = useStore<GlobalStoreType>({
    isModalOpen: false,
  });
  useContextProvider(GlobalStore, globalStore);

  // Handle body scroll lock
  useTask$(({ track }) => {
    track(() => globalStore.isModalOpen);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = globalStore.isModalOpen ? 'hidden' : '';
    }
  });

  return (
    <div class="flex flex-col min-h-screen">
      <NavBar />
      
      <main class="flex-grow pt-16">
        <Slot />
      </main>
      
      <Footer />
      
      {globalStore.isModalOpen && (
        <Modal 
          onClose$={() => {
            globalStore.isModalOpen = false;
          }}
        />
      )}
    </div>
  );
});
