import { SheetData, SheetMetrics } from '../types';

export const fmt = (n: number | string | null | undefined): string => {
  if (n === null || n === undefined || n === '') return '—';
  if (typeof n === 'number') {
    return n.toLocaleString(undefined, { maximumFractionDigits: 1 });
  }
  return String(n);
};

export const pct = (n: number | null | undefined): string => {
  if (n === null || n === undefined || isNaN(n)) return '—';
  return (n * 100).toFixed(1) + '%';
};

export function calculateMetrics(sh: SheetData): SheetMetrics {
  const rows = sh.rows;
  // valid rows have a route name at index 1
  const valid = rows.filter((r) => r && r[1] !== null && r[1] !== undefined && r[1] !== '');
  
  const target = valid.reduce((a, r) => a + (Number(r[3]) || 0), 0);
  const order = valid.reduce((a, r) => a + (Number(r[4]) || 0), 0);
  const memo = valid.reduce((a, r) => a + (Number(r[5]) || 0), 0);
  const outlet = valid.reduce((a, r) => a + (Number(r[2]) || 0), 0);
  const ims = valid.reduce((a, r) => a + (Number(r[8]) || 0), 0);

  return {
    days: valid.length,
    target,
    order,
    memo,
    outlet,
    ims,
    achievement: target > 0 ? order / target : 0,
    strike: outlet > 0 ? memo / outlet : 0,
  };
}

export function calculateOverallMetrics(sheets: SheetData[]): SheetMetrics {
  const ms = sheets.map(calculateMetrics);
  const all = {
    days: 0,
    target: 0,
    order: 0,
    memo: 0,
    outlet: 0,
    ims: 0,
    achievement: 0,
    strike: 0,
  };

  ms.forEach((m) => {
    all.days += m.days;
    all.target += m.target;
    all.order += m.order;
    all.memo += m.memo;
    all.outlet += m.outlet;
    all.ims += m.ims;
  });

  all.achievement = all.target > 0 ? all.order / all.target : 0;
  all.strike = all.outlet > 0 ? all.memo / all.outlet : 0;

  return all;
}
