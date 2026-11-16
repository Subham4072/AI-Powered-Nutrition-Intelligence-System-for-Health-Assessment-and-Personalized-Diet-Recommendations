import React from 'react';
import { Flame, Dumbbell, Clock } from 'lucide-react';

function MealIllustration({ type }) {
  if (type === 'breakfast') {
    return (
      <svg viewBox="0 0 120 84" className="h-20 w-28 shrink-0 rounded-2xl overflow-hidden shadow-xs" aria-hidden="true">
        <rect x="0" y="0" width="120" height="84" rx="16" fill="#EAF2DF" />
        <ellipse cx="60" cy="52" rx="36" ry="18" fill="#FFFFFF" stroke="#176B38" strokeWidth="2" />
        <ellipse cx="60" cy="48" rx="28" ry="11" fill="#FEF3C7" />
        <circle cx="48" cy="47" r="4.5" fill="#D97706" />
        <circle cx="60" cy="45" r="4.5" fill="#F59E0B" />
        <circle cx="72" cy="48" r="4" fill="#176B38" />
        {/* Steam / herbal sprig */}
        <path d="M52 28 C52 22, 56 22, 56 16" stroke="#176B38" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M64 28 C64 22, 68 22, 68 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (type === 'lunch') {
    return (
      <svg viewBox="0 0 120 84" className="h-20 w-28 shrink-0 rounded-2xl overflow-hidden shadow-xs" aria-hidden="true">
        <rect x="0" y="0" width="120" height="84" rx="16" fill="#DDF5D9" />
        <circle cx="60" cy="42" r="28" fill="#FFFFFF" stroke="#176B38" strokeWidth="2" />
        <path d="M44 36 C50 28, 62 29, 66 38 C61 44, 49 44, 44 36 Z" fill="#D97706" opacity="0.85" />
        <circle cx="72" cy="48" r="9" fill="#176B38" opacity="0.85" />
        <circle cx="52" cy="52" r="8" fill="#FDE68A" />
        <line x1="20" y1="24" x2="20" y2="60" stroke="#176B38" strokeWidth="2" strokeLinecap="round" />
        <line x1="100" y1="24" x2="100" y2="60" stroke="#176B38" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'snack') {
    return (
      <svg viewBox="0 0 120 84" className="h-20 w-28 shrink-0 rounded-2xl overflow-hidden shadow-xs" aria-hidden="true">
        <rect x="0" y="0" width="120" height="84" rx="16" fill="#EAF2DF" />
        <circle cx="46" cy="45" r="16" fill="#176B38" />
        <path d="M46 29 C47 22, 53 20, 56 23 C52 26, 49 28, 46 29 Z" fill="#2E8B57" />
        <ellipse cx="76" cy="44" rx="8" ry="11" transform="rotate(20 76 44)" fill="#D97706" />
        <ellipse cx="85" cy="55" rx="7.5" ry="10" transform="rotate(-15 85 55)" fill="#B45309" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 84" className="h-20 w-28 shrink-0 rounded-2xl overflow-hidden shadow-xs" aria-hidden="true">
      <rect x="0" y="0" width="120" height="84" rx="16" fill="#DDF5D9" />
      <circle cx="60" cy="42" r="27" fill="#FFFFFF" stroke="#176B38" strokeWidth="2" />
      <circle cx="51" cy="39" r="10" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      <rect x="63" y="32" width="11" height="11" rx="3" fill="#FEF9C3" stroke="#176B38" strokeWidth="1.5" />
      <circle cx="65" cy="53" r="6" fill="#176B38" />
      <circle cx="75" cy="50" r="5" fill="#2E8B57" />
    </svg>
  );
}

export default function FoodCard({
  mealType,
  foodName,
  description,
  calories,
  protein,
  prepTime,
  illustrationType = 'dinner',
}) {
  return (
    <div className="card-floating rounded-3xl p-5 group flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center rounded-full bg-[#DDF5D9]/80 px-3 py-0.5 text-xs font-bold text-[#176B38] border border-[#176B38]/15">
                {mealType}
              </span>
              {prepTime && (
                <span className="inline-flex items-center gap-1 text-xs text-[#617268] font-medium">
                  <Clock className="h-3 w-3 text-[#176B38]" />
                  {prepTime}
                </span>
              )}
            </div>
            <h4 className="mt-2.5 text-base font-extrabold text-[#202B25] font-display group-hover:text-[#176B38] transition-colors">
              {foodName}
            </h4>
            {description && (
              <p className="mt-1 text-xs text-[#617268] line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <MealIllustration type={illustrationType} />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#176B38]/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-[#176B38]">
            <Flame className="h-3.5 w-3.5 text-[#176B38]" />
            {calories} kcal
          </span>
          <span className="text-[#CBD5C8]">|</span>
          <span className="flex items-center gap-1.5 font-bold text-[#202B25]">
            <Dumbbell className="h-3.5 w-3.5 text-[#2E8B57]" />
            {protein}g protein
          </span>
        </div>
      </div>
    </div>
  );
}
