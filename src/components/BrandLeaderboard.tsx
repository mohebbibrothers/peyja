import { motion } from 'framer-motion';
import { Trophy, TrendingDown, Crown } from 'lucide-react';
import { toman, pct } from '../utils/format';
import type { BrandStat } from '../utils/types';

export default function BrandLeaderboard({ brands }: { brands: BrandStat[] }) {
  const top = brands.slice(0, 10);
  const max = top[0]?.totalSavings || 1;

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <section id="brands" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 chip mb-4">
            <Trophy size={12} className="text-gold-400" />
            لیدربرد برندها
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl"
          >
            کدام <span className="gradient-text">برندها</span> در اینستاگرام واقعاً ارزان‌ترند؟
          </motion.h2>
          <p className="mt-4 text-white/60">
            ده برند برتر بر اساس مجموع پس‌انداز نسبت به قیمت وب.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {top.map((b, i) => (
            <motion.div
              key={b.brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`glass p-5 relative overflow-hidden group hover:border-white/20 transition ${i === 0 ? 'ring-1 ring-gold-400/30 lg:col-span-1' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-xl ${
                    i === 0 ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30' :
                    i === 1 ? 'bg-white/20 text-white/80 border border-white/20' :
                    i === 2 ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                    'bg-white/5 text-white/60 border border-white/10'
                  }`}>
                    {medals[i] || i + 1}
                  </div>
                  <div>
                    <div className="font-bold">{b.brand}</div>
                    <div className="text-[11px] text-white/50">{b.count.toLocaleString('fa-IR')} محصول مقایسه‌شده</div>
                  </div>
                </div>
                {b.avgDiscount >= 50 && (
                  <span className="chip-hot !px-2 !py-0.5 text-[10px]">🔥 HOT</span>
                )}
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-white/50 flex items-center gap-1">
                    <TrendingDown size={12} className="text-jade" />
                    مجموع پس‌انداز
                  </span>
                  <span className="num font-bold text-jade">{toman(b.totalSavings)}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(100, (b.totalSavings / max) * 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-l from-gold-400 via-rose-hot to-violet-deep"
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-[11px] text-white/50">
                  <span>میانگین ارزانی</span>
                  <span className="num font-bold text-gold-400">٪{b.avgDiscount}</span>
                </div>
              </div>

              {i === 0 && (
                <div className="absolute top-2 left-2">
                  <Crown size={14} className="text-gold-400 animate-float" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
