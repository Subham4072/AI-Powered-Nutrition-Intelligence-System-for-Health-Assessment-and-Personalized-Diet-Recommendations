import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  UserCheck,
  UtensilsCrossed,
  ClipboardList,
  FileHeart,
  Sparkles,
  Leaf,
  CalendarDays,
  LineChart,
  X,
} from 'lucide-react';

export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/health-profile', label: 'Health Profile', icon: UserCheck },
  { to: '/food-diary', label: 'Food Diary', icon: UtensilsCrossed },
  { to: '/symptom-assessment', label: 'Symptom Assessment', icon: ClipboardList },
  { to: '/blood-reports', label: 'Blood Reports', icon: FileHeart },
  { to: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { to: '/recommendations#meal-plan', label: 'Diet Plan', icon: CalendarDays },
  { to: '/#progress', label: 'Progress', icon: LineChart },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Dark Forest-Green Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 lg:z-40 w-72 h-screen max-h-screen bg-[#0F3D20] text-white border-r border-[#176B38]/30 flex flex-col transition-transform duration-300 ease-out overflow-hidden shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Subtle Decorative Botanical Corner Elements inside Sidebar */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none text-[#DDF5D9]">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M100 0 C60 0 0 60 0 100 C40 100 100 40 100 0 Z" />
            <path d="M100 0 Q50 50 0 100" stroke="#0F3D20" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="absolute bottom-28 -left-6 w-28 h-28 opacity-10 pointer-events-none text-[#DDF5D9]">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <ellipse cx="50" cy="50" rx="40" ry="20" transform="rotate(-45 50 50)" />
          </svg>
        </div>

        {/* Brand Header */}
        <div className="flex items-center justify-between gap-3 px-6 py-6 border-b border-[#176B38]/30 relative z-10 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#176B38] to-[#258548] text-white shadow-lg ring-1 ring-white/20">
              <Leaf className="h-6 w-6 text-[#DDF5D9]" />
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-white font-display">
                NutriPulse AI
              </span>
              <span className="block text-[11px] font-medium text-[#DDF5D9]/80 tracking-wide">
                Nutrition Intelligence
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-white/70 hover:bg-white/10 hover:text-white lg:hidden transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 space-y-1.5 relative z-10"
          aria-label="Main Navigation"
        >
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#DDF5D9]/60">
            Navigation Menu
          </p>

          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => {
            const isHashLink = to.includes('#');

            return (
              <NavLink
                key={to}
                to={to}
                end={end && !isHashLink}
                onClick={onClose}
                className={({ isActive }) => {
                  const active = !isHashLink && isActive;
                  return `group relative flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-[#DDF5D9] text-[#176B38] font-bold shadow-md shadow-black/10'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`;
                }}
              >
                {({ isActive }) => {
                  const active = !isHashLink && isActive;
                  return (
                    <>
                      <Icon
                        className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                          active ? 'text-[#176B38]' : 'text-[#DDF5D9]/75 group-hover:text-white'
                        }`}
                      />
                      <span className="truncate">{label}</span>
                      {active && (
                        <span className="ml-auto flex h-2 w-2 rounded-full bg-[#176B38]" />
                      )}
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>

        {/* Healthy Food Bowl Illustration Card at bottom of sidebar */}
        <div className="p-4 border-t border-[#176B38]/30 relative z-10 shrink-0">
          <div className="rounded-2xl bg-[#134925]/90 border border-white/10 p-4 shadow-inner relative overflow-hidden">
            <div className="flex items-center gap-3">
              {/* Healthy Food Bowl Illustration */}
              <div className="h-12 w-12 rounded-xl bg-[#0F3D20] p-1.5 shrink-0 flex items-center justify-center border border-white/10 shadow-sm">
                <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
                  {/* Bowl */}
                  <path
                    d="M10 32 C10 46, 20 54, 32 54 C44 54, 54 46, 54 32 Z"
                    fill="#DDF5D9"
                    stroke="#176B38"
                    strokeWidth="2"
                  />
                  {/* Greens */}
                  <circle cx="24" cy="30" r="9" fill="#176B38" />
                  <circle cx="36" cy="28" r="8" fill="#258548" />
                  {/* Avocado slice */}
                  <path d="M22 28 C26 22, 34 22, 36 29 Z" fill="#EAF2DF" stroke="#176B38" strokeWidth="1" />
                  <circle cx="29" cy="27" r="3" fill="#8C5C26" />
                  {/* Berries / Seeds */}
                  <circle cx="43" cy="32" r="3" fill="#DC2626" />
                  <circle cx="47" cy="30" r="2.5" fill="#F59E0B" />
                  {/* Fork line */}
                  <line x1="16" y1="18" x2="22" y2="28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="min-w-0">
                <span className="block text-xs font-bold text-white tracking-wide">
                  Daily Wellness
                </span>
                <span className="block text-[11px] text-[#DDF5D9]/80 truncate mt-0.5">
                  100% Whole Foods Focus
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-white/70 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Optimal Track
              </span>
              <span className="text-[#DDF5D9] font-semibold">Subham</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
