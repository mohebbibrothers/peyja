const fa = new Intl.NumberFormat('fa-IR');
const faCompact = new Intl.NumberFormat('fa-IR', { notation: 'compact', maximumFractionDigits: 1 });

export const toman = (n: number | null | undefined) => {
  if (n == null) return '—';
  return fa.format(Math.round(n)) + ' تومان';
};

export const tomanCompact = (n: number | null | undefined) => {
  if (n == null) return '—';
  if (n >= 1_000_000) return faCompact.format(n).replace('میلیون', 'م.ت');
  if (n >= 1_000) return faCompact.format(n).replace('هزار', 'ه.ت');
  return fa.format(n);
};

export const pct = (n: number | null | undefined) => {
  if (n == null) return '—';
  return (n >= 0 ? '٪' : '') + fa.format(Math.round(n)) + (n < 0 ? '٪' : '');
};

export const shortNum = (n: number | null | undefined) => {
  if (n == null) return '—';
  return faCompact.format(n);
};
