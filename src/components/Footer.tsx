import { Instagram, Github, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divider-glow mb-10" />

        {/* CTA */}
        <div className="glass-strong p-8 sm:p-12 relative overflow-hidden mb-12 noise">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-rose-hot/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-violet-deep/20 blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 chip-hot mb-3">
                <Sparkles size={12} />
                بتای خصوصی پیجا
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl leading-tight">
                آماده‌ای <span className="gradient-text">ارزان‌تر</span> بخری؟
              </h3>
              <p className="text-white/60 mt-3 max-w-xl">
                در بتای خصوصی هستیم. هر هفته صدها محصول جدید اسکن می‌شوند و شکارهای
                واقعی به اینجا اضافه می‌شن. ما رو در اینستاگرام دنبال کن تا از شکارهای
                داغ باخبر بشی.
              </p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="btn-primary whitespace-nowrap"
            >
              <Instagram size={18} />
              دنبال کردن پیجا
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-rose" />
            <span>
              <span className="gradient-text font-black font-display text-base">پیجا</span>
              <span className="mx-2">·</span>
              ساخته شده با <Heart size={11} className="inline text-rose-hot" /> برای خرید هوشمندانه از اینستاگرام
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Peyja</span>
            <a className="hover:text-white flex items-center gap-1" href="#">حریم خصوصی</a>
            <a className="hover:text-white flex items-center gap-1" href="#">شرایط</a>
            <a className="hover:text-white flex items-center gap-1" href="https://github.com/mohebbibrothers/peyja" target="_blank" rel="noreferrer">
              <Github size={12} />
              گیت‌هاب
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
