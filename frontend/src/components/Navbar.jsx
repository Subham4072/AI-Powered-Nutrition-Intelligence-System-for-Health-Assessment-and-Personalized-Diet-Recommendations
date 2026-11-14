import React, { useState, useRef, useEffect } from 'react';
import { Bell, Calendar, Menu, ChevronRight } from 'lucide-react';
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
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Hamburger & Breadcrumb / Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-[#F8FAF7] hover:text-[#166534] lg:hidden transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <span>NutriPulse</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[#166534] font-medium truncate">{pageTitle}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-[#1E293B] truncate">{pageTitle}</h1>
          </div>
        </div>

        {/* Right: Date, Notification Bell, User Info */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Current Date */}
          <div className="hidden md:flex items-center gap-2 rounded-xl bg-[#F8FAF7] border border-slate-200/70 px-3 py-1.5 text-xs font-medium text-slate-600">
            <Calendar className="h-3.5 w-3.5 text-[#166534]" />
            <span>{formattedDate}</span>
          </div>

          {/* Notification Icon (UI only) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setNotifOpen((prev) => !prev)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-[#F8FAF7] hover:text-[#166534] transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-[#10B981] ring-2 ring-white" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden z-40">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <span className="text-sm font-bold text-[#1E293B]">Notifications</span>
                  {unreadCount > 0 ? (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="text-xs font-semibold text-[#166534] hover:text-[#10B981] transition-colors"
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
                      className={`px-4 py-3 transition-colors ${
                        item.unread ? 'bg-[#F8FAF7]' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-[#1E293B]">{item.title}</p>
                        <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex items-center gap-2.5 pl-1 sm:pl-2 sm:border-l border-slate-200">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#166534] text-sm font-bold border border-emerald-200/70">
              S
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[#1E293B] leading-tight">
                {USER_PROFILE.name}
              </p>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                {USER_PROFILE.shortGoal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

