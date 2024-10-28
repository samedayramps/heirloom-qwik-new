import { createContextId } from "@builder.io/qwik";

export interface GlobalStoreType {
  isModalOpen: boolean;
}

export const GlobalStore = createContextId<GlobalStoreType>("global-store");
