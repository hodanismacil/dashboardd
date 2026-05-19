
import React, { useState } from 'react';
import { Inbox, Star, Send, Archive, AlertCircle, Search, Mail, MailOpen, Paperclip } from 'lucide-react';

export default function EmailPage() {
  const [selectedFolder, setSelectedFolder] = useState('Inbox');

  const emails = [
    {
      id: 1,
      sender: "Nimco Axmed",
      role: "Product Manager",
      subject: "Codsasho Mashruuc Cusub (Next.js)",
      body: "Kulan ma yeelan karnaa berrito si aan uga wada hadalno naqshadda cusub iyo endpoints-ka RTK Query ee la isku xirayo...",
      time: "09:45 AM",
      unread: true,
      hasAttachment: true
    },
    {
      id: 2,
      sender: "AWS Skill Builder",
      role: "Cloud Training",
      subject: "Dhammaystirka Module-ka Networking Concepts",
      body: "Hambalyo! Waxaad si guul leh u dhammaystirtay casharkii Cloud Computing Essentials. Shahaadadaada halkan kala soo bax...",
      time: "Shalay",
      unread: false,
      hasAttachment: false
    },
    {
      id: 3,
      sender: "Freelancer Client",
      role: "Upwork Project",
      subject: "Milestone Bixintii $150 CAD waa la xaqiijiyey",
      body: "Lacagta mashruuca frontend-ka ah ee aad soo gudbisay hadda waa la fasaxay. Aad baad uga mahadantahay shaqada quruxda badan...",
      time: "May 18",
      unread: false,
      hasAttachment: true
    }
  ];

  const folders = [
    { icon: <Inbox size={18} />, label: 'Inbox', count: 1 },
    { icon: <Star size={18} />, label: 'Starred', count: 0 },
    { icon: <Send size={18} />, label: 'Sent', count: 12 },
    { icon: <Archive size={18} />, label: 'Archive', count: 4 },
    { icon: <AlertCircle size={18} />, label: 'Spam', count: 0 },
  ];

  return (
    <div className="bg-[#0b132b] border border-gray-800/60 rounded-2xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
      
      {/* Inside Email Sidebar */}
      <aside className="w-full md:w-64 bg-[#0e1738]/40 border-b md:border-b-0 md:border-r border-gray-800/60 p-4 flex flex-col gap-4">
        <button className="w-full bg-[#a855f7] hover:bg-purple-600 font-bold text-sm py-3 px-4 rounded-xl text-white shadow-lg shadow-purple-500/25 transition-all text-center">
          + Compose Email
        </button>

        <nav className="space-y-1 mt-2">
          {folders.map((folder) => {
            const isSelected = selectedFolder === folder.label;
            return (
              <button
                key={folder.label}
                onClick={() => setSelectedFolder(folder.label)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isSelected ? 'bg-[#a855f7]/10 text-[#a855f7]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {folder.icon}
                  <span>{folder.label}</span>
                </div>
                {folder.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${isSelected ? 'bg-[#a855f7] text-white' : 'bg-gray-800 text-gray-400'}`}>
                    {folder.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Email List View */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Inside Search & Filter Bar */}
        <div className="p-4 border-b border-gray-800/60 flex items-center bg-gray-900/20">
          <div className="relative flex items-center w-full max-w-md">
            <Search size={16} className="absolute left-3 text-gray-500" />
            <input 
              type="text" 
              placeholder="Ka baadh email-ada halkan..." 
              className="w-full bg-[#060b13] border border-gray-800/80 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#a855f7]/50"
            />
          </div>
        </div>

        {/* Emails Container */}
        <div className="flex-1 divide-y divide-gray-800/30 overflow-y-auto">
          {emails.map((email) => (
            <div 
              key={email.id} 
              className={`p-5 flex items-start gap-4 hover:bg-gray-800/20 cursor-pointer transition-all relative group ${
                email.unread ? 'bg-[#a855f7]/5 border-l-2 border-[#a855f7]' : ''
              }`}
            >
              {/* Star Actions */}
              <button className="text-gray-600 hover:text-amber-400 mt-0.5 transition-colors shrink-0">
                <Star size={16} />
              </button>

              {/* Email Content Wrapper */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1 gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm truncate ${email.unread ? 'font-bold text-white' : 'font-semibold text-gray-300'}`}>
                      {email.sender}
                    </h4>
                    <span className="text-[10px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded-md font-medium hidden sm:inline-block">
                      {email.role}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">{email.time}</span>
                </div>
                
                <h5 className={`text-xs mb-1.5 truncate ${email.unread ? 'text-[#a855f7] font-bold' : 'text-purple-400/80 font-medium'}`}>
                  {email.subject}
                </h5>
                
                <p className="text-xs text-gray-400 line-clamp-1 leading-relaxed pr-6">
                  {email.body}
                </p>
              </div>

              {/* Attachment Icon and Mail status on hover */}
              <div className="flex items-center gap-2 shrink-0 mt-1">
                {email.hasAttachment && <Paperclip size={14} className="text-gray-600 group-hover:text-gray-400" />}
                <div className="text-gray-600">
                  {email.unread ? <Mail size={14} className="text-[#a855f7]" /> : <MailOpen size={14} />}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}