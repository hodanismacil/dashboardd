import React, { useState } from 'react';
import { User, Shield, Cpu, Save, Key, Globe, BellRing, ToggleLeft, ToggleRight } from 'lucide-react';

export default function SettingsPage() {
  // Dawladaha (States) loogu talagalay badammada is-bedbeddela (Toggles)
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="max-w-4xl w-full mx-auto space-y-8 pb-12">
      
      {/* HEADER CARD */}z
      <div className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl flex justify-between items-center relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#a855f7]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu size={22} className="text-[#a855f7]" /> System Settings
          </h2>
          <p className="text-xs text-gray-400 mt-1">Maamul xogtaada, amniga account-ka iyo qaabaynta guud ee server-ka.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* SIDEBAR-KA NAV-KA SETTINGS-KA (QUICK LINKS) */}
        <div className="space-y-2">
          <div className="bg-[#0b132b] p-4 rounded-2xl border border-gray-800/60 shadow-xl space-y-1">
            <a href="#profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#a855f7] bg-[#a855f7]/10 transition-all">
              <User size={18} /> Profile Info
            </a>
            <a href="#system" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800/40 hover:text-gray-200 transition-all">
              <Globe size={18} /> System Config
            </a>
            <a href="#security" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800/40 hover:text-gray-200 transition-all">
              <Shield size={18} /> Security & Auth
            </a>
          </div>
        </div>

        {/* FORMS CONTAINER */}
        <div className="md:col-span-2 space-y-8">
          
          {/* SECTION 1: PROFILE INFO */}
          <section id="profile" className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl space-y-6">
            <div className="border-b border-gray-800/60 pb-3 flex items-center gap-2">
              <User size={18} className="text-[#a855f7]" />
              <h3 className="text-base font-bold text-gray-200">Profile Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Magacaaga</label>
                <input 
                  type="text" 
                  defaultValue="Eng. Hodan" 
                  className="w-full bg-[#060b13] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="hodan@company.com" 
                  className="w-full bg-[#060b13] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 transition-all"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Doorkaaga (Role)</label>
                <input 
                  type="text" 
                  defaultValue="Chief Architect / Frontend Developer" 
                  disabled
                  className="w-full bg-[#060b13]/60 border border-gray-800/40 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </section>

          {/* SECTION 2: SYSTEM CONFIG */}
          <section id="system" className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl space-y-6">
            <div className="border-b border-gray-800/60 pb-3 flex items-center gap-2">
              <Globe size={18} className="text-[#a855f7]" />
              <h3 className="text-base font-bold text-gray-200">System Configuration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Project Name</label>
                <input 
                  type="text" 
                  defaultValue="AdminPro Enterprise Dashboard" 
                  className="w-full bg-[#060b13] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-[#a855f7] transition-all"
                />
              </div>

              {/* Maintenance Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-[#060b13]/50 border border-gray-800/60 rounded-xl">
                <div>
                  <h4 className="text-sm font-semibold text-gray-200">Maintenance Mode</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Markaad shiddo, macaamiishu ma soo geli karaan system-ka.</p>
                </div>
                <button onClick={() => setMaintenanceMode(!maintenanceMode)} className="text-[#a855f7] transition-colors focus:outline-none">
                  {maintenanceMode ? <ToggleRight size={36} /> : <ToggleLeft size={36} className="text-gray-600" />}
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 3: SECURITY */}
          <section id="security" className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl space-y-6">
            <div className="border-b border-gray-800/60 pb-3 flex items-center gap-2">
              <Key size={18} className="text-[#a855f7]" />
              <h3 className="text-base font-bold text-gray-200">Security & Authentication</h3>
            </div>

            <div className="space-y-4">
              {/* Two Factor Auth */}
              <div className="flex items-center justify-between p-4 bg-[#060b13]/50 border border-gray-800/60 rounded-xl">
                <div className="flex gap-3 items-start">
                  <Shield size={18} className="text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">Two-Factor Authentication (2FA)</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Ku ilaali account-kaaga koodh dheeraad ah oo fariin ahaan kuugu soo dhaca.</p>
                  </div>
                </div>
                <button onClick={() => setTwoFactor(!twoFactor)} className="text-emerald-400 transition-colors focus:outline-none">
                  {twoFactor ? <ToggleRight size={36} /> : <ToggleLeft size={36} className="text-gray-600" />}
                </button>
              </div>

              {/* Email Notifications Toggle */}
              <div className="flex items-center justify-between p-4 bg-[#060b13]/50 border border-gray-800/60 rounded-xl">
                <div className="flex gap-3 items-start">
                  <BellRing size={18} className="text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">Security Email Alerts</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Lagugu soo ogeysiiyo email-ka haddii isbeddel amni lagu sameeyo system-ka.</p>
                  </div>
                </div>
                <button onClick={() => setEmailNotif(!emailNotif)} className="text-blue-400 transition-colors focus:outline-none">
                  {emailNotif ? <ToggleRight size={36} /> : <ToggleLeft size={36} className="text-gray-600" />}
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#a855f7] hover:bg-purple-600 font-bold text-sm rounded-xl text-white transition-all shadow-lg shadow-purple-500/15 hover:scale-[1.02]">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}