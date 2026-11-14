import React from 'react';
import { Flame, Dumbbell, Clock } from 'lucide-react';

function MealIllustration({ type }) {
  if (type === 'breakfast') {
    return (
      <svg viewBox="0 0 120 84" className="h-20 w-28 shrink-0" aria-hidden="true">
        <rect x="6" y="6" width="108" height="72" rx="14" fill="#DCFCE7" />
        <ellipse cx="60" cy="50" rx="34" ry="18" fill="#FFFFFF" stroke="#166534" strokeWidth="2.5" />
        <ellipse cx="60" cy="46" rx="26" ry="11" fill="#FEF3C7" />
        <circle cx="48" cy="45" r="4.5" fill="#F59E0B" />
        <circle cx="60" cy="43" r="4.5" fill="#FBBF24" />
        <circle cx="71" cy="46" r="4" fill="#10B981" />
        <path d="M52 29 C52 23, 56 23, 56 18" stroke="#166534" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M64 29 C64 23, 68 23, 68 18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (type === 'lunch') {
    return (
      <svg viewBox="0 0 120 84" className="h-20 w-28 shrink-0" aria-hidden="true">
        <rect x="6" y="6" width="108" height="72" rx="14" fill="#ECFDF5" />
        <circle cx="60" cy="43" r="26" fill="#FFFFFF" stroke="#166534" strokeWidth="2.5" />
        <path d="M44 37 C50 30, 62 31, 66 39 C61 45, 49 45, 44 37 Z" fill="#F59E0B" opacity="0.85" />
        <circle cx="72" cy="48" r="9" fill="#10B981" opacity="0.85" />
        <circle cx="52" cy="52" r="8" fill="#FDE68A" />
        <line x1="22" y1="26" x2="22" y2="58" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="98" y1="26" x2="98" y2="58" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'snack') {
    return (
      <svg viewBox="0 0 120 84" className="h-20 w-28 shrink-0" aria-hidden="true">
        <rect x="6" y="6" width="108" height="72" rx="14" fill="#F0FDF4" />
        <circle cx="48" cy="45" r="15" fill="#10B981" />
        <path d="M48 30 C49 23, 55 21, 58 24 C54 27, 51 29, 48 30 Z" fill="#166534" />
        <ellipse cx="75" cy="44" rx="7" ry="10" transform="rotate(20 75 44)" fill="#D97706" />
        <ellipse cx="83" cy="54" rx="6.5" ry="9" transform="rotate(-15 83 54)" fill="#B45309" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 84" className="h-20 w-28 shrink-0" aria-hidden="true">
      <rect x="6" y="6" width="108" height="72" rx="14" fill="#DCFCE7" />
      <circle cx="60" cy="44" r="25" fill="#FFFFFF" stroke="#166534" strokeWidth="2.5" />
      <circle cx="52" cy="41" r="10" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      <rect x="63" y="34" width="10" height="10" rx="2" fill="#FEF9C3" stroke="#166534" strokeWidth="1.5" />
      <circle cx="64" cy="54" r="6" fill="#10B981" />
      <circle cx="74" cy="51" r="5" fill="#166534" />
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
    <div className="group rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-semibold text-[#166534]">
                {mealType}
              </span>
              {prepTime && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="h-3 w-3" />
                  {prepTime}
                </span>
              )}
            </div>
            <h4 className="mt-2.5 text-base font-bold text-[#1E293B] group-hover:text-[#166534] transition-colors">
              {foodName}
            </h4>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{description}</p>
          </div>
          <MealIllustration type={illustrationType} />
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1E293B]">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Flame className="h-3.5 w-3.5" />
          </span>
          <span>~{calories} kcal</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#166534]">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#166534]">
            <Dumbbell className="h-3.5 w-3.5" />
          </span>
          <span>{protein} g Protein</span>
        </div>
      </div>
    </div>
  );
}

