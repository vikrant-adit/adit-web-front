/* eslint-disable react-hooks/static-components */
'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getModalById } from './modalRegistry';

type ModalData = { id: string; props?: any } | null;

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalData, setModalData] = useState<ModalData>(null);

  useEffect(() => {
    const handler = (e: any) => {
      const d = e?.detail;

      if (!d) {
        // nothing useful
        return;
      }

      // support simple string: event.detail === "leadForm"
      if (typeof d === 'string') {
        setModalData({ id: d, props: undefined });
        return;
      }

      // support { id, props } or { modalId, props } or raw { modalId: 'x', ... }
      if (typeof d === 'object') {
        const id = d.id || d.modalId || d.modal || null;
        const props = d.props ?? (id ? (() => {
          // If object contains more keys besides id/modalId, forward them as props
          const copy = { ...d };
          delete copy.id;
          delete copy.modalId;
          delete copy.modal;
          delete copy.props;
          return Object.keys(copy).length ? copy : undefined;
        })() : undefined);

        if (!id) {
          console.warn('[ModalProvider] open-modal event missing id/modalId:', d);
          return;
        }

        setModalData({ id, props });
        return;
      }

      console.warn('[ModalProvider] unsupported open-modal payload:', d);
    };

    window.addEventListener('open-modal', handler);
    return () => window.removeEventListener('open-modal', handler);
  }, []);

  // lock scroll and mark app root as hidden for screen readers while modal is open
  useEffect(() => {
    const root = typeof document !== 'undefined' ? document.getElementById('__next') || document.body : null;
    if (modalData) {
      // lock scroll
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // mark root as hidden for screen readers
      if (root) root.setAttribute('aria-hidden', 'true');

      return () => {
        document.body.style.overflow = prevOverflow;
        if (root) root.removeAttribute('aria-hidden');
      };
    }
    return;
  }, [modalData]);

  const close = () => setModalData(null);

  const ModalComp = modalData?.id ? getModalById(modalData.id) : null;

  // render modal into body so it appears above everything
  const portalTarget =
    typeof document !== 'undefined' ? document.getElementById('__next') || document.body : null;

  const modalElement = ModalComp ? (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0"
      style={{ zIndex: 2147483647 /* ensure it's above anything */ }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <div className="relative max-w-3xl mx-auto my-6 rounded p-6 z-10">
        <ModalComp onClose={close} {...(modalData?.props || {})} />
      </div>
    </div>
  ) : modalData ? (
    // friendly fallback rendered in portal
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 2147483647 }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <div className="relative bg-white rounded p-6 z-10 max-w-lg w-full">
        <h3 className="text-lg font-semibold">Modal not found</h3>
        <p className="text-sm text-gray-600 mt-2">
          No registered modal with id: <strong>{modalData.id}</strong>
        </p>
        {modalData.props && (
          <>
            <p className="mt-2 text-xs text-gray-500">Props passed:</p>
            <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(modalData.props, null, 2)}
            </pre>
          </>
        )}
        <div className="mt-4 text-right">
          <button onClick={close} className="px-3 py-1 bg-gray-200 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* render app children normally */}
      {children}

      {/* render modal in portal so it's always above other elements */}
      {portalTarget && modalElement ? createPortal(modalElement, portalTarget) : modalElement}
    </>
  );
}
