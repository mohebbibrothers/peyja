import { motion } from 'framer-motion';
import { Instagram, ShoppingBag, Users, Coins, TrendingDown, Award } from 'lucide-react';
import { toman, pct } from '../utils/format';
import type { Meta } from '../utils/types';

export default function StatsRibbon({ meta }: { meta: Meta }) {
  const stats = [
    { icon: <ShoppingBag size={18} />, label: 'محصول اسکن‌شده', value: meta.products.toLocaleString('fa-IR'), color: 'text-gold-400' },
    { icon: <Instagram size={18} />, label: 'فروشنده اینستاگرام', value: '۶۲', color: 'text-rose-hot' },
    { icon: <TrendingDown size={18} />, label: 'میانگین ارزانی اینستاگرام', value: pct(meta.avgDiscount), color: 'text-jade' },
    { icon: <Coins size={18} />, label: 'مجموع پس‌انداز در نمونه', value: toman(meta.totalSavings), color: 'text-violet-glow' },
    { icon: <Award size={18} />, label: 'پیشنهاد شگفت‌انگیز', value: meta.igCheaperCount.toLocaleString('fa-IR') + ' کالا', color: 'text-gold-400' },
    { icon: <Users size={18} />, label: 'کاربر در حال تست', value: 'بتای خصوصی', color: 'text-white/80' },
  ];

  return (
    <section className="relative -mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong shadow-glow p-4 sm:p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-right"
            >
              <div className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <div className={`num font-black text-lg ${s.color}`}>{s.value}</div>
                <div className="text-[11px] text-white/50 mt-0.5">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
