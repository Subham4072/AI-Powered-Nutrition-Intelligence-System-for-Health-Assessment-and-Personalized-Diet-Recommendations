import React from 'react';

const COLOR_MAP = {
  forest: 'bg-[#166534]',
  emerald: 'bg-[#10B981]',
  teal: 'bg-teal-600',
  amber: 'bg-amber-500',
};

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'emerald',
  height = 'h-2.5',
  trackColor = 'bg-slate-100',
  className = '',
}) {
  const safeMax = max > 0 ? max : 100;
  const pct = Math.min(100, Math.max(0, Math.round((value / safeMax) * 100)));
  const barClass = COLOR_MAP[color] || COLOR_MAP.emerald;

  return (
    <div
      className={`w-full overflow-hidden rounded-full ${trackColor} ${height} ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${barClass}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

