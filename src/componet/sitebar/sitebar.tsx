import React, { useState } from 'react';
import { 
  LayoutGrid, BarChart2, Users, Settings, ChevronLeft, ChevronRight, LogOut, Search, Bell, Star, Menu, X
} from 'lucide-react';

// 🎯 SOO DAJI COMPONENTS-KII CUSBAA (Paths-kaagii rasmiga ahaa)
import AnalyticsPage from '../Charts/charts';
import DashboardOverview from '../../pages/Dashboud';
import UsersPage from '../user/user';
import EmailPage from '../emalis/emails';
import NotificationsPage from '../notifications/notifications';
import SettingsPage from '../setting/setting';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  
  // 📱 Mobile Menu State
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const chartData = [
    { name: 'Jan', revenue: 40000, users: 4000 },
    { name: 'Feb', revenue: 65000, users: 5500 },
    { name: 'Mar', revenue: 90000, users: 7800 },
    { name: 'Apr', revenue: 50000, users: 6200 },
    { name: 'May', revenue: 75000, users: 8900 },
    { name: 'Jun', revenue: 110000, users: 11200 },
  ];

  const menuItems = [
    { icon: <LayoutGrid size={22} />, text: 'Dashboard' },
    { icon: <BarChart2 size={22} />, text: 'Analytics' },
    { icon: <Users size={22} />, text: 'Users' },
    { icon: <Settings size={22} />, text: 'Settings' },
    { icon: <Star size={22} />, text: 'Email' },
    { icon: <Bell size={22} />, text: 'NOTIFICATIONS' } // Waa inuu la mid noqdo state-ka engine-ka
  ];

  return (
    // 🖥️ md:flex-row (Desktop) iyo flex-col (Mobile)
    <div className="flex flex-col md:flex-row h-screen bg-[#060b13] text-gray-100 overflow-hidden w-full relative">
      
      {/* 📱 MOBILE NAVBAR HEADERS (Kaliya wuxuu u muuqdaa shaashadaha yaryar) */}
      <div className="md:hidden bg-[#0b132b] border-b border-gray-800/60 p-4 flex items-center justify-between z-50">
        <div className="text-xl font-bold tracking-wide">
          <span className="text-gray-100">Admin</span><span className="text-[#a855f7]">Pro</span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)} 
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-200 transition-colors"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ─── SIDEBAR COMPONENT ─── */}
      <aside className={`
        bg-[#0b132b] border-r border-gray-800/40 h-full p-4 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0
        
        /* Desktop */
        hidden md:flex ${isCollapsed ? 'w-20' : 'w-64'}

        /* Mobile Layout Overlay */
        ${isMobileOpen ? 'fixed inset-y-0 left-0 w-64 z-50 flex shadow-2xl animate-fade-in' : 'hidden'}
      `}>
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Logo Section */}
            <div className="flex items-center justify-between mb-6 mt-2 px-2">
              {(!isCollapsed || isMobileOpen) && (
                <div className="text-2xl font-bold tracking-wide select-none">
                  <span className="text-gray-100">Admin</span> <span className="text-[#a855f7]">Pro</span>
                </div>
              )}
              {/* Toggle-ka Desktop-ka oo kaliya */}
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:flex p-1.5 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white absolute -right-3 top-6 border border-gray-700 z-50 shadow-md transition-colors"
              >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>

            {/* 🔍 SEARCH COMPONENT IN SIDEBAR */}
            <div className="mb-6 relative px-1">
              {isCollapsed && !isMobileOpen ? (
                <button 
                  onClick={() => setIsCollapsed(false)} 
                  className="w-full flex justify-center py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-[#a855f7] transition-all"
                >
                  <Search size={20} />
                </button>
              ) : (
                <div className="relative flex items-center">
                  <Search size={18} className="absolute left-3 text-gray-500 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Baadh halkan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1c2541]/40 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/20 transition-all"
                  />
                </div>
              )}
            </div>

            {/* Menu Links */}
            <nav className="space-y-1.5">
              {menuItems.map((item, index) => {
                const isActive = activeMenu === item.text;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveMenu(item.text);
                      setIsMobileOpen(false); // Xir menu-ka mobile marka wax la dooro
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all group relative ${
                      isActive ? 'bg-[#a855f7] text-white shadow-lg shadow-purple-500/25' : 'text-gray-400 hover:bg-gray-800/40 hover:text-gray-200'
                    }`}
                  >
                    <div className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#a855f7] transition-colors'}`}>
                      {item.icon}
                    </div>
                    <span className={`transition-all duration-200 ${isCollapsed && !isMobileOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 🚪 LOGOUT COMPONENT AT THE BOTTOM */}
          <div className="border-t border-gray-800/60 pt-4 mt-auto">
            <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all group">
              <LogOut size={22} className="group-hover:text-red-400 transition-colors" />
              <span className={`transition-all duration-200 ${isCollapsed && !isMobileOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* 📱 BACKGROUND OVERLAY FOR MOBILE */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 bg-[#060b13] overflow-y-auto flex flex-col">
        {/* Header Dashboard */}
        <header className="w-full h-20 border-b border-gray-800/40 px-4 md:px-8 flex items-center justify-between bg-[#0b132b]/40 backdrop-blur-md sticky top-0 z-40">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-100 tracking-tight mt-0.5 capitalize">
              {activeMenu.toLowerCase()}
            </h1>
          </div>
          
          {/* Topbar User Info */}
          
          <div className="flex items-center gap-4">
            {/* 🔔 GAMBALEELKA IYO BADGE-KA TIRADA */}
<button 
  onClick={() => setActiveMenu('NOTIFICATIONS')}
  className="p-2.5 text-gray-400 hover:text-[#a855f7] bg-gray-900/60 border border-gray-800 rounded-xl transition-all relative group"
>
  {/* Lambarka Cas ee ogeysiiska - Wuxuu dul fadhiisanayaa Icon-ka */}
  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-[#0b132b] shadow-md shadow-red-500/20 animate-bounce">
    3
  </span>
  
  <Bell size={18} className="group-hover:rotate-12 transition-transform" />
</button>
            <div className="flex items-center gap-3 border-l border-gray-800 pl-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#a855f7] to-blue-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0b132b] rounded-[10px] flex items-center justify-center text-white font-bold text-xs">AD</div>
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-semibold text-gray-200">Eng. hodan</p>
                <p className="text-[10px] text-purple-400 font-medium">Chief Architect</p>
              </div>
            </div>
          </div>
        </header>

        {/* 🧠 ENGINE-KA RENDERING BOGAGGA (Habeen Responsive ah) */}
        <div className="p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8 flex-1">
          
          {activeMenu === 'Dashboard' && <DashboardOverview chartData={chartData} />}
          
          {activeMenu === 'Analytics' && <AnalyticsPage chartData={chartData} />}
          
          {activeMenu === 'Tailwind' && <div className="text-gray-400">Bogga Tailwind...</div>}
          
          {activeMenu === 'Users' && <UsersPage />}
          
          {activeMenu === 'Email' && <EmailPage />}
          
          {activeMenu === 'NOTIFICATIONS' && <NotificationsPage />}
          
          {activeMenu === 'Settings' && <SettingsPage />}
        
        </div>
      </main>
    </div>
  );
}