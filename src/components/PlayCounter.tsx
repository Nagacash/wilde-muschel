import React from 'react';
import { Headphones } from 'lucide-react';

interface PlayCounterProps {
  count: number;
  highlight?: boolean;
  className?: string;
}

export const PlayCounter: React.FC<PlayCounterProps> = ({
  count,
  highlight = false,
  className = '',
}) => {
  const formatted = count.toLocaleString('de-DE');

  return (
    <div
      className={`play-counter inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full border-2 ${
        highlight ? 'play-counter--flash' : ''
      } ${className}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${formatted} Plays`}
    >
      <Headphones className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
      <span className="play-counter-num font-anton text-lg leading-none tabular-nums tracking-wide text-cream">
        {formatted}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
        Plays
      </span>
    </div>
  );
};
