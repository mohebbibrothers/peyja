import { motion } from 'framer-motion';
import { Search, Sparkles, Bookmark, Instagram } from 'lucide-react';
import type { Meta } from '../utils/types';

export default function Nav({ stats, savedCount }: { stats: Meta; savedCount: number }) {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 backdrop-blur-xl bg-midnight-950/70 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-glow">
            <div className="absolute inset-0 bg-gold-rose" />
            <svg viewBox="0 0 64 64" className="relative w-full h-full">
              <path d="M18 46 L32 14 L46 46" stroke="#0b0514" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M24 38 H40" stroke="#0b0514" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xl font-black tracking-tight">
              <span className="gradient-text">پیجا</span>
            </span>
            <span className="text-[10px] text-white/50 -mt-0.5">Peyja · کشف قیمت واقعی</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {[
            ['چرا پیجا؟', '#why'],
            ['محصولات', '#products'],
            ['برندها', '#brands'],
            ['مقایسه', '#compare'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="px-3 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#products" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border border-white/10 text-white/80 hover:bg-white/5 transition">
            <Search size={14} />
            جست‌وجو
          </a>
          <a href="#savings" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10">
            <Sparkles size={14} className="text-gold-400" />
            پس‌انداز
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full text-white/80 hover:text-white"
            title="لیست خرید شما"
          >
            <Bookmark size={16} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-rose-hot text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center text-midnight-950">
                {savedCount}
              </span>
            )}
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-gradient-to-l from-rose-hot to-gold-400 text-midnight-950 font-bold hover:brightness-110 transition"
          >
            <Instagram size={14} />
            اینستاگرام
          </a>
        </div>
      </div>
    </motion.header>
  );
}
