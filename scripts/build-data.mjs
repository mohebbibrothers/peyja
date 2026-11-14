// Build Peyja public data bundle from the Peyja benchmark workbooks.
// Reads:
//   - deliverables/golden_dataset_62_final.xlsx  (Instagram products + posts)
//   - review/web_verified.json                   (Verified web prices)
// Writes:
//   - public/data/products.json (compact product catalog consumed by the React app)

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, '..');
// Look for benchmark dir next to peyja repo or under workspace root
import { existsSync as _es } from 'node:fs';
const BENCH_CANDIDATES = [
  resolve(REPO, 'tehran_beauty_instagram_benchmark'),
  resolve(REPO, '..', 'tehran_beauty_instagram_benchmark'),
  resolve('/home/user/tehran_beauty_instagram_benchmark'),
];
const BENCH = BENCH_CANDIDATES.find((p) => _es(resolve(p, 'deliverables/golden_dataset_62_final.xlsx'))) || BENCH_CANDIDATES[0];
if (!_es(resolve(BENCH, 'deliverables/golden_dataset_62_final.xlsx'))) {
  console.error('Could not find golden dataset. Looked at:', BENCH_CANDIDATES);
  process.exit(1);
}

// Load xlsx from local node_modules
import * as fs from 'node:fs';
const XLSXMOD = await import('xlsx/xlsx.mjs');
XLSXMOD.set_fs(fs);

function loadWorksheet(path, sheet) {
  const wb = XLSXMOD.readFile(path, { cellDates: true });
  const ws = wb.Sheets[sheet];
  return XLSXMOD.utils.sheet_to_json(ws, { header: 1, defval: null });
}

function readTable(rows, headerRow = 4) {
  const headers = rows[headerRow - 1].map((h, i) => h ?? `col${i}`);
  const out = [];
  for (let r = headerRow; r < rows.length; r++) {
    const obj = {};
    let has = false;
    for (let c = 0; c < headers.length; c++) {
      const v = rows[r][c];
      if (v !== null && v !== undefined && v !== '') has = true;
      obj[headers[c]] = v;
    }
    if (has) out.push(obj);
  }
  return out;
}

// 1. Load products from the golden dataset.
const prodRows = loadWorksheet(resolve(BENCH, 'deliverables/golden_dataset_62_final.xlsx'), 'products');
const products = readTable(prodRows, 4);

// 2. Load posts for owner/date context.
const postRows = loadWorksheet(resolve(BENCH, 'deliverables/golden_dataset_62_final.xlsx'), 'posts');
const posts = readTable(postRows, 4);
const postByShortcode = {};
for (const p of posts) {
  postByShortcode[p.shortcode] = p;
}

// 3. Load verified web prices.
const web = JSON.parse(
  readFileSync(resolve(BENCH, 'review/web_verified.json'), 'utf8')
);

// Helper: infer category class from class_id/class_name_fa or brand/product_name heuristics
function classify(p) {
  const name = (p.product_name || '').toLowerCase();
  const brand = (p.brand || '').toLowerCase();
  const cn = (p.class_name_fa || '').toLowerCase();
  if (cn.includes('عطر') || cn.includes('ادکلن') || /edp|edt|edc|perfume|parfum|mist body|body mist/.test(name) || /edp|edt/.test(name)) {
    if (/hair|body/.test(name) && /mist/.test(name)) return 'body-mist';
    return 'perfume';
  }
  if (cn.includes('مراقبت پوست') || /serum|cream|toner|essence|ampoule|booster|moisturizer|sunscreen|sun milk|spf|pdrn|retinol|niacinamide|vitamin c|cica|centella|کرم|سرم|ضدآفتاب|تونر|اسنس/.test(name)) return 'skincare';
  if (cn.includes('آرایش') || /lipstick|lip gloss|concealer|foundation|mascara|eyeliner|rouge|blush|ریمل|رژلب|کرم.?پودر|کانسیلر|رژ گونه|سایه|خط چشم|پنکک/.test(name)) return 'makeup';
  if (cn.includes('مو') || /shampoo|hair mask|conditioner|hair waver|curler|straightening|brush.*hair|ماسک مو|شامپو|فرکننده|برس.*حرارتی|برس صاف|ویو/.test(name)) return 'hair';
  if (/roll.on|deodorant|ضد تعریق|دئودورانت/.test(name)) return 'bodycare';
  if (/tanning|bronzer|برنزه|bubble|wax|بادی/.test(name)) return 'bodycare';
  return 'other';
}

const CATEGORY_FA = {
  skincare: 'مراقبت پوست',
  makeup: 'آرایش',
  perfume: 'عطر و ادکلن',
  hair: 'مراقبت و ابزار مو',
  'body-mist': 'میست و خوشبوکننده بدن',
  bodycare: 'مراقبت بدن',
  other: 'سایر',
};

