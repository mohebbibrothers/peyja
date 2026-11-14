import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Sparkles, PiggyBank, ShoppingBasket } from 'lucide-react';
import { toman } from '../utils/format';
import type { Product } from '../utils/types';

export default function SavingsCalculator({ products }: { products: Product[] }) {
  const [spend, setSpend] = useState(2_000_000);

  const avgDiscount = useMemo(() => {
    if (!products.length) return 0;
    const totalIg = products.reduce((s, p) => s + (p.igPrice || 0), 0);
    const totalWeb = products.reduce((s, p) => s + (p.web?.price || 0), 0);
    return totalWeb ? (totalWeb - totalIg) / totalWeb : 0;
  }, [products]);

  const savings = Math.round(spend * avgDiscount);
  const annualSavings = savings * 12;

  return (
    <section id="savings" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 chip mb-4">
              <PiggyBank size={12} className="text-jade" />
              ماشین‌حساب پس‌انداز
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl leading-tight">
              چقدر <span className="gradient-text">پول</span> توی جیبت می‌مونه؟
            </h2>
            <p className="mt-4 text-white/60 text-lg leading-relaxed">
              اسلایدر رو بکش و ببین اگه لوازم آرایشی و بهداشتی ماهانه‌ات را
              از فروشنده‌های راستین اینستاگرام بگیری، یک سال چقدر پس‌انداز می‌کنی.
            </p>

            <div className="mt-8 glass p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-white/70 flex items-center gap-2">
                  <Wallet size={16} className="text-gold-400" />
                  هزینه ماهانه لوازم آرایشی/بهداشتی
                </label>
                <span className="num font-bold text-lg gradient-text">{toman(spend)}</span>
              </div>
              <input
                type="range"
                min={500_000}
                max={10_000_000}
                step={100_000}
                value={spend}
                onChange={(e) => setSpend(Number(e.target.value))}
                className="w-full accent-rose-hot"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1">
                <span>۵۰۰ هزار</span>
                <span>۵ میلیون</span>
                <span>۱۰ میلیون</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gold-rose opacity-20 blur-3xl rounded-[2.5rem]" />
            <div className="relative glass-strong p-8 shadow-glow noise">
              <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                <Sparkles size={14} className="text-gold-400" />
                بر اساس {products.length.toLocaleString('fa-IR')} قیمت مقایسه‌شده واقعی
              </div>
              <div className="font-display text-3xl font-black text-white mb-6">
                پس‌انداز <span className="gradient-text">ماهانه</span> و <span className="gradient-text">سالانه</span> شما
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="glass p-5">
                  <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
                    <ShoppingBasket size={14} />
                    هر ماه
                  </div>
                  <motion.div
                    key={'m' + savings}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="num font-black text-3xl text-jade"
                  >
                    {toman(savings)}
                  </motion.div>
                </div>
                <div className="glass p-5 ring-1 ring-gold-400/30">
                  <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
                    <PiggyBank size={14} className="text-gold-400" />
                    هر سال
                  </div>
                  <motion.div
                    key={'y' + annualSavings}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="num font-black text-3xl gradient-text"
                  >
                    {toman(annualSavings)}
                  </motion.div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70">
                💡 این اعداد بر اساس میانگین <span className="text-jade font-bold">٪{Math.round(avgDiscount * 100)}</span> اختلاف قیمت واقعی بین وب و اینستاگرام محاسبه شده.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
