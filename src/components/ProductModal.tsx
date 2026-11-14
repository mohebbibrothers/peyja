import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, ExternalLink, Bookmark, BookmarkCheck, TrendingDown, Shield, Store, Sparkles, Award, Link as LinkIcon } from 'lucide-react';
import { toman, pct } from '../utils/format';
import type { Product } from '../utils/types';

export default function ProductModal({
  product,
  saved,
  onClose,
  onSave,
}: {
  product: Product;
  saved: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const w = product.web;
  const webPrice = w?.price;
  const igPrice = product.igPrice;
  const discount = product.discountPct;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-midnight-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-3xl glass-strong overflow-hidden shadow-glow rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center hover:bg-black/60 transition"
        >
          <X size={16} />
        </button>

        {/* Hero banner */}
        <div className="relative h-44 sm:h-56 overflow-hidden">
          {product.evidenceImage && (
            <img src={product.evidenceImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" onError={(e) => {(e.target as HTMLImageElement).style.display='none';}} />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-hot/30 via-violet-deep/30 to-gold-400/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-900/30 to-transparent" />

          <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="chip bg-black/30 border-white/10">{product.categoryFa}</span>
                {product.volume && <span className="chip bg-black/30 border-white/10">{product.volume}</span>}
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl leading-tight">{product.productName}</h2>
              <div className="text-white/70 text-sm mt-1">{product.brand} · فروشنده: {product.ownerTitle}</div>
            </div>
            {discount !== null && (
              <div className="shrink-0 text-center glass px-3 py-2">
                <div className="text-[10px] text-white/60">ارزان‌تر از وب</div>
                <div className="num font-black text-3xl text-jade">٪{discount}</div>
              </div>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Price comparison */}
          {w && webPrice && igPrice ? (
            <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
              <div className="glass p-4">
                <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                  <Store size={12} />
                  وب (میانگین قیمت فروشگاه‌ها)
                </div>
                <div className="num font-bold text-xl text-white/60 line-through">{toman(webPrice)}</div>
                <div className="text-[11px] text-white/40 mt-1 truncate">از {w.source}</div>
              </div>

              <div className="hidden sm:flex items-center justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full bg-jade/20 border border-jade/40 flex items-center justify-center">
                    <TrendingDown size={22} className="text-jade" />
                  </div>
                  <div className="text-[10px] text-jade font-bold">پس‌انداز</div>
                  <div className="num font-black text-jade text-lg">{toman(product.savings)}</div>
                </div>
              </div>

              <div className="relative glass p-4 ring-1 ring-rose-hot/40 bg-gradient-to-br from-rose-hot/10 to-gold-40/10">
                <div className="absolute top-2 left-2 chip-hot !text-[9px]">
                  <Sparkles size={9} />
                  پیشنهاد پیجا
                </div>
                <div className="flex items-center gap-2 text-rose-glow text-xs mb-1 mt-2">
                  <Instagram size={12} />
                  قیمت اینستاگرام
                </div>
                <div className="num font-black text-2xl gradient-text">{toman(igPrice)}</div>
                <div className="text-[11px] text-white/60 mt-1">خرید مستقیم از @{product.ownerUsername}</div>
              </div>
            </div>
          ) : (
            <div className="glass p-4 text-center text-white/60">قیمت وب این محصول هنوز استخراج نشده.</div>
          )}

          {/* Deal score */}
          {product.dealScore > 0 && (
            <div className="glass p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-gold-400" />
                  <span className="font-bold">امتیاز شکار پیجا</span>
                </div>
                <span className="num font-black text-xl gradient-text">{product.dealScore}/۱۰۰</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${product.dealScore}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-l from-gold-400 via-rose-hot to-violet-deep"
                />
              </div>
              <div className="mt-2 text-xs text-white/60">{product.dealLabel}</div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <a
              href={product.postUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary flex-1 min-w-[200px] justify-center"
            >
              <Instagram size={18} />
              ورود به پست اینستاگرام و خرید
              <ExternalLink size={14} />
            </a>
            {w && (
              <a
                href={w.url}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <LinkIcon size={14} />
                مشاهده قیمت وب
              </a>
            )}
            <button onClick={onSave} className="btn-ghost">
              {saved ? <BookmarkCheck size={16} className="text-gold-400" /> : <Bookmark size={16} />}
              {saved ? 'ذخیره‌شده' : 'ذخیره'}
            </button>
          </div>

          {/* Meta */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <MetaItem icon={<Shield size={12} />} label="منبع قیمت وب" value={w?.source || '—'} />
            <MetaItem icon={<Store size={12} />} label="درجه اطمینان تطابق" value={confidence(w?.matchConfidence)} />
            <MetaItem icon={<Award size={12} />} label="دسته" value={product.categoryFa} />
            <MetaItem icon={<Sparkles size={12} />} label="فروشنده" value={'@' + product.ownerUsername} />
          </div>

          {w?.note && (
            <div className="p-3 rounded-xl bg-gold-400/5 border border-gold-400/20 text-xs text-white/70 leading-relaxed">
              💡 {w.note}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-white/50 mb-1">{icon}{label}</div>
      <div className="font-semibold truncate">{value}</div>
    </div>
  );
}

function confidence(c?: string) {
  if (c === 'high') return 'بالا ⭐⭐⭐';
  if (c === 'medium') return 'متوسط ⭐⭐';
  if (c === 'low') return 'نسبی ⭐';
  return '—';
}