const out = [];
for (const p of products) {
  const rid = p.row_id;
  if (!rid) continue;
  const w = web[rid];
  const igPrice = typeof p.price_toman === 'number' ? p.price_toman : null;
  const webPrice = w && typeof w.web_price_toman === 'number' ? w.web_price_toman : null;
  let discountPct = null;
  let savings = null;
  let cheaper = null;
  if (igPrice && webPrice) {
    discountPct = Math.round(((webPrice - igPrice) / webPrice) * 100);
    savings = webPrice - igPrice;
    cheaper = igPrice < webPrice ? 'instagram' : webPrice < igPrice ? 'web' : 'equal';
  }

  // Deal score: 0-100 based on how much cheaper IG is relative to web.
  let dealScore = 0;
  let dealLabel = 'نامشخص';
  if (discountPct !== null && cheaper === 'instagram') {
    dealScore = Math.min(100, Math.round(discountPct * 1.3 + Math.min(savings / 200000, 20)));
    if (discountPct >= 60) dealLabel = '🔥 شگفت‌انگیز';
    else if (discountPct >= 40) dealLabel = '⭐ عالی';
    else if (discountPct >= 20) dealLabel = '✅ خوب';
    else dealLabel = '👌 منطقی';
  } else if (cheaper === 'web') {
    dealLabel = '⚠️ وب ارزان‌تر';
  } else {
    dealLabel = '—';
  }

  const post = postByShortcode[p.shortcode] || {};

  // Try to get evidence image if present
  const evidenceImage = p.evidence_image_url || null;

  out.push({
    id: rid,
    postRowId: p.post_row_id,
    shortcode: p.shortcode,
    postUrl: p.post_url,
    ownerUsername: p.owner_username,
    ownerTitle: post.owner_title || p.owner_username,
    productName: p.product_name,
    brand: p.brand || 'متفرقه',
    volume: p.volume || null,
    category: classify(p),
    categoryFa: CATEGORY_FA[classify(p)],
    igPrice,
    igDisplay: p.price,
    igScope: p.price_scope,
    web: w ? {
      name: w.web_product_name,
      price: webPrice,
      display: w.web_price_display,
      source: w.source_name,
      url: w.source_url,
      matchConfidence: w.match_confidence,
      note: w.note || '',
      checkedAt: new Date().toISOString(),
    } : null,
    discountPct,
    savings,
    cheaper,
    dealScore,
    dealLabel,
    evidenceImage,
    postPublishedAt: post.published_at || null,
    likes: post.likes_count || null,
    comments: post.comments_count || null,
  });
}

// Aggregate stats
const withPrice = out.filter(p => p.igPrice && p.web);
const totalIgSpend = withPrice.reduce((s, p) => s + p.igPrice, 0);
const totalWebSpend = withPrice.reduce((s, p) => s + p.web.price, 0);
const totalSavings = totalWebSpend - totalIgSpend;
const avgDiscount = Math.round((totalSavings / totalWebSpend) * 100);
const igCheaperCount = withPrice.filter(p => p.cheaper === 'instagram').length;
const webCheaperCount = withPrice.filter(p => p.cheaper === 'web').length;

const brandStats = {};
for (const p of withPrice) {
  const b = p.brand || 'متفرقه';
  if (!brandStats[b]) brandStats[b] = { brand: b, count: 0, igTotal: 0, webTotal: 0, avgDiscount: 0 };
  brandStats[b].count++;
  brandStats[b].igTotal += p.igPrice;
  brandStats[b].webTotal += p.web.price;
}
for (const b of Object.values(brandStats)) {
  b.avgDiscount = Math.round(((b.webTotal - b.igTotal) / b.webTotal) * 100);
  b.totalSavings = b.webTotal - b.igTotal;
}

const catStats = {};
for (const p of withPrice) {
  const c = p.category;
  if (!catStats[c]) catStats[c] = { category: c, categoryFa: p.categoryFa, count: 0, igTotal: 0, webTotal: 0 };
  catStats[c].count++;
  catStats[c].igTotal += p.igPrice;
  catStats[c].webTotal += p.web.price;
}
for (const c of Object.values(catStats)) {
  c.avgDiscount = Math.round(((c.webTotal - c.igTotal) / c.webTotal) * 100);
}

const bundle = {
  meta: {
    generatedAt: new Date().toISOString(),
    products: out.length,
    withPrice: withPrice.length,
    totalIgSpend,
    totalWebSpend,
    totalSavings,
    avgDiscount,
    igCheaperCount,
    webCheaperCount,
  },
  brands: Object.values(brandStats).sort((a, b) => b.totalSavings - a.totalSavings),
  categories: Object.values(catStats).sort((a, b) => b.avgDiscount - a.avgDiscount),
  products: out,
};

if (!existsSync(resolve(REPO, 'public/data'))) {
  mkdirSync(resolve(REPO, 'public/data'), { recursive: true });
}
writeFileSync(
  resolve(REPO, 'public/data/products.json'),
  JSON.stringify(bundle)
);
console.log(`✓ Wrote public/data/products.json (${out.length} products, ${withPrice.length} comparable)`);
console.log(`  IG cheaper: ${igCheaperCount} | Web cheaper: ${webCheaperCount} | Avg discount: ${avgDiscount}%`);
console.log(`  Total savings across sample: ${totalSavings.toLocaleString('fa-IR')} toman`);
