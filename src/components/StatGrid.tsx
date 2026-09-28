import React from 'react';
import { SheetMetrics } from '../types';
import { fmt, pct } from '../utils/formatters';

interface StatGridProps {
  metrics: SheetMetrics;
  mode: 'home' | 'sheet';
}

export const StatGrid: React.FC<StatGridProps> = ({ metrics, mode }) => {
  if (mode === 'sheet') {
    return (
      <div className="grid">
        <div className="stat">
          <span>Achievement</span>
          <b>{pct(metrics.achievement)}</b>
        </div>
        <div className="stat">
          <span>Strike Rate</span>
          <b>{pct(metrics.strike)}</b>
        </div>
        <div className="stat">
          <span>Order</span>
          <b>{fmt(metrics.order)}</b>
        </div>
        <div className="stat">
          <span>IMS</span>
          <b>{fmt(metrics.ims)}</b>
        </div>
      </div>
    );
  }

  const achievementPct = Math.min(100, Math.max(0, (metrics.achievement || 0) * 100));
  const strikePct = Math.min(100, Math.max(0, (metrics.strike || 0) * 100));

  return (
    <div className="grid">
      <div className="stat">
        <span>Target Achievement</span>
        <b>{pct(metrics.achievement)}</b>
        <div className="progress">
          <i style={{ width: `${achievementPct}%` }}></i>
        </div>
      </div>
      <div className="stat">
        <span>Strike Rate</span>
        <b>{pct(metrics.strike)}</b>
        <div className="progress">
          <i style={{ width: `${strikePct}%` }}></i>
        </div>
      </div>
      <div className="stat">
        <span>Total Order</span>
        <b>{fmt(metrics.order)}</b>
        <span>Target {fmt(metrics.target)}</span>
      </div>
      <div className="stat">
        <span>IMS Total</span>
        <b>{fmt(metrics.ims)}</b>
        <span>{metrics.days} recorded days</span>
      </div>
    </div>
  );
};
