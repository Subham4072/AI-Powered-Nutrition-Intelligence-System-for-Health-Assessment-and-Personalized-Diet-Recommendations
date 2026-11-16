import React, { useState, useRef, useEffect } from 'react';
import { Bell, Calendar, Menu, ChevronRight, Sparkles } from 'lucide-react';
import { SAMPLE_NOTIFICATIONS, USER_PROFILE } from '../data/mockData';

export default function Navbar({ pageTitle, onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F0]/85 backdrop-blur-md border-b border-[#176B38]/10 px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Breadcrumb / Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex items-center justify-center rounded-2xl p-2.5 text-[#202B25] hover:bg-[#DDF5D9]/60 hover:text-[#176B38] lg:hidden transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <span className="hover:text-[#176B38] transition-colors cursor-default">NutriPulse AI</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              <span className="text-[#176B38] font-semibold truncate">{pageTitle}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#202B25] font-display tracking-tight truncate">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Right: Date, Notification Bell, User Profile Pill */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Current Date Pill */}
          <div className="hidden md:flex items-center gap-2 rounded-2xl bg-white/80 border border-[#176B38]/10 px-3.5 py-2 text-xs font-semibold text-[#202B25] shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-[#176B38]" />
            <span>{formattedDate}</span>
          </div>

          {/* Notification Icon (UI Popover) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setNotifOpen((prev) => !prev)}
              className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-[#176B38]/15 bg-white/90 text-[#202B25] hover:bg-[#DDF5D9]/50 hover:text-[#176B38] shadow-sm transition-all duration-200"
              aria-label="View notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-[#176B38] ring-2 ring-white animate-pulse" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-3xl bg-white/95 backdrop-blur-md border border-[#176B38]/15 shadow-2xl overflow-hidden z-40">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-[#FAF8F0]">
                  <span className="text-sm font-bold text-[#202B25]">Notifications</span>
                  {unreadCount > 0 ? (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="text-xs font-semibold text-[#176B38] hover:underline transition-colors"
                    >
                      Mark all read
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400">All caught up</span>
                  )}
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`px-5 py-3.5 transition-colors ${
                        item.unread ? 'bg-[#DDF5D9]/20' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-[#202B25]">{item.title}</p>
                        <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Summary */}
          <div className="flex items-center gap-3 pl-2 sm:pl-3 sm:border-l border-[#176B38]/15">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#DDF5D9] text-[#176B38] text-sm font-bold border border-[#176B38]/20 shadow-sm">
              S
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-[#202B25] leading-tight">
                {USER_PROFILE.name}
              </p>
              <p className="text-[11px] font-medium text-[#176B38] leading-tight mt-0.5 flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5" />
                {USER_PROFILE.shortGoal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
