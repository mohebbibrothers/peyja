import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, TrendingDown, Shield, Instagram } from 'lucide-react';
import type { Meta } from '../utils/types';
import { toman, pct } from '../utils/format';

export default function Hero({ meta }: { meta: Meta }) {
  return (
    <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
      <div className="absolute inset-x-0 top-20 flex justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(240,90,126,0.5), transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-jade animate-pulse" />
            <span className="text-xs text-white/70">
              بتای خصوصی · {meta.products} محصول از {meta.withPrice} فروشنده اینستاگرام اسکن شد
            </span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight">
            <span className="block text-white">قیمت‌های وب را</span>
            <span className="block">
              <span className="gradient-text">راستی‌آزمایی</span>
              <span className="text-white"> کردیم،</span>
            </span>
            <span className="block text-white">
              از <span className="relative inline-block">
                <span className="relative z-10">اینستاگرام</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-rose-hot/30 -z-0 rounded"></span>
              </span> می‌خریم.
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            پیجا هزاران قیمت را از فروشگاه‌های بزرگ، مارکت‌پلیس‌ها و
            فروشندگان اینستاگرام رصد می‌کند و بهت نشون می‌ده کِی خرید از
            اینستاگرام واقعاً به‌صرفه است، کجا تقلبی هست، و چقدر توی جیبت می‌مونه.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="btn-primary">
              <Sparkles size={18} />
              مشاهده {meta.products} شکار قیمت
              <ArrowLeft size={16} />
            </a>
            <a href="#why" className="btn-ghost">
              <Shield size={16} />
              پیجا چطور کار می‌کنه؟
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl">
            <MiniStat icon={<TrendingDown size={16} />} label="میانگین ارزان‌تر" value={pct(meta.avgDiscount)} accent />
            <MiniStat icon={<Instagram size={16} />} label="پیشنهاد شگفت‌انگیز" value={meta.igCheaperCount + ' کالا'} />
            <MiniStat icon={<Sparkles size={16} />} label="مجموع پس‌انداز" value={toman(meta.totalSavings)} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <HeroCard meta={meta} />
        </motion.div>
      </div>
    </section>
  );
}

function MiniStat({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`glass p-4 ${accent ? 'ring-1 ring-rose-hot/30' : ''}`}>
      <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
        {icon}
        {label}
      </div>
      <div className={`num font-black text-xl ${accent ? 'gradient-text' : 'text-white'}`}>
        {value}
      </div>
    </div>
  );
}

function HeroCard({ meta }: { meta: Meta }) {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute -inset-4 bg-gold-rose opacity-20 blur-3xl rounded-[2.5rem] animate-pulse-slow" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative glass-strong p-6 shadow-glow noise"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-hot animate-pulse" />
            <span className="text-xs text-white/60">شکار قیمت لحظه‌ای</span>
          </div>
          <span className="chip-hot">🔥 HOT DEAL</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-white/50 mb-1">سرم کوجیک اسید · مدیکیوب</div>
            <div className="font-display font-bold text-lg leading-tight">پوست روشن‌تر</div>
            <div className="text-xs text-white/50 mt-1">۳۰ میل · اصل کره</div>
          </div>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-rose-hot/30 to-violet-deep/30 border border-white/10 flex items-center justify-center text-2xl">
            ✨
          </div>
        </div>

        <div className="divider-glow my-5" />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/5 p-3 border border-white/10">
            <div className="text-[11px] text-white/50 mb-1">قیمت وب (میانگین)</div>
            <div className="num font-bold text-white/60 line-through">۲٬۵۰۰٬۰۰۰</div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-rose-hot/20 to-gold-400/10 border border-rose-hot/40 p-3">
            <div className="text-[11px] text-rose-glow font-bold mb-1">قیمت اینستاگرام</div>
            <div className="num font-black text-xl gradient-text">۱٬۲۰۰٬۰۰۰</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-white/50">پس‌انداز شما</div>
            <div className="num font-black text-2xl text-jade">٪۵۲</div>
          </div>
          <button className="btn-primary !py-2 !px-4 text-sm">
            <Instagram size={14} />
            خرید از پیج
          </button>
        </div>
      </motion.div>

      {/* Floating mini-cards */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute -left-8 top-16 glass p-3 shadow-card animate-float hidden sm:block"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-jade/20 border border-jade/40 flex items-center justify-center">
            <TrendingDown size={16} className="text-jade" />
          </div>
          <div>
            <div className="text-[10px] text-white/50">نسبت به وب</div>
            <div className="num font-bold text-jade text-sm">٪{meta.avgDiscount} ارزان‌تر</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute -right-4 -bottom-6 glass p-3 shadow-card hidden sm:block"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold-400/20 border border-gold-400/40 flex items-center justify-center">
            <Sparkles size={16} className="text-gold-400" />
          </div>
          <div>
            <div className="text-[10px] text-white/50">مورد اسکن‌شده</div>
            <div className="num font-bold text-sm">{meta.products.toLocaleString('fa-IR')} کالا</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
