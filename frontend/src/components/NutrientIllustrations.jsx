import React from 'react';

/**
 * Modern 3D-styled Nutrient Illustrations for Vitanex AI
 * Designed with rich SVG gradients, smooth volumetric depth, and micro-interactions.
 */

export function CaloriesIllustration({ className = 'w-full h-full' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cal-flame-outer" x1="32" y1="54" x2="32" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="55%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="cal-flame-inner" x1="32" y1="50" x2="32" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#FEF08A" />
        </linearGradient>
        <radialGradient id="cal-glow" cx="32" cy="38" r="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FED7AA" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Radial Energy Glow */}
      <circle cx="32" cy="38" r="22" fill="url(#cal-glow)" className="transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

      {/* Energy Meter Arc Gauge */}
      <path
        d="M14 44 A 21 21 0 1 1 50 44"
        stroke="#FFEDD5"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray="2 6"
        className="opacity-70 group-hover:opacity-100 transition-opacity"
      />
      {/* Active Calorie Energy Gauge Sweep */}
      <path
        d="M14 44 A 21 21 0 0 1 40 14"
        stroke="#F97316"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="transition-all duration-500 group-hover:stroke-[#EA580C]"
      />

      {/* Energy Meter Gauge Tick Nodes */}
      <circle cx="14" cy="44" r="2" fill="#EA580C" />
      <circle cx="21" cy="20" r="1.5" fill="#F97316" />
      <circle cx="32" cy="11" r="2.2" fill="#FBBF24" />
      <circle cx="43" cy="20" r="1.5" fill="#FED7AA" />
      <circle cx="50" cy="44" r="2" fill="#FED7AA" />

      {/* Layered 3D Energy Flame */}
      <g className="transition-transform duration-300 origin-bottom motion-safe:group-hover:scale-105 motion-safe:group-hover:-translate-y-0.5">
        {/* Outer Flame Petal */}
        <path
          d="M32 10 C34 18 44 24 44 37 C44 46.2 38.6 53 32 53 C25.4 53 20 46.2 20 37 C20 28 26 21 28 15 C29.5 20 33 22 33 18 C33 15 32 12 32 10 Z"
          fill="url(#cal-flame-outer)"
          filter="drop-shadow(0 4px 6px rgba(234, 88, 12, 0.35))"
        />

        {/* Shading Contour for 3D Depth */}
        <path
          d="M29 24 C33 28 40 31 38 40 C36.5 46 33 49 29 50 C37 48 41 42 41 35 C41 27 35 22 29 24 Z"
          fill="#C2410C"
          opacity="0.2"
        />

        {/* Inner Glowing Flame Core */}
        <path
          d="M32 24 C33.5 29 39 33 39 40 C39 45.8 35.8 49.5 32 49.5 C28.2 49.5 25 45.8 25 40 C25 34 29 30 30 26 C31 29 32.5 29 32.5 27 C32.5 25.5 32 24.5 32 24 Z"
          fill="url(#cal-flame-inner)"
          className="motion-safe:animate-pulse"
        />

        {/* White-hot specular spark */}
        <ellipse cx="32" cy="41" rx="3.5" ry="5.5" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* Floating Sparkle Particles */}
      <circle cx="18" cy="27" r="1.5" fill="#FBBF24" className="motion-safe:animate-ping opacity-60" style={{ animationDuration: '3s' }} />
      <path
        d="M48 20 L49 22 L51 23 L49 24 L48 26 L47 24 L45 23 L47 22 Z"
        fill="#F97316"
        opacity="0.85"
        className="transition-transform duration-300 group-hover:scale-125"
      />
    </svg>
  );
}

