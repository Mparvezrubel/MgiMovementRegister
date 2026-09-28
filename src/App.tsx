import React, { useState, useEffect, useCallback } from 'react';
import initialData from './data/data.json';
import { MovementData } from './types';
import { calculateMetrics, calculateOverallMetrics } from './utils/formatters';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatGrid } from './components/StatGrid';
import { SheetButtons } from './components/SheetButtons';
import { SummaryTable } from './components/SummaryTable';
import { SheetDetail } from './components/SheetDetail';

export const App: React.FC = () => {
  const [data, setData] = useState<MovementData>(initialData as unknown as MovementData);
  const [selectedSheetIndex, setSelectedSheetIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Sync with browser history for back navigation (matching Android onBackPressed)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && typeof event.state.sheetIndex === 'number') {
        setSelectedSheetIndex(event.state.sheetIndex);
      } else {
        setSelectedSheetIndex(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectSheet = (index: number) => {
    setSelectedSheetIndex(index);
    window.history.pushState({ sheetIndex: index }, '', `#sheet-${index}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = useCallback(() => {
    setSelectedSheetIndex(null);
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch('/data.json');
      if (res.ok) {
        const freshData = await res.json();
        setData(freshData);
      }
    } catch {
      // Keep bundled data if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const currentSheet = selectedSheetIndex !== null ? data.sheets[selectedSheetIndex] : null;
  const currentSheetMetrics = currentSheet ? calculateMetrics(currentSheet) : null;
  const overallMetrics = calculateOverallMetrics(data.sheets);

  return (
    <div className="app">
      <Header
        currentSheet={currentSheet}
        sheetMetrics={currentSheetMetrics}
        onBackToDashboard={handleBackToDashboard}
        onRefresh={handleRefresh}
      />

      {loading ? (
        <div className="empty">Loading register data…</div>
      ) : selectedSheetIndex !== null && currentSheet && currentSheetMetrics ? (
        <SheetDetail
          sheet={currentSheet}
          headers={data.headers}
          metrics={currentSheetMetrics}
        />
      ) : (
        <>
          <Hero meta={data.meta} />
          <StatGrid metrics={overallMetrics} mode="home" />
          <SheetButtons
            sheets={data.sheets}
            selectedIndex={selectedSheetIndex}
            onSelectSheet={handleSelectSheet}
          />
          <SummaryTable
            sheets={data.sheets}
            onSelectSheet={handleSelectSheet}
          />
        </>
      )}

      <footer>
        Data embedded from the supplied MGI Movement Register-2026.xlsx
      </footer>
    </div>
  );
};

export default App;
