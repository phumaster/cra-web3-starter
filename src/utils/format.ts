import { formatUnits } from '@ethersproject/units';

export function abbreviateNumber(num: number): string {
  if (num >= 10000000000000) {
    return (num / 1000000000000).toFixed(0).replace(/\.0$/, '') + 'T';
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toFixed(0);
}

export function withoutZeroEnd(amount: string): string {
  return amount.endsWith('.0') ? amount.replace('.0', '') : amount;
}

export function numberFormat(amount: string): string {
  const [first, ...rest] = amount.split('.');
  return amount.split('.').length > 1
    ? `${(first ?? '').replace(/(.)(?=(\d{3})+$)/g, '$1,')}.${rest.join().substring(0, 4)}`
    : amount.replace(/(.)(?=(\d{3})+$)/g, '$1,');
}

export function formatWithDecimals(amount: string, decimals: number): string {
  try {
    const formated = formatUnits(amount, decimals);
    const withoutZero = withoutZeroEnd(formated);
    return numberFormat(withoutZero);
  } catch (e) {
    return amount;
  }
}
