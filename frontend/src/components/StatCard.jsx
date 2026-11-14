import React from 'react';
import ProgressBar from './ProgressBar';

const ACCENT_STYLES = {
  emerald: {
    iconBg: 'bg-[#DCFCE7] text-[#166534]',
    badge: 'bg-emerald-50 text-[#166534]',
    bar: 'emerald',
  },
  forest: {
    iconBg: 'bg-[#DCFCE7] text-[#166534]',
    badge: 'bg-[#DCFCE7] text-[#166534]',
    bar: 'forest',
  },
  teal: {
    iconBg: 'bg-teal-50 text-teal-700',
    badge: 'bg-teal-50 text-teal-700',
    bar: 'teal',
  },
  amber: {
    iconBg: 'bg-amber-50 text-amber-700',
    badge: 'bg-amber-50 text-amber-700',
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
    <div className="group rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm hover:shadow-md hover:border-emerald-200/80 transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {Icon && (
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${styles.iconBg}`}
            >
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#1E293B]">
                {current.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-slate-400">
                / {target.toLocaleString()} {unit}
              </span>
            </div>
          </div>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
        >
          {computedPct}%
        </span>
      </div>

      <div className="mt-4">
        <ProgressBar value={current} max={target} color={styles.bar} height="h-2" />
      </div>

      {subtitle && (
        <p className="mt-2.5 text-xs text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}

