import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, UserPlus, ShieldAlert, Trash2 } from 'lucide-react';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const notifications = [
    {
      id: 1,
      title: "Lacag bixin guulaysatay",
      desc: "Macaamiil Axmed Cali ah ayaa bixiyey lacag dhan $1,200 oo ah rukunka sanadka.",
      time: "2 daqiiqo ka hor",
      type: "success",
      icon: <CheckCircle2 className="text-emerald-400" size={20} />,
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      id: 2,
      title: "Digniin: Server Load",
      desc: "Isticmaalka CPU-ga server-ka wuxuu gaadhay 88%. Fadlan eeg optimization-ka database-ka.",
      time: "10 daqiiqo ka hor",
      type: "warning",
      icon: <AlertTriangle className="text-amber-400" size={20} />,
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      id: 3,
      title: "User cusub ayaa ku soo biiray",
      desc: "Suhayb Maxamed ayaa hadda iska diiwaan geliyey barnaamijka AdminPro.",
      time: "1 saac ka hor",
      type: "info",
      icon: <UserPlus className="text-blue-400" size={20} />,
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      id: 4,
      title: "Isku day login oo fashilmay",
      desc: "Qof raba inuu soo galo nidaamka ayaa IP ka duwan ka isku dayey 3 jeer.",
      time: "5 saac ka hor",
      type: "danger",
      icon: <ShieldAlert className="text-rose-400" size={20} />,
      bg: "bg-rose-500/10",
      border: "border-rose-500/20"
    }
  ];

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell size={22} className="text-[#a855f7]" /> Center Notifications
          </h2>
          <p className="text-xs text-gray-400 mt-1">Maamul ogeysiisyada nidaamka iyo digniinnada amniga.</p>
        </div>
        <button className="flex items-center gap-2 text-xs font-semibold bg-gray-900 hover:bg-gray-800 border border-gray-800 px-4 py-2.5 rounded-xl text-gray-300 transition-all">
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-gray-800/60 gap-6 text-sm font-medium px-2">
        {['All', 'Unread', 'System'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 relative transition-colors ${activeTab === tab ? 'text-[#a855f7] font-bold' : 'text-gray-400 hover:text-gray-200'}`}
          >
            {tab} Notifications
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#a855f7] rounded-full shadow-[0_0_8px_#a855f7]"></span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`bg-[#0b132b] p-5 rounded-2xl border ${notif.border} flex gap-5 items-start hover:scale-[1.01] transition-all cursor-pointer relative overflow-hidden group`}
          >
            {/* Background Glow on Hover */}
            <div className={`absolute inset-0 ${notif.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
            
            {/* Icon Box */}
            <div className={`p-3 rounded-xl border ${notif.border} ${notif.bg} flex items-center justify-center shrink-0 z-10`}>
              {notif.icon}
            </div>
            
            {/* Text Content */}
            <div className="flex-1 min-w-0 z-10">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-bold text-gray-100 text-sm md:text-base group-hover:text-white transition-colors">
                  {notif.title}
                </h3>
                <span className="text-xs text-gray-500 font-medium bg-gray-900/60 px-2 py-1 rounded-md border border-gray-800/40 shrink-0">
                  {notif.time}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-400 mt-1.5 leading-relaxed">
                {notif.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}