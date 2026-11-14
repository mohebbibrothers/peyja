import { useEffect, useState } from 'react';
import type { DataBundle } from '../utils/types';

let cache: DataBundle | null = null;

// Resolve data URL honoring Vite's `base` (set via PEYJA_BASE at build time).
// import.meta.env.BASE_URL always reflects the configured base (or '/').
function dataUrl() {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';
  return `${base}data/products.json`;
}

export function useData() {
  const [data, setData] = useState<DataBundle | null>(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;
    let alive = true;
    (async () => {
      try {
        const res = await fetch(dataUrl(), { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as DataBundle;
        cache = json;
        if (alive) setData(json);
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'خطا');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return { data, loading, error };
}
