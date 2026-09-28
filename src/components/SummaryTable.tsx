import React from 'react';
import { SheetData } from '../types';
import { calculateMetrics, fmt, pct } from '../utils/formatters';

interface SummaryTableProps {
  sheets: SheetData[];
  onSelectSheet?: (index: number) => void;
}

export const SummaryTable: React.FC<SummaryTableProps> = ({ sheets, onSelectSheet }) => {
  return (
    <>
      <div className="section-title">
        <h3>Quick summary</h3>
        <span>Monthly achievement</span>
      </div>
      <div className="panel">
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Month</th>
                <th>Days</th>
                <th>Target</th>
                <th>Order</th>
                <th>Achievement</th>
                <th>Strike</th>
              </tr>
            </thead>
            <tbody>
              {sheets.map((sheet, index) => {
                const m = calculateMetrics(sheet);
                return (
                  <tr
                    key={sheet.short || index}
                    style={{ cursor: onSelectSheet ? 'pointer' : 'default' }}
                    onClick={() => onSelectSheet && onSelectSheet(index)}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td style={{ textAlign: 'left', fontWeight: 600, color: 'var(--accent)' }}>
                      {sheet.short}
                    </td>
                    <td>{m.days}</td>
                    <td>{fmt(m.target)}</td>
                    <td>{fmt(m.order)}</td>
                    <td style={{ fontWeight: 600, color: m.achievement >= 1 ? 'var(--good)' : 'inherit' }}>
                      {pct(m.achievement)}
                    </td>
                    <td>{pct(m.strike)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
