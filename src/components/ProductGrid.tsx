import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, Sparkles, TrendingDown, Flame, Grid3x3, LayoutList } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from '../utils/types';

type SortKey = 'smart' | 'biggest-discount' | 'biggest-savings' | 'lowest-price' | 'hottest-deal';

export default function ProductGrid({
  products,
  savedSet,
  onOpen,
  onSave,
}: {
  products: Product[];
  savedSet: Set<string>;
  onOpen: (p: Product) => void;
  onSave: (id: string) => void;
}) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('all');
  const [brand, setBrand] = useState<string>('all');
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [onlyHot, setOnlyHot] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [minDiscount, setMinDiscount] = useState(0);
  const [sort, setSort] = useState<SortKey>('smart');
  const [showFilters, setShowFilters] = useState(false);

  const cats = useMemo(() => {
    const m = new Map<string, string>();
    for (const p of products) m.set(p.category, p.categoryFa);
    return Array.from(m.entries());
  }, [products]);

  const brands = useMemo(() => {
    const s = new Set<string>();
    for (const p of products) s.add(p.brand);
    return Array.from(s).sort();
  }, [products]);

  const filtered = useMemo(() => {
    let arr = products.slice();
    if (q) {
      const nq = q.trim().toLowerCase();
      arr = arr.filter((p) =>
        (p.productName || '').toLowerCase().includes(nq) ||
        (p.brand || '').toLowerCase().includes(nq) ||
        (p.categoryFa || '').includes(nq)
      );
    }
    if (cat !== 'all') arr = arr.filter((p) => p.category === cat);
    if (brand !== 'all') arr = arr.filter((p) => p.brand === brand);
    if (onlyDeals) arr = arr.filter((p) => p.cheaper === 'instagram' && (p.discountPct || 0) >= 30);
    if (onlyHot) arr = arr.filter((p) => (p.discountPct || 0) >= 50);
    if (showSaved) arr = arr.filter((p) => savedSet.has(p.id));
    if (minDiscount > 0) arr = arr.filter((p) => (p.discountPct || 0) >= minDiscount);

    arr = arr.filter((p) => p.web); // only products with verified web price in MVP

    switch (sort) {
      case 'biggest-discount':
        arr.sort((a, b) => (b.discountPct ?? -1) - (a.discountPct ?? -1)); break;
      case 'biggest-savings':
        arr.sort((a, b) => (b.savings ?? -1) - (a.savings ?? -1)); break;
      case 'lowest-price':
        arr.sort((a, b) => (a.igPrice ?? Infinity) - (b.igPrice ?? Infinity)); break;
      case 'hottest-deal':
        arr.sort((a, b) => b.dealScore - a.dealScore); break;
      default:
        arr.sort((a, b) => b.dealScore - a.dealScore);
    }
    return arr;
  }, [products, q, cat, brand, onlyDeals, onlyHot, showSaved, minDiscount, sort, savedSet]);

  const activeFiltersCount = [
    cat !== 'all', brand !== 'all', onlyDeals, onlyHot, showSaved, minDiscount > 0
  ].filter(Boolean).length;

  return (
    <section id="products" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 chip mb-4">
              <Sparkles size={12} className="text-gold-400" />
              گالری شکارها
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl">
              محصولات <span className="gradient-text">شکارشده</span>
            </h2>
            <p className="mt-2 text-white/60">
              {filtered.length.toLocaleString('fa-IR')} کالا با قیمت مقایسه‌شده
            </p>
          </div>
        </div>

        {/* Search + filter bar */}
        <div className="glass p-3 mb-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="جست‌وجوی برند، محصول، دسته…"
                className="w-full bg-white/5 border border-white/10 rounded-xl pr-10 pl-3 py-2.5 text-sm focus:outline-none focus:border-rose-hot/40 placeholder:text-white/40"
              />
              {q && (
                <button onClick={() => setQ('')} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`btn-ghost !px-4 !py-2.5 ${showFilters ? '!bg-white/10' : ''} relative`}
            >
              <SlidersHorizontal size={14} />
              فیلترها
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-rose-hot text-[10px] font-bold flex items-center justify-center text-midnight-950">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-white/10 grid md:grid-cols-4 gap-3 text-sm">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-white/60">دسته‌بندی</span>
                    <select
                      value={cat}
                      onChange={(e) => setCat(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-rose-hot/40"
                    >
                      <option value="all">همه دسته‌ها</option>
                      {cats.map(([k, fa]) => <option key={k} value={k}>{fa}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-white/60">برند</span>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-rose-hot/40"
                    >
                      <option value="all">همه برندها</option>
                      {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-white/60">مرتب‌سازی</span>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortKey)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-rose-hot/40"
                    >
                      <option value="smart">هوشمند پیجا</option>
                      <option value="biggest-discount">بیشترین درصد تخفیف</option>
                      <option value="biggest-savings">بیشترین پس‌انداز تومانی</option>
                      <option value="hottest-deal">داغ‌ترین شکار (Deal Score)</option>
                      <option value="lowest-price">ارزان‌ترین‌ها</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-white/60">حداقل درصد ارزانی: <span className="num text-jade">٪{minDiscount}</span></span>
                    <input
                      type="range" min={0} max={80} step={10}
                      value={minDiscount}
                      onChange={(e) => setMinDiscount(Number(e.target.value))}
                      className="accent-rose-hot"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-2 pt-3">
                  <Toggle active={onlyDeals} onClick={() => setOnlyDeals((v) => !v)} icon={<TrendingDown size={12} />}>
                    فقط پیشنهادهای ویژه (≥٪۳۰)
                  </Toggle>
                  <Toggle active={onlyHot} onClick={() => setOnlyHot((v) => !v)} icon={<Flame size={12} />}>
                    شگفت‌انگیزها (≥٪۵۰)
                  </Toggle>
                  <Toggle active={showSaved} onClick={() => setShowSaved((v) => !v)} icon={<Grid3x3 size={12} />}>
                    فقط علاقه‌مندی‌ها
                  </Toggle>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={() => { setCat('all'); setBrand('all'); setOnlyDeals(false); setOnlyHot(false); setShowSaved(false); setMinDiscount(0); setQ(''); }}
                      className="chip hover:bg-white/10"
                    >
                      <X size={12} />
                      پاک کردن فیلترها
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="glass p-16 text-center">
            <LayoutList size={40} className="mx-auto text-white/30 mb-3" />
            <h3 className="font-bold text-lg">هیچ کالایی با این فیلتر پیدا نشد</h3>
            <p className="text-white/50 text-sm mt-1">فیلترها رو تغییر بده یا یه جست‌وجوی دیگه امتحان کن.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} saved={savedSet.has(p.id)} onOpen={onOpen} onSave={() => onSave(p.id)} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

function Toggle({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition ${
        active ? 'bg-rose-hot/20 border-rose-hot/40 text-rose-glow' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
