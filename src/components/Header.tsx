import React from 'react';
import { SheetData, SheetMetrics } from '../types';

interface HeaderProps {
  currentSheet?: SheetData | null;
  sheetMetrics?: SheetMetrics | null;
  onBackToDashboard?: () => void;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSheet,
  sheetMetrics,
  onBackToDashboard,
  onRefresh,
}) => {
  if (currentSheet && sheetMetrics && onBackToDashboard) {
    return (
      <div className="top">
        <div className="brand">
          <button className="back" onClick={onBackToDashboard} aria-label="Back to dashboard">
            ← Dashboard
          </button>
          <div style={{ textAlign: 'center' }}>
            <h1>{currentSheet.short} 2026</h1>
            <small>{sheetMetrics.days} records</small>
          </div>
          <span style={{ width: '40px' }}></span>
        </div>
      </div>
    );
  }

  return (
    <div className="top">
      <div className="brand">
        <div>
          <h1>MGI Movement Register</h1>
          <small>2026 • Sales Performance</small>
        </div>
        <button
          className="icon"
          onClick={onRefresh || (() => window.location.reload())}
          title="Reload data"
          aria-label="Reload data"
        >
          ↻
        </button>
      </div>
    </div>
  );
};
