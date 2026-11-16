import React from 'react';
import vitanexLogo from '../assets/vitanex-logo.png';

/**
 * Official Vitanex AI Brand Logo Component
 *
 * @param {string} size - Sizing class for the icon/badge (e.g. 'h-12 w-12', 'h-10 w-10')
 * @param {boolean} withText - Whether to render "Vitanex AI" and subtitle beside the mark
 * @param {boolean} showSubtitle - Whether to show "Intelligent Nutrition & Health"
 * @param {string} variant - 'badge' (white rounded container with soft shadow, optimal for dark backgrounds) or 'plain' (transparent mark)
 * @param {string} className - Additional container styling classes
 */
export default function VitanexLogo({
  size = 'h-12 w-12',
  withText = false,
  showSubtitle = true,
  variant = 'badge',
  className = '',
  imgClassName = '',
}) {
  const isBadge = variant === 'badge';

  const mark = (
    <div
      className={`${size} ${
        isBadge
          ? 'bg-white rounded-2xl shadow-md ring-1 ring-white/20 p-1.5 flex items-center justify-center shrink-0'
          : 'flex items-center justify-center shrink-0'
      } ${className}`}
    >
      <img
        src={vitanexLogo}
        alt="Vitanex AI Logo"
        className={`w-full h-full object-contain ${imgClassName}`}
        loading="eager"
      />
    </div>
  );

  if (!withText) {
    return mark;
  }

  return (
    <div className="flex items-center gap-3">
      {mark}
      <div className="min-w-0">
        <span className="block text-lg font-bold tracking-tight text-white font-display">
          Vitanex AI
        </span>
        {showSubtitle && (
          <span className="block text-[11px] font-medium text-[#DDF5D9]/80 tracking-wide truncate">
            Intelligent Nutrition &amp; Health
          </span>
        )}
      </div>
    </div>
  );
}

