import React from 'react';

const COLOR_MAP = {
  forest: 'bg-gradient-to-r from-[#176B38] to-[#2E8B57]',
  emerald: 'bg-gradient-to-r from-[#10B981] to-[#34D399]',
  teal: 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6]',
  amber: 'bg-gradient-to-r from-[#D97706] to-[#F59E0B]',
};

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'forest',
  height = 'h-2',
  trackColor = 'bg-[#EAF2DF]/80',
  className = '',
}) {
  const safeMax = max > 0 ? max : 100;
  const pct = Math.min(100, Math.max(0, Math.round((value / safeMax) * 100)));
  const barClass = COLOR_MAP[color] || COLOR_MAP.forest;

  return (
    <div
      className={`w-full overflow-hidden rounded-full ${trackColor} ${height} ${className} shadow-inner`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${barClass} shadow-sm`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