export function ProteinIllustration({ className = 'w-full h-full' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="prot-chicken" x1="16" y1="18" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="40%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
        <linearGradient id="prot-egg-white" x1="28" y1="18" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <radialGradient id="prot-yolk" cx="39" cy="36" r="9" fx="37" fy="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>

      {/* Base Drop Shadow */}
      <ellipse cx="33" cy="53" rx="19" ry="4" fill="#166534" opacity="0.14" />

      {/* Background: Roasted Herb Chicken Breast Fillet */}
      <g className="transition-transform duration-300 origin-center group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
        <path
          d="M12 36 C10 26 20 18 32 18 C38 18 46 22 47 30 C48 37 42 45 32 46 C21 47 13 42 12 36 Z"
          fill="url(#prot-chicken)"
          filter="drop-shadow(0 3px 6px rgba(194, 65, 12, 0.28))"
        />
        {/* Searing Grill Lines on Chicken */}
        <path d="M19 26 Q 24 24 29 28" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <path d="M22 34 Q 28 32 34 35" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <path d="M28 41 Q 33 39 39 42" stroke="#7C2D12" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
      </g>

      {/* Foreground: 3D Halved Boiled Egg */}
      <g className="transition-transform duration-300 origin-center motion-safe:group-hover:scale-105 motion-safe:group-hover:-translate-y-1">
        {/* Egg White Oval */}
        <ellipse
          cx="39"
          cy="37"
          rx="15"
          ry="17"
          transform="rotate(16 39 37)"
          fill="url(#prot-egg-white)"
          filter="drop-shadow(0 4px 8px rgba(15, 23, 42, 0.18))"
        />
        {/* Gloss Rim Highlight */}
        <ellipse
          cx="38.5"
          cy="36.5"
          rx="13.5"
          ry="15.5"
          transform="rotate(16 38.5 36.5)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          fill="none"
          opacity="0.8"
        />

        {/* Golden Yolk Sphere */}
        <circle cx="40" cy="38" r="8.8" fill="url(#prot-yolk)" filter="drop-shadow(0 2px 4px rgba(217, 119, 6, 0.35))" />
        {/* 3D Specular Highlight on Yolk */}
        <ellipse cx="37" cy="34" rx="2.8" ry="1.8" transform="rotate(-25 37 34)" fill="#FFFFFF" opacity="0.85" />
        <circle cx="43" cy="41" r="1" fill="#FEF08A" opacity="0.75" />
      </g>

      {/* Fresh Green Herb Sprig */}
      <g className="transition-transform duration-300 group-hover:rotate-6 origin-bottom-left">
        <path d="M16 46 Q 14 39 17 33 Q 20 37 18 44" fill="#166534" stroke="#10B981" strokeWidth="0.8" />
        <circle cx="15" cy="35" r="2.2" fill="#10B981" />
        <circle cx="18" cy="31" r="1.8" fill="#10B981" />
      </g>
    </svg>
  );
}

