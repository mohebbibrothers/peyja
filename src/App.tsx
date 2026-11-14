import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import StatsRibbon from './components/StatsRibbon';
import WhyPeyja from './components/WhyPeyja';
import SavingsCalculator from './components/SavingsCalculator';
import CategoryChart from './components/CategoryChart';
import BrandLeaderboard from './components/BrandLeaderboard';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Footer from './components/Footer';
import { useData } from './hooks/useData';
import type { Product } from './utils/types';

export default function App() {
  const { data, loading, error } = useData();
  const [active, setActive] = useState<Product | null>(null);
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem('peyja:watchlist');
      if (raw) setSavedSet(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('peyja:watchlist', JSON.stringify(Array.from(savedSet)));
    } catch {}
  }, [savedSet]);

  const toggleSave = (id: string) => {
    setSavedSet((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const comparable = useMemo(
    () => data?.products.filter((p) => p.igPrice && p.web) ?? [],
    [data]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-rose-hot animate-spin" />
          <p className="text-white/60 text-sm">در حال بارگذاری پیجا…</p>
        </div>
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-strong p-8 text-center">
          <p className="text-rose-hot font-bold text-lg mb-2">خطا در بارگذاری داده‌ها</p>
          <p className="text-white/60 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-x-0 top-0 h-[800px] bg-radial-hero pointer-events-none" />
      <div className="absolute inset-0 bg-grid-faint bg-grid opacity-30 pointer-events-none" style={{ maskImage: 'linear-gradient(180deg, black 0%, transparent 40%)' }} />

      <Nav stats={data.meta} savedCount={savedSet.size} />

      <main className="relative z-10">
        <Hero meta={data.meta} />
        <StatsRibbon meta={data.meta} />
        <WhyPeyja />
        <SavingsCalculator products={comparable} />
        <CategoryChart categories={data.categories} />
        <BrandLeaderboard brands={data.brands} />
        <ProductGrid
          products={data.products}
          savedSet={savedSet}
          onOpen={setActive}
          onSave={toggleSave}
        />
      </main>

      <Footer />

      <AnimatePresence>
        {active && (
          <ProductModal
            product={active}
            saved={savedSet.has(active.id)}
            onClose={() => setActive(null)}
            onSave={() => toggleSave(active.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
