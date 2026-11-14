<p align="center">
  <img src="public/favicon.svg" width="64" />
</p>

<h1 align="center">
  <span style="background: linear-gradient(135deg,#f2aa4c,#f05a7e,#8b2fff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">پیجا · Peyja</span>
</h1>

<p align="center">
  اولین پلتفرم مقایسه‌ی قیمت محصولات فروشندگان اینستاگرام با فروشگاه‌های آنلاین.
</p>

---

## درباره پروژه

پیجا قیمت صدها محصول آرایشی، بهداشتی و عطر را از فروشگاه‌های آنلاین (ترب، دیجیکالا،
داروخانه‌ها و …) استخراج می‌کند و کنار قیمت فروشنده‌های اینستاگرام می‌گذارد. خروجی،
یک نمای شفاف از این است که **واقعاً خرید از اینستاگرام چقدر به‌صرفه است** و کدام
محصولات «شکار قیمت» محسوب می‌شوند.

## فناوری‌ها

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** (تم تاریک اختصاصی با پالت طلایی/سرخابی/بنفش)
- **Framer Motion** (انیمیشن‌های UI)
- **Recharts** (نمودارها)
- **Zustand** (state)
- **Lucide React** (آیکون‌ها)
- **xlsx** (پردازش داده‌های اکسل benchmark)
- **GitHub Pages** (میزبانی خودکار با GitHub Actions)

## اجرا در محیط توسعه

```bash
npm install
npm run data:build   # ساخت public/data/products.json از خروجی benchmark
npm run dev
```

بیلد تولید:

```bash
npm run build
npm run preview
```

## ساختار داده‌ها

- `scripts/build-data.mjs` فایل‌های خروجی پروژه bench (xlsx + JSON) را می‌خواند و
  یک `public/data/products.json` یکپارچه برای اپ می‌سازد.
- `src/hooks/useData.ts` این JSON را در کلاینت لود می‌کند.
- محصولات شامل قیمت اینستاگرام، قیمت وب، درصد پس‌انداز، «Deal Score» (۰–۱۰۰)،
  منبع قیمت وب و لینک مستقیم هستند.

## فیچرها

- Hero خفن با عدد زندهٔ میانگین ارزانی اینستاگرام
- **Peyja Deal Score** – امتیاز اختصاصی هر محصول (۰–۱۰۰)
- ماشین‌حساب پس‌انداز ماهانه/سالانه
- نمودار میانگین ارزانی به‌تفکیک دسته‌بندی
- لیدربرد برندها (بیشترین مجموع پس‌انداز برای مصرف‌کننده)
- گرید محصولات با جست‌وجو، فیلتر چندمعیاره، مرتب‌سازی هوشمند
- مودال جزئیات محصول با مقایسه زنده قیمت و CTA خرید مستقیم از اینستاگرام
- علاقه‌مندی (واچ‌لیست) با localStorage
- طراحی کاملاً واکنش‌گرا (موبایل/تبلت/دسکتاپ)
- افکت‌های glassmorphism، grain noise، گرادیان، انیمیشن float

## استقرار

هر پوش به `main` به‌طور خودکار توسط workflow در `.github/workflows/deploy.yml` روی
GitHub Pages منتشر می‌شود.
