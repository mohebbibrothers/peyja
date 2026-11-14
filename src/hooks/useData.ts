import { useEffect, useState } from 'react';
import type { DataBundle } from '../utils/types';

let cache: DataBundle | null = null;

export function useData() {
  const [data, setData] = useState<DataBundle | null>(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/data/products.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error('خطا در بارگذاری دیتا');
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
