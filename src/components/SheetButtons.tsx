import React from 'react';
import { SheetData } from '../types';
import { calculateMetrics, pct } from '../utils/formatters';

interface SheetButtonsProps {
  sheets: SheetData[];
  selectedIndex: number | null;
  onSelectSheet: (index: number) => void;
}

export const SheetButtons: React.FC<SheetButtonsProps> = ({
  sheets,
  selectedIndex,
  onSelectSheet,
}) => {
  return (
    <>
      <div className="section-title">
        <h3>Register Sections</h3>
        <span>Every Excel sheet as a button</span>
      </div>
      <div className="buttons">
        {sheets.map((sheet, index) => {
          const m = calculateMetrics(sheet);
          const isActive = selectedIndex === index;
          return (
            <button
              key={sheet.short || index}
              className={`btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectSheet(index)}
            >
              <strong>📊 {sheet.short}</strong>
              <small>
                {m.days} records • {pct(m.achievement)} achievement
              </small>
            </button>
          );
        })}
      </div>
    </>
  );
};
