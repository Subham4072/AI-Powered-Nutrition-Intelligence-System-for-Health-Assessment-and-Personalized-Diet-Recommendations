import React from 'react';
import ProgressBar from './ProgressBar';

const ACCENT_STYLES = {
  emerald: {
    iconBg: 'bg-[#DDF5D9] text-[#176B38] border border-[#176B38]/15',
    badge: 'bg-[#DDF5D9]/80 text-[#176B38] border border-[#176B38]/20',
    bar: 'emerald',
  },
  forest: {
    iconBg: 'bg-[#176B38] text-white shadow-sm',
    badge: 'bg-[#176B38]/10 text-[#176B38] border border-[#176B38]/20',
    bar: 'forest',
  },
  teal: {
    iconBg: 'bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20',
    badge: 'bg-[#CCFBF1]/80 text-[#0F766E] border border-[#0F766E]/20',
    bar: 'teal',
  },
  amber: {
    iconBg: 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/20',
    badge: 'bg-[#FEF3C7]/80 text-[#92400E] border border-[#F59E0B]/20',
    bar: 'amber',
  },
};

export default function StatCard({
  icon: Icon,
  label,
  current,
  target,
  unit,
  percentage,
  subtitle,
  accent = 'emerald',
}) {
  const styles = ACCENT_STYLES[accent] || ACCENT_STYLES.emerald;
  const computedPct =
    typeof percentage === 'number'
      ? percentage
      : target > 0
      ? Math.round((current / target) * 100)
      : 0;

  return (
    <div className="card-floating rounded-2xl p-5 group flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {Icon && (
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm ${styles.iconBg}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#617268]">{label}</p>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-[#202B25] font-display">
                  {current.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-[#617268]/80">
                  / {target.toLocaleString()} {unit}
                </span>
              </div>
            </div>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${styles.badge}`}
          >
            {computedPct}%
          </span>
        </div>

        <div className="mt-4">
          <ProgressBar value={current} max={target} color={styles.bar} height="h-2" />
        </div>
      </div>

      {subtitle && (
        <p className="mt-3 text-xs text-[#617268] font-medium flex items-center gap-1.5 pt-2 border-t border-[#176B38]/5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#176B38]/40" />
          {subtitle}
        </p>
      )}
    </div>
  );
}
