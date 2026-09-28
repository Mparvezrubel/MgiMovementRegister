import React from 'react';
import { MetaData } from '../types';

interface HeroProps {
  meta: MetaData;
}

export const Hero: React.FC<HeroProps> = ({ meta }) => {
  return (
    <div className="hero">
      <h2>Performance Dashboard</h2>
      <p>
        {meta.sr} • {meta.db} • {meta.territory}
        {meta.region && meta.region !== meta.territory ? ` • ${meta.region}` : ''}
      </p>
    </div>
  );
};
