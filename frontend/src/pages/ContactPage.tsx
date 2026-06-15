import { useState } from "react";
import axios from "axios";
import { Send, User, Mail, MessageSquare, FileText } from "lucide-react";

export default function ContactPage() {
  // ✨ State-ka hadda wuxuu si sax ah ugu dhex jiraa gudaha shaqada ContactPage
  const [formData, setFormData] = useState({
    senderName: "",  // ✅ Xaraf weyn (N)
    senderEmail: "", // ✅ Xaraf weyn (E)
    subject: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; msg: string }>({
    type: "",
    msg: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      // 🔥 Jidkii rasmiga ahaa ee POST ee Backend-kaaga la hadlayey
      const res = await axios.post("http://localhost:5000/api/emails/create", formData);
      
      if (res.data.success) {
        setStatus({
          type: "success",
          msg: "🎉 Fariintaada si guul leh ayaa loo diray! Waad ku mahadsan tahay nala soo xiriirka.",
        });
        // Nadiifi form-ka marka fariintu guuleysato
        setFormData({ senderName: "", senderEmail: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        msg: "❌ Waan ka xunnahay, cilad ayaa dhacday fariinta ma bixin. Isku day mar kale.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020B24] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[#071633] border border-slate-800/80 rounded-2xl p-8 shadow-2xl shadow-purple-950/10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Send a message and I will get back to you as soon as possible.
          </p>
        </div>

        {/* Status Message */}
        {status.msg && (
          <div className={`p-4 rounded-xl text-sm font-medium mb-6 border ${
            status.type === "success" 
              ? "bg-green-500/10 text-green-400 border-green-500/20" 
              : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}>
            {status.msg}
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Sender Name */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <User size={14} className="text-purple-400" /> Full Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              className="w-full bg-[#0e1d3d] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition"
            />
          </div>

          {/* Sender Email */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Mail size={14} className="text-purple-400" /> Email Address
            </label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={formData.senderEmail}
              onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
              className="w-full bg-[#0e1d3d] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition"
            />
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <FileText size={14} className="text-purple-400" /> Subject
            </label>
            <input
              type="text"
              required
              placeholder="Project Inquiries"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-[#0e1d3d] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition"
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <MessageSquare size={14} className="text-purple-400" /> Your Message
            </label>
            <textarea
              required
              rows={4}
              placeholder="Hi Hodan, I would love to collaborate on a new project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#0e1d3d] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800/50 text-white font-semibold text-sm py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                🔄 Sending message...
              </span>
            ) : (
              <>
                <Send size={16} /> Send Message
              </>
            )}
          </button>
          
        </form>
      </div>
    </div>
  );
}