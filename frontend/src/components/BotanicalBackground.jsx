import React from 'react';

/**
 * BotanicalBackground
 * Renders a layered, illustrated wellness background with natural leaves, fruits,
 * vegetables, and botanical patterns behind the entire application.
 * Uses pointer-events: none and z-0 so it never interferes with user interactions.
 */
export default function BotanicalBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FAF8F0]"
      aria-hidden="true"
    >
      {/* 1. Underlying Soft Natural Gradient */}
      <div className="absolute inset-0 bg-radial from-[#FAF8F0] via-[#F4F1E6] to-[#EBE7D8] opacity-90" />

      {/* 2. Seamless Botanical Leaves Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-18 text-[#176B38]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="botanical-wellness-pattern"
            x="0"
            y="0"
            width="220"
            height="220"
            patternUnits="userSpaceOnUse"
          >
            {/* Monstera leaf outline */}
            <path
              d="M50 30 C70 10, 100 25, 95 60 C90 95, 60 100, 45 75 C30 50, 30 50, 50 30 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path d="M50 30 Q70 60 95 60" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M60 45 Q75 40 85 45" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <path d="M65 58 Q72 65 80 72" stroke="currentColor" strokeWidth="0.8" fill="none" />

            {/* Olive branch / herb sprig */}
            <path d="M140 40 Q170 60 185 100" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <ellipse cx="148" cy="46" rx="8" ry="4" transform="rotate(-30 148 46)" fill="#DDF5D9" opacity="0.6" stroke="currentColor" strokeWidth="0.8" />
            <ellipse cx="162" cy="62" rx="9" ry="4.5" transform="rotate(25 162 62)" fill="#DDF5D9" opacity="0.6" stroke="currentColor" strokeWidth="0.8" />
            <ellipse cx="174" cy="80" rx="8.5" ry="4" transform="rotate(-15 174 80)" fill="#DDF5D9" opacity="0.6" stroke="currentColor" strokeWidth="0.8" />
            <ellipse cx="185" cy="100" rx="8" ry="4" transform="rotate(35 185 100)" fill="#DDF5D9" opacity="0.6" stroke="currentColor" strokeWidth="0.8" />

            {/* Avocado Half illustration */}
            <g transform="translate(130, 130) scale(0.7)">
              <path
                d="M30 5 C50 5, 60 30, 55 55 C50 80, 10 80, 5 55 C0 30, 10 5, 30 5 Z"
                fill="#EAF2DF"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="30" cy="50" r="14" fill="#C89D66" opacity="0.4" stroke="#8C5C26" strokeWidth="1.2" />
            </g>

            {/* Citrus Lemon / Orange Slice */}
            <g transform="translate(25, 140) scale(0.65)">
              <circle cx="35" cy="35" r="30" fill="#FEF3C7" opacity="0.5" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="35" cy="35" r="26" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="35" y1="5" x2="35" y2="65" stroke="currentColor" strokeWidth="0.8" />
              <line x1="5" y1="35" x2="65" y2="35" stroke="currentColor" strokeWidth="0.8" />
              <line x1="14" y1="14" x2="56" y2="56" stroke="currentColor" strokeWidth="0.8" />
              <line x1="14" y1="56" x2="56" y2="14" stroke="currentColor" strokeWidth="0.8" />
            </g>

            {/* Floating Berry / Seed dots */}
            <circle cx="110" cy="110" r="3" fill="#176B38" opacity="0.4" />
            <circle cx="118" cy="115" r="2.5" fill="#176B38" opacity="0.3" />
            <circle cx="112" cy="122" r="3" fill="#176B38" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#botanical-wellness-pattern)" />
      </svg>

      {/* 3. Large Decorative Floating Botanical Corner Illustrations */}
      {/* Top Right Monstera & Palm Leaves */}
      <div className="absolute -top-16 -right-16 w-96 h-96 opacity-25 text-[#176B38] filter blur-[0.5px]">
        <svg viewBox="0 0 300 300" className="w-full h-full fill-none stroke-currentColor">
          <path
            d="M200 40 C280 90, 310 220, 240 280 C170 340, 70 290, 60 210 C50 130, 120 -10, 200 40 Z"
            fill="#DDF5D9"
            opacity="0.45"
            strokeWidth="2"
          />
          <path d="M80 200 Q180 140 230 50" strokeWidth="2.5" />
          <path d="M120 180 Q170 185 220 220" strokeWidth="1.8" />
          <path d="M150 150 Q220 140 260 170" strokeWidth="1.8" />
          <path d="M170 110 Q230 90 270 100" strokeWidth="1.8" />
        </svg>
      </div>

      {/* Bottom Left Botanical Sprigs & Foliage */}
      <div className="absolute -bottom-20 -left-16 w-[420px] h-[420px] opacity-20 text-[#176B38]">
        <svg viewBox="0 0 320 320" className="w-full h-full fill-none stroke-currentColor">
          <path d="M30 310 Q140 200 240 120" strokeWidth="3" />
          <ellipse cx="100" cy="240" rx="28" ry="14" transform="rotate(-40 100 240)" fill="#EAF2DF" opacity="0.8" strokeWidth="1.5" />
          <ellipse cx="145" cy="195" rx="32" ry="15" transform="rotate(30 145 195)" fill="#DDF5D9" opacity="0.8" strokeWidth="1.5" />
          <ellipse cx="190" cy="155" rx="30" ry="14" transform="rotate(-35 190 155)" fill="#EAF2DF" opacity="0.8" strokeWidth="1.5" />
          <ellipse cx="230" cy="125" rx="26" ry="12" transform="rotate(25 230 125)" fill="#DDF5D9" opacity="0.8" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Mid Right Floating Avocado & Leaf Organic Accents */}
      <div className="hidden lg:block absolute top-1/2 -right-12 w-64 h-64 -translate-y-1/2 opacity-20 text-[#176B38]">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-currentColor">
          <circle cx="100" cy="100" r="80" fill="#FAF8F0" opacity="0.7" strokeWidth="1.5" strokeDasharray="6 6" />
          <path
            d="M100 40 C130 40, 150 70, 145 110 C140 150, 60 150, 55 110 C50 70, 70 40, 100 40 Z"
            fill="#EAF2DF"
            strokeWidth="2"
          />
          <circle cx="100" cy="105" r="22" fill="#C89D66" opacity="0.6" stroke="#8C5C26" strokeWidth="2" />
        </svg>
      </div>

      {/* 4. Ambient Soft Light Glow Overlay */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#DDF5D9]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#EAF2DF]/40 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

