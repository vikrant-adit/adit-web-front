// src/components/actionRegistry.ts
export type ActionParams = any;
export type ActionCtx = {
  router?: { push: (path: string) => void };
  openModal?: (id: string) => void;
  track?: (event: string, props?: any) => void;
};

const registry: Record<string, (params: ActionParams, ctx: ActionCtx) => void | Promise<void>> = {
  none: () => {},

 // actionRegistry.ts (openModal handler)
openModal: (params, ctx) => {
  // support: params = "leadForm"  OR  params = { modalId: "leadForm", props: { ... } }
  let modalId: string | undefined;
  let props: any = undefined;

  if (!params) {
    console.warn('[action] openModal called without params');
    return;
  }

  if (typeof params === 'string') {
    modalId = params;
  } else if (typeof params === 'object') {
    modalId = params.modalId || params.id || params.modal || undefined;
    props = params.props || params;
  }

  if (!modalId) {
    console.warn('[action] openModal missing modalId (params)', params);
    return;
  }

  // Prefer ctx.openModal if provided (for testability); else dispatch event
  if (ctx?.openModal) {
    ctx.openModal(modalId);
    return;
  }

  window.dispatchEvent(
    new CustomEvent('open-modal', {
      detail: { id: modalId, props },
    })
  );
},


  navigate: (params, ctx) => {
    const url = typeof params === "string" ? params : params?.url;
    if (!url) return console.warn("[action] navigate missing url");
    if (ctx.router?.push) ctx.router.push(url);
    else window.location.assign(url);
  },

  external: (params) => {
    const url = typeof params === "string" ? params : params?.url;
    if (!url) return console.warn("[action] external missing url");
    const newTab = (typeof params === "object" && params?.newTab) || true;
    window.open(url, newTab ? "_blank" : "_self", "noopener,noreferrer");
  },

  scrollTo: (params) => {
    const id = typeof params === "string" ? params : params?.anchorId;
    if (!id) return console.warn("[action] scrollTo missing anchorId");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

export function runAction(name: string | undefined | null, params: ActionParams | undefined | null, ctx: ActionCtx = {}) {
  if (!name) return;
  const fn = registry[name];
  if (!fn) return console.warn("[action] unknown action:", name);
  try { return fn(params, ctx); } catch (err) { console.error("[action] error", err); }
}

// Optionally export registry/manifest for admin sync
export const actionNames = Object.keys(registry);