export function CarbohydratesIllustration({ className = 'w-full h-full' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="carb-bowl" x1="16" y1="36" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="70%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#115E59" />
        </linearGradient>
        <linearGradient id="carb-wheat" x1="42" y1="12" x2="56" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="carb-rice" x1="20" y1="28" x2="44" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>

      {/* Soft Base Shadow */}
      <ellipse cx="32" cy="54" rx="19" ry="4" fill="#0F766E" opacity="0.14" />

      {/* Golden Wheat Stalk (Background) */}
      <g className="transition-transform duration-300 origin-bottom-right motion-safe:group-hover:rotate-6 motion-safe:group-hover:-translate-y-0.5">
        <path d="M42 46 Q 48 32 46 12" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
        {/* Wheat Grains & Awns */}
        <ellipse cx="44" cy="15" rx="3.5" ry="2" transform="rotate(-30 44 15)" fill="url(#carb-wheat)" />
        <line x1="44" y1="15" x2="40" y2="8" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />

        <ellipse cx="48" cy="19" rx="3.5" ry="2" transform="rotate(35 48 19)" fill="url(#carb-wheat)" />
        <line x1="48" y1="19" x2="55" y2="13" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />

        <ellipse cx="43" cy="24" rx="3.8" ry="2.2" transform="rotate(-30 43 24)" fill="url(#carb-wheat)" />
        <line x1="43" y1="24" x2="38" y2="18" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />

        <ellipse cx="48" cy="28" rx="3.8" ry="2.2" transform="rotate(35 48 28)" fill="url(#carb-wheat)" />
        <line x1="48" y1="28" x2="56" y2="23" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />

        <ellipse cx="44" cy="33" rx="3.5" ry="2.2" transform="rotate(-25 44 33)" fill="url(#carb-wheat)" />
        <ellipse cx="48" cy="37" rx="3.5" ry="2.2" transform="rotate(30 48 37)" fill="url(#carb-wheat)" />
      </g>

      {/* Steaming Fluffy Rice & Grain Bowl (Foreground) */}
      <g className="transition-transform duration-300 origin-center motion-safe:group-hover:scale-105 motion-safe:group-hover:-translate-y-0.5">
        {/* Cooked Rice Grains Mound */}
        <path
          d="M17 38 C17 30 23 26 32 26 C41 26 47 30 47 38 Z"
          fill="url(#carb-rice)"
          filter="drop-shadow(0 2px 4px rgba(15, 23, 42, 0.08))"
        />

        {/* Rice Grain Details */}
        <ellipse cx="27" cy="31" rx="2.5" ry="1.2" transform="rotate(15 27 31)" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
        <ellipse cx="34" cy="29" rx="2.8" ry="1.3" transform="rotate(-10 34 29)" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
        <ellipse cx="39" cy="33" rx="2.4" ry="1.2" transform="rotate(30 39 33)" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
        <ellipse cx="23" cy="35" rx="2.6" ry="1.2" transform="rotate(-20 23 35)" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
        <ellipse cx="32" cy="35" rx="2.7" ry="1.3" transform="rotate(5 32 35)" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />

        {/* Ceramic Teal Bowl */}
        <path
          d="M15 37 C15 48 22 53 32 53 C42 53 49 48 49 37 Z"
          fill="url(#carb-bowl)"
          filter="drop-shadow(0 4px 8px rgba(15, 118, 110, 0.3))"
        />
        {/* Rim Inner Gloss Highlight */}
        <ellipse cx="32" cy="37" rx="17" ry="2.8" fill="#2DD4BF" opacity="0.75" />
        <ellipse cx="32" cy="37" rx="16" ry="2.2" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.6" />

        {/* Wholesome Grain Roll on Edge */}
        <ellipse cx="16" cy="42" rx="4" ry="3" transform="rotate(-15 16 42)" fill="#D97706" opacity="0.9" />
        <line x1="14" y1="41" x2="18" y2="43" stroke="#FDE68A" strokeWidth="0.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function FatIllustration({ className = 'w-full h-full' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fat-avo-skin" x1="18" y1="16" x2="46" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14532D" />
          <stop offset="100%" stopColor="#052E16" />
        </linearGradient>
        <linearGradient id="fat-avo-flesh" x1="22" y1="20" x2="42" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D9F99D" />
          <stop offset="45%" stopColor="#BEF264" />
          <stop offset="100%" stopColor="#65A30D" />
        </linearGradient>
        <radialGradient id="fat-seed" cx="33" cy="38" r="8" fx="31" fy="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A16207" />
          <stop offset="60%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </radialGradient>
        <linearGradient id="fat-oil" x1="48" y1="16" x2="48" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="32" cy="53" rx="18" ry="4" fill="#14532D" opacity="0.14" />

      {/* 3D Cut Avocado Half (Center) */}
      <g className="transition-transform duration-300 origin-center motion-safe:group-hover:scale-105 motion-safe:group-hover:-translate-y-1">
        {/* Dark Green Pebbled Skin */}
        <path
          d="M32 14 C42 14 48 24 47 38 C46 48 39 53 32 53 C25 53 18 48 17 38 C16 24 22 14 32 14 Z"
          fill="url(#fat-avo-skin)"
          filter="drop-shadow(0 4px 8px rgba(20, 83, 45, 0.28))"
        />

        {/* Velvety Lime Green Flesh */}
        <path
          d="M32 16.5 C40 16.5 45 25 44 37.5 C43 46 37.5 50.5 32 50.5 C26.5 50.5 21 46 20 37.5 C19 25 24 16.5 32 16.5 Z"
          fill="url(#fat-avo-flesh)"
        />

        {/* Inner Flesh Tone */}
        <ellipse cx="32" cy="38.5" rx="9" ry="9.5" fill="#ECFCCB" opacity="0.75" />

        {/* 3D Glossy Avocado Seed */}
        <circle cx="32" cy="38.5" r="7.5" fill="url(#fat-seed)" filter="drop-shadow(0 2px 4px rgba(69, 26, 3, 0.35))" />
        {/* Seed Specular Gloss Highlight */}
        <path
          d="M29 34.5 Q 33 32.5 35 34"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="30" cy="42" r="0.8" fill="#FEF08A" opacity="0.6" />
      </g>

      {/* Whole Natural Almond Nut (Left) */}
      <g className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-rotate-6 origin-center">
        <path
          d="M15 42 C11 36 12 30 18 32 C22 34 23 40 19 44 C16 46 15 44 15 42 Z"
          fill="#9A3412"
          filter="drop-shadow(0 2px 3px rgba(154, 52, 18, 0.2))"
        />
        <path d="M14 36 Q 16 38 18 42" stroke="#FDBA74" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
      </g>

      {/* Shimmering Golden Olive Oil Droplet (Right) */}
      <g className="transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:scale-110 origin-center">
        <path
          d="M49 16 C49 16 54 23 54 26 C54 28.8 51.8 31 49 31 C46.2 31 44 28.8 44 26 C44 23 49 16 49 16 Z"
          fill="url(#fat-oil)"
          filter="drop-shadow(0 3px 6px rgba(234, 179, 8, 0.45))"
        />
        {/* Droplet Refraction Highlight */}
        <ellipse cx="47.5" cy="25" rx="1.5" ry="2.5" transform="rotate(-20 47.5 25)" fill="#FFFFFF" opacity="0.9" />
      </g>
    </svg>
  );
}

export const NUTRIENT_ILLUSTRATIONS = {
  calories: CaloriesIllustration,
  protein: ProteinIllustration,
  carbs: CarbohydratesIllustration,
  fat: FatIllustration,
};

