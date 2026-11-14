import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  UtensilsCrossed,
  ClipboardList,
  FileHeart,
  Sparkles,
  Leaf,
  X,
} from 'lucide-react';

export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/health-profile', label: 'Health Profile', icon: UserCheck },
  { to: '/food-diary', label: 'Food Diary', icon: UtensilsCrossed },
  { to: '/symptom-assessment', label: 'Symptom Assessment', icon: ClipboardList },
  { to: '/blood-reports', label: 'Blood Reports', icon: FileHeart },
  { to: '/recommendations', label: 'Recommendations', icon: Sparkles },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/35 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer / Sticky Desktop Rail */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-68 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-200 ease-out lg:static lg:translate-x-0 lg:z-auto shrink-0 ${
          isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#166534] text-white shadow-sm">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-base font-bold tracking-tight text-[#1E293B]">
                NutriPulse AI
              </span>
              <span className="block text-[11px] font-medium text-slate-400">
                Nutrition Intelligence
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-5 space-y-1.5" aria-label="Main Navigation">
          <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#DCFCE7] text-[#166534] font-semibold shadow-2xs'
                    : 'text-slate-600 hover:bg-[#F8FAF7] hover:text-[#166534]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                      isActive ? 'text-[#166534]' : 'text-slate-400 group-hover:text-[#10B981]'
                    }`}
                  />
                  <span className="truncate">{label}</span>
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#166534]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Prototype Summary Card */}
        <div className="p-4 border-t border-slate-100">
          <div className="rounded-xl bg-[#F8FAF7] border border-emerald-100 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#166534]">Prototype v1.0</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                Demo Data
              </span>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">
              UI preview with sample nutrition &amp; health records for Subham.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

