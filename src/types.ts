export interface MetaData {
  sr: string;
  db: string;
  territory: string;
  region?: string;
}

export type CellValue = number | string | null;

export interface SheetData {
  name: string;
  short: string;
  rows: CellValue[][];
}

export interface MovementData {
  title: string;
  meta: MetaData;
  headers: string[];
  sheets: SheetData[];
}

export interface SheetMetrics {
  days: number;
  target: number;
  order: number;
  memo: number;
  outlet: number;
  ims: number;
  achievement: number;
  strike: number;
}
