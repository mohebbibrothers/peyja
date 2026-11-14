import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { pct } from '../utils/format';
import type { CategoryStat } from '../utils/types';

export default function CategoryChart({ categories }: { categories: CategoryStat[] }) {
  const data = categories
    .slice()
    .sort((a, b) => b.avgDiscount - a.avgDiscount)
    .map((c) => ({ name: c.categoryFa, value: c.avgDiscount, count: c.count }));

  const colors = ['#f2aa4c', '#f05a7e', '#c36bff', '#2de0a8', '#4cc9f0', '#ffd166'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div className="glass p-3 text-sm" dir="rtl">
          <div className="font-bold mb-1">{p.name}</div>
          <div className="text-jade num font-bold">٪{p.value} میانگین ارزانی</div>
          <div className="text-white/60 text-xs mt-1">{p.count.toLocaleString('fa-IR')} کالا</div>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="compare" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="inline-flex items-center gap-2 chip mb-4">
              <BarChart3 size={12} className="text-violet-glow" />
              تحلیل دسته‌بندی
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl leading-tight">
              کدام دسته‌ها <span className="gradient-text">بیشترین</span> اختلاف قیمت را دارند؟
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              عطرها و مراقبت پوست بیشترین اختلاف را بین فروشگاه‌های رسمی و
              فروشندگان اینستاگرام دارند. هر bar میانگین درصد پس‌انداز نسبت به وب را نشان می‌دهد.
            </p>
            <div className="mt-6 space-y-2">
              {data.slice(0, 3).map((d, i) => (
                <div key={d.name} className="flex items-center justify-between glass px-4 py-2 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: colors[i] }} />
                    {d.name}
                  </span>
                  <span className="num font-bold text-jade">٪{d.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass p-6 h-[380px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">میانگین درصد ارزانی اینستاگرام در هر دسته</h3>
              <span className="text-xs text-white/50">بر اساس {data.reduce((s, d) => s + d.count, 0)} مقایسه</span>
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data} margin={{ right: 20, left: 0 }}>
                <defs>
                  {colors.map((c, i) => (
                    <linearGradient key={i} id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c} stopOpacity={1} />
                      <stop offset="100%" stopColor={c} stopOpacity={0.4} />
                    </linearGradient>
                  ))}
                </defs>
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'Vazirmatn' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => '٪' + v}
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'Vazirmatn' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={50}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={`url(#grad${i % colors.length})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
