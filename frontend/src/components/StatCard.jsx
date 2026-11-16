import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import {
  NUTRIENT_ILLUSTRATIONS,
  CaloriesIllustration,
  ProteinIllustration,
  CarbohydratesIllustration,
  FatIllustration,
} from './NutrientIllustrations';
import { Info } from 'lucide-react';

const DEFAULT_TOOLTIPS = {
  calories: 'Total energy consumed today.',
  protein: 'Protein intake compared with your daily target.',
  carbs: 'Carbohydrate consumption compared with your daily target.',
  fat: 'Fat consumption compared with your daily target.',
};

const ACCENT_STYLES = {
  emerald: {
    illustrationBox:
      'bg-gradient-to-br from-[#FFEDD5]/80 via-[#FFF7ED] to-[#FEF3C7]/90 border border-[#F97316]/20 group-hover:border-[#F97316]/50 group-hover:shadow-[0_8px_20px_-4px_rgba(249,115,22,0.3)]',
    badge: 'bg-[#FFEDD5] text-[#C2410C] border border-[#F97316]/25',
    bar: 'amber',
    activeGlow: 'ring-2 ring-[#F97316]/40',
  },
  forest: {
    illustrationBox:
      'bg-gradient-to-br from-[#DDF5D9] via-[#EAF2DF] to-[#FAF8F0] border border-[#176B38]/20 group-hover:border-[#176B38]/50 group-hover:shadow-[0_8px_20px_-4px_rgba(23,107,56,0.25)]',
    badge: 'bg-[#DDF5D9] text-[#176B38] border border-[#176B38]/25',
    bar: 'forest',
    activeGlow: 'ring-2 ring-[#176B38]/40',
  },
  teal: {
    illustrationBox:
      'bg-gradient-to-br from-[#CCFBF1] via-[#E0F2FE]/70 to-[#F0FDFA] border border-[#0D9488]/20 group-hover:border-[#0D9488]/50 group-hover:shadow-[0_8px_20px_-4px_rgba(13,148,136,0.25)]',
    badge: 'bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/25',
    bar: 'teal',
    activeGlow: 'ring-2 ring-[#0D9488]/40',
  },
  amber: {
    illustrationBox:
      'bg-gradient-to-br from-[#FEF9C3] via-[#ECFCCB]/80 to-[#F7FEE7] border border-[#84CC16]/25 group-hover:border-[#84CC16]/50 group-hover:shadow-[0_8px_20px_-4px_rgba(101,163,13,0.3)]',
    badge: 'bg-[#FEF9C3] text-[#854D0E] border border-[#EAB308]/25',
    bar: 'amber',
    activeGlow: 'ring-2 ring-[#84CC16]/40',
  },
};

export default function StatCard({
  id,
  icon: Icon,
  label,
  current,
  target,
  unit,
  percentage,
  subtitle,
  accent = 'emerald',
  tooltip,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Determine illustration component based on nutrient id or fallback icon
  const IllustrationComponent = id && NUTRIENT_ILLUSTRATIONS[id] ? NUTRIENT_ILLUSTRATIONS[id] : null;

  const styles = ACCENT_STYLES[accent] || ACCENT_STYLES.emerald;
  const computedPct =
    typeof percentage === 'number'
      ? percentage
      : target > 0
      ? Math.round((current / target) * 100)
      : 0;

  const tooltipText = tooltip || (id && DEFAULT_TOOLTIPS[id]) || `${label} tracking data`;

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`${label}: ${current.toLocaleString()} of ${target.toLocaleString()} ${unit} consumed (${computedPct}%)`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`card-floating rounded-3xl p-5 group relative flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.98] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B38] overflow-visible ${
        isPressed ? styles.activeGlow : ''
      }`}
    >
      {/* Floating Interactive Tooltip */}
      <div
        role="tooltip"
        className={`pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 z-30 transition-all duration-200 ease-out whitespace-nowrap ${
          isHovered
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-1.5 scale-95'
        }`}
      >
        <div className="rounded-xl bg-[#202B25]/95 text-white px-3 py-1 text-[11px] font-semibold shadow-xl backdrop-blur-md border border-white/10 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>{tooltipText}</span>
        </div>
        <div className="w-2 h-2 bg-[#202B25]/95 rotate-45 mx-auto -mt-1 border-r border-b border-white/10" />
      </div>

      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* 3D Nutrient Illustration Container */}
            <div
              className={`relative flex h-13 w-13 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl p-1.5 transition-all duration-300 shadow-2xs ${styles.illustrationBox}`}
            >
              {IllustrationComponent ? (
                <IllustrationComponent className="w-full h-full object-contain" />
              ) : Icon ? (
                <div className="flex items-center justify-center text-[#176B38]">
                  <Icon className="h-6 w-6" />
                </div>
              ) : null}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#617268] truncate">
                  {label}
                </p>
                <span
                  title={tooltipText}
                  className="text-[#617268]/60 hover:text-[#176B38] transition-colors"
                >
                  <Info className="h-3 w-3" />
                </span>
              </div>

              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-[#202B25] font-display">
                  {current.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-[#617268]/80 truncate">
                  / {target.toLocaleString()} {unit}
                </span>
              </div>
            </div>
          </div>

          {/* Percentage Target Badge */}
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-extrabold shrink-0 shadow-2xs transition-transform duration-200 group-hover:scale-105 ${styles.badge}`}
          >
            {computedPct}%
          </span>
        </div>

        {/* Dynamic Progress Bar with Hover Accent */}
        <div className="mt-4 transition-all duration-300 group-hover:scale-[1.01]">
          <ProgressBar
            value={current}
            max={target}
            color={styles.bar}
            height="h-2"
            className="transition-all duration-300 group-hover:shadow-xs"
          />
        </div>
      </div>

      {/* Subtitle / Remaining Indicator */}
      {subtitle && (
        <p className="mt-3 text-xs text-[#617268] font-medium flex items-center justify-between pt-2.5 border-t border-[#176B38]/5">
          <span className="flex items-center gap-1.5 truncate">
            <span className="h-1.5 w-1.5 rounded-full bg-[#176B38]/40 group-hover:bg-[#176B38] transition-colors shrink-0" />
            <span className="truncate">{subtitle}</span>
          </span>
          <span className="text-[10px] text-[#176B38] font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            View
          </span>
        </p>
      )}
    </div>
  );
}
