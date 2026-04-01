import React from 'react';

type ModalComponent = React.FC<{ onClose?: () => void }>;
const registry: Record<string, ModalComponent> = {};

/** register in runtime (devs) */
export function registerModal(id: string, comp: ModalComponent) {
  registry[id] = comp;
}

/** get modal component (used by ModalProvider) */
export function getModalById(id: string): ModalComponent | null {
  return registry[id] ?? null;
}
