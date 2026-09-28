import React, { useState, useMemo } from 'react';
import { SheetData, SheetMetrics } from '../types';
import { fmt, pct } from '../utils/formatters';
import { StatGrid } from './StatGrid';

interface SheetDetailProps {
  sheet: SheetData;
  headers: string[];
  metrics: SheetMetrics;
}

export const SheetDetail: React.FC<SheetDetailProps> = ({
  sheet,
  headers,
  metrics,
}) => {
  const [query, setQuery] = useState('');

  // Percentage columns based on index: 6 (Strike Rate %), 10 (CIMS %), 12 (N.Exe. %), 15 (Achievement %)
  const isPercentCol = (colIndex: number) => {
    return colIndex === 6 || colIndex === 10 || colIndex === 12 || colIndex === 15;
  };

  const filteredRows = useMemo(() => {
    if (!query.trim()) return sheet.rows;
    const q = query.toLowerCase().trim();
    return sheet.rows.filter((row) => {
      return row.some((cell) => {
        if (cell === null || cell === undefined) return false;
        return String(cell).toLowerCase().includes(q);
      });
    });
  }, [sheet.rows, query]);

  return (
    <div>
      <StatGrid metrics={metrics} mode="sheet" />

      <div className="panel">
        <div className="panelhead">
          <b title={sheet.name}>{sheet.name}</b>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="text"
              className="search"
              placeholder="Search route…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search route"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  padding: '4px',
                }}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i} style={i === 1 ? { textAlign: 'left' } : undefined}>
                    {h.replace(/\n/g, ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-blue-50/40 transition-colors">
                    {row.map((cell, colIndex) => {
                      const isPct = isPercentCol(colIndex);
                      const displayVal = isPct
                        ? pct(typeof cell === 'number' ? cell : null)
                        : fmt(cell);

                      return (
                        <td
                          key={colIndex}
                          style={
                            colIndex === 1
                              ? { textAlign: 'left', fontWeight: 500 }
                              : undefined
                          }
                        >
                          {displayVal}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length}>
                    <div className="empty">No records matching &ldquo;{query}&rdquo;</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
