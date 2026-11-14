export interface WebInfo {
  name: string;
  price: number;
  display: string;
  source: string;
  url: string;
  matchConfidence: 'high' | 'medium' | 'low';
  note: string;
  checkedAt: string;
}

export interface Product {
  id: string;
  postRowId: number;
  shortcode: string;
  postUrl: string;
  ownerUsername: string;
  ownerTitle: string;
  productName: string;
  brand: string;
  volume: string | null;
  category: string;
  categoryFa: string;
  igPrice: number | null;
  igDisplay: string | null;
  igScope: string | null;
  web: WebInfo | null;
  discountPct: number | null; // % saved buying from IG: (web-ig)/web*100
  savings: number | null;
  cheaper: 'instagram' | 'web' | 'equal' | null;
  dealScore: number;
  dealLabel: string;
  evidenceImage: string | null;
  postPublishedAt: string | null;
  likes: number | null;
  comments: number | null;
}

export interface BrandStat {
  brand: string;
  count: number;
  igTotal: number;
  webTotal: number;
  avgDiscount: number;
  totalSavings: number;
}

export interface CategoryStat {
  category: string;
  categoryFa: string;
  count: number;
  igTotal: number;
  webTotal: number;
  avgDiscount: number;
}

export interface Meta {
  generatedAt: string;
  products: number;
  withPrice: number;
  totalIgSpend: number;
  totalWebSpend: number;
  totalSavings: number;
  avgDiscount: number;
  igCheaperCount: number;
  webCheaperCount: number;
}

export interface DataBundle {
  meta: Meta;
  brands: BrandStat[];
  categories: CategoryStat[];
  products: Product[];
}
