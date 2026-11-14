import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, ExternalLink, Instagram, TrendingDown, Sparkles } from 'lucide-react';
import { toman, pct } from '../utils/format';
import type { Product } from '../utils/types';

const GRADIENTS = [
  'from-rose-hot via-gold-400 to-violet-deep',
  'from-violet-deep via-rose-hot to-gold-400',
  'from-jade via-teal-400 to-violet-glow',
  'from-gold-400 via-rose-hot to-fuchsia-600',
  'from-sky-400 via-violet-glow to-rose-hot',
  'from-amber-400 via-rose-hot to-purple-600',
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h) + s.charCodeAt(i) | 0;
  return Math.abs(h);
}

export default function ProductCard({
  p,
  saved,
  onOpen,
  onSave,
}: {
  p: Product;
  saved: boolean;
  onOpen: (p: Product) => void;
  onSave: () => void;
}) {
  const g = GRADIENTS[hash(p.id) % GRADIENTS.length];
  const hasDeal = p.discountPct && p.cheaper === 'instagram';
  const isHot = p.discountPct && p.discountPct >= 50;
  const initials = (p.brand || '?').slice(0, 2);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className={`group relative glass overflow-hidden hover:border-white/20 transition cursor-pointer flex flex-col ${isHot ? 'ring-1 ring-rose-hot/30' : ''}`}
      onClick={() => onOpen(p)}
    >
      {/* Art */}
      <div className="relative h-36 overflow-hidden">
        {p.evidenceImage ? (
          <img
            src={p.evidenceImage}
            alt={p.productName}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : null}
        <div className={`absolute inset-0 bg-gradient-to-br ${g} opacity-80 mix-blend-overlay`} />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-black text-5xl text-white/20 select-none">{initials}</span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-start">
          {isHot && <span className="chip-hot">🔥 شگفت‌انگیز</span>}
          {hasDeal && !isHot && <span className="chip bg-jade/20 border-jade/30 text-jade"><TrendingDown size={11} /> ارزان‌تر</span>}
          {p.cheaper === 'web' && <span className="chip bg-white/10 text-white/70">وب ارزان‌تر</span>}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onSave(); }}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition"
          title={saved ? 'حذف از علاقه‌مندی' : 'افزودن به علاقه‌مندی'}
        >
          {saved ? <BookmarkCheck size={15} className="text-gold-400" /> : <Bookmark size={15} />}
        </button>

        {/* Deal score */}
        {p.dealScore > 0 && (
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <div className="text-[10px] text-white/70">امتیاز شکار پیجا</div>
              <div className="flex items-baseline gap-1">
                <span className="num font-black text-2xl text-white">{p.dealScore}</span>
                <span className="text-[10px] text-white/70">از ۱۰۰</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-[10px] text-white/70">ارزان‌تر</div>
              {hasDeal ? (
                <span className="num font-black text-2xl text-jade">٪{p.discountPct}</span>
              ) : <span className="text-white/40 text-sm">—</span>}
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="chip !px-2 !py-0 text-[10px]">{p.categoryFa}</span>
            {p.volume && <span className="text-[11px] text-white/40">{p.volume}</span>}
          </div>
          <h3 className="font-bold text-white leading-tight line-clamp-2 min-h-[2.5em]">
            {p.productName}
          </h3>
          <div className="text-xs text-white/50 mt-1">{p.brand}</div>
        </div>

        {p.web ? (
          <div className="mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] text-white/50 line-through num">{toman(p.web.price)}</span>
            </div>
            <div className="flex items-baseline justify-between gap-2 mt-0.5">
              <div>
                <div className="num font-black text-xl gradient-text leading-none">{toman(p.igPrice)}</div>
                <div className="text-[10px] text-white/50 mt-0.5">خرید از اینستاگرام</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); window.open(p.postUrl, '_blank'); }}
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-l from-gold-400 via-rose-hot to-violet-deep text-midnight-950 hover:brightness-110 transition"
              >
                <Instagram size={12} />
                خرید
                <ExternalLink size={10} />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-auto text-xs text-white/50">قیمت اینستاگرام: {p.igDisplay || '—'}</div>
        )}
      </div>

      {isHot && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 -right-8 rotate-45 bg-gradient-to-r from-rose-hot/90 to-gold-400/90 text-[9px] font-black text-midnight-950 px-10 py-0.5 shadow-lg">
            PEYJA PICK
          </div>
        </div>
      )}
    </motion.div>
  );
}
