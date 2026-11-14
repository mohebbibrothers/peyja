import { motion } from 'framer-motion';
import { Search, CheckCircle2, Tag, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: <Search size={22} />,
    title: 'اسکن لحظه‌ای قیمت',
    desc: 'ما هر پست اینستاگرام را به محصول دقیق می‌کِشیم و قیمت همان کالا را در ده‌ها فروشگاه آنلاین پیدا می‌کنیم.',
    color: 'from-rose-hot/20 to-rose-hot/0',
    border: 'border-rose-hot/30',
    iconBg: 'bg-rose-hot/20 text-rose-glow',
  },
  {
    icon: <CheckCircle2 size={22} />,
    title: 'تطابق دقیق کالا',
    desc: 'حجم، برند، مدل و ورژن محصول را چک می‌کنیم. هیچ‌وقت یک ادکلن ۳۳ میل رو با نسخه ۱۰۰ میل مقایسه نمی‌کنیم.',
    color: 'from-violet-deep/20 to-transparent',
    border: 'border-violet-glow/30',
    iconBg: 'bg-violet-deep/20 text-violet-glow',
  },
  {
    icon: <Tag size={22} />,
    title: 'امتیاز شکار پیجا',
    desc: 'الگوریتم ما به هر محصول از ۰ تا ۱۰۰ امتیاز می‌ده: چقدر ارزان است، آیا فروشنده معتبر است، چقدر کمیابه.',
    color: 'from-gold-400/20 to-transparent',
    border: 'border-gold-400/30',
    iconBg: 'bg-gold-400/20 text-gold-400',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'راستی‌آزمایی لینک',
    desc: 'همه قیمت‌ها با لینک مستقیم از سایت معتبر ثبت می‌شوند. شما روی لینک می‌زنید و خودتان قیمت را می‌بینید.',
    color: 'from-jade/20 to-transparent',
    border: 'border-jade/30',
    iconBg: 'bg-jade/20 text-jade',
  },
  {
    icon: <Zap size={22} />,
    title: 'خرید یک‌ضرب',
    desc: 'وقتی دیدی معامله خوب است، مستقیم به همان پست اینستاگرام هدایت می‌شوی؛ بدون واسطه، بدون کمیسیون.',
    color: 'from-rose-hot/20 to-transparent',
    border: 'border-rose-hot/30',
    iconBg: 'bg-rose-hot/20 text-rose-glow',
  },
  {
    icon: <HeartHandshake size={22} />,
    title: 'حمایت از کسب‌وکار کوچک',
    desc: 'پیجا فروشندگان مستقل اینستاگرام را به خریداران واقعی وصل می‌کنه؛ کمیسیون نمی‌گیریم، قیمت را شفاف می‌کنیم.',
    color: 'from-violet-deep/20 to-transparent',
    border: 'border-violet-glow/30',
    iconBg: 'bg-violet-deep/20 text-violet-glow',
  },
];

export default function WhyPeyja() {
  return (
    <section id="why" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 chip mb-4"
          >
            <Zap size={12} className="text-gold-400" />
            چرا پیجا؟
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl leading-tight"
          >
            یک <span className="gradient-text">شاه‌حسگر</span> برای قیمت‌های واقعی
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 text-lg"
          >
            پیجا فقط یک لیست قیمت نیست؛ یک لایه تحلیل هوشمند بین فروشنده‌های کوچک اینستاگرام
            و فروشگاه‌های بزرگ است.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className={`relative glass p-6 overflow-hidden border ${f.border} hover:border-white/20 transition group`}
            >
              <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${f.color} blur-2xl opacity-60 group-hover:opacity-100 transition`} />
              <div className="relative">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.iconBg} border ${f.border}`}>
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
