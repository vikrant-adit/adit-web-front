/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGlobalComponent } from './getGlobalComponent';

type GlobalMap = Record<string, any>;

export async function resolveGlobalRefs(pageBuilderData: any) {
  if (!pageBuilderData) return pageBuilderData;

  // 1️⃣ Collect all unique global keys
  const keys = new Set<string>();

  function collect(node: any) {
    if (!node) return;

    if (Array.isArray(node)) {
      node.forEach(collect);
      return;
    }

    if (
      node.props?.isGlobal === true ||
      node.props?.isGlobal === 'true'
    ) {
      if (node.props.globalKey) {
        keys.add(node.props.globalKey);
      }
    }

    if (node.globalRef) {
      keys.add(node.globalRef);
    }

    if (node.content) collect(node.content);

    if (node.zones) {
      Object.values(node.zones).forEach(collect);
    }
  }

  collect(pageBuilderData);

  if (keys.size === 0) return pageBuilderData;

  // 2️⃣ Batch fetch globals (ONE API CALL)
  const globalsArr = await getGlobalComponent([...keys]);

  const globals: GlobalMap = {};
  globalsArr.forEach((g: any) => {
    const key = g?.key || g?.attributes?.key;
    if (key) {
      globals[key] = g?.data || g?.attributes || g;
    }
  });

  // 3️⃣ Resolve & REPLACE props
  function resolve(node: any): any {
  if (!node) return node;

  if (Array.isArray(node)) {
    return node.map((n, i) => resolve({
      ...n,
      __reactKey: n.id ?? n.uid ?? n.__reactKey ?? `idx-${i}`,
    }));
  }

  // ✅ isGlobal + globalKey
  if (
    node.props?.isGlobal === true ||
    node.props?.isGlobal === 'true'
  ) {
    const key = node.props.globalKey;
    const globalData = globals[key];
    if (!globalData) return node;

    return {
      ...node,
      // 🔒 PRESERVE identity
      id: node.id,
      uid: node.uid,
      __reactKey: node.__reactKey ?? node.id ?? node.uid,

      props: {
        ...globalData,
        globalKey: key,
        isGlobal: true,
        __isFromGlobal: true,
      },
    };
  }

  // ✅ globalRef
  if (node.globalRef) {
    const globalData = globals[node.globalRef];
    if (!globalData) return node;

    return {
      ...node,
      id: node.id,
      uid: node.uid,
      __reactKey: node.__reactKey ?? node.id ?? node.uid,

      props: {
        ...globalData,
        __isFromGlobal: true,
      },
    };
  }

  const out = {
    ...node,
    __reactKey: node.__reactKey ?? node.id ?? node.uid,
  };

  if (out.content) {
    out.content = resolve(out.content);
  }

  if (out.zones) {
    out.zones = Object.fromEntries(
      Object.entries(out.zones).map(([k, v]) => [
        k,
        resolve(v),
      ])
    );
  }

  return out;
}


  return resolve(pageBuilderData);
}
