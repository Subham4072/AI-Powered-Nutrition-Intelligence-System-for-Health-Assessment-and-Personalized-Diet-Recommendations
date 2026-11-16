import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar, { NAV_ITEMS } from '../components/Sidebar';
import Navbar from '../components/Navbar';
import BotanicalBackground from '../components/BotanicalBackground';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const activeNav = NAV_ITEMS.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
  );
  const pageTitle = activeNav ? activeNav.label : 'Dashboard';

  return (
    <div className="min-h-screen flex text-[#202B25] relative">
      {/* Layer 0: Layered Botanical Wellness Background */}
      <BotanicalBackground />

      {/* Layer 1: Left Dark Forest-Green Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Layer 2: Main Application Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Navbar pageTitle={pageTitle} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
