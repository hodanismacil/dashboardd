import { useEffect, useState } from "react";
import axios from "axios";
import {
  Bell,
  UserPlus,
  Trash2,
  ShieldCheck,
} from "lucide-react";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
const API_URL = "http://localhost:5000/api/notifications";
  
  
  // 🔑 Soo qaado token-ka si loogu xiro amniga backend-ka
  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 🔄 1. Shaqada soo qaadista ogeysiisyada (Hal meel ayaan ku mideynay)
  const fetchNotifications = async () => {
    try {
      // 🔥 Halkan waxaan ku darnay 'axiosConfig' si uu Token-ku u raaco
      const res = await axios.get(API_URL, axiosConfig);
      
      console.log("Xogta Ogeysiisyada ee soo dhacday:", res.data);

      // 🛡️ Hubi qaabka xogtu u soo dhacday si uusan koodhku u crash-garayn
      if (res.data && res.data.data) {
        setNotifications(res.data.data);
      } else if (Array.isArray(res.data)) {
        setNotifications(res.data);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // ⚡ 2. Hal Effect oo kaliya ayaa ku filan bogga marka uu bilowdo
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🏛️ 3. Calaamadeynta "Read"
  const markAsRead = async (id: string) => {
    try {
      await axios.put(`${API_URL}/read/${id}`, {}, axiosConfig);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return UserPlus;
      case "danger":
        return Trash2;
      case "info":
        return ShieldCheck;
      default:
        return Bell;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020B24] text-white flex items-center justify-center">
        🔄 Loading Notifications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020B24] text-white p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Notifications</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center text-slate-500 py-10 bg-[#071633] rounded-2xl border border-slate-800">
          📭 Wax ogeysiis ah hadda kuma jiraan bogaan.
        </div>
      ) : (
        <div className="grid gap-5">
          {notifications.map((notification) => {
            const Icon = getIcon(notification.type);

            return (
              <div
                key={notification._id}
                className={`bg-[#071633] border rounded-2xl p-5 hover:border-purple-500 transition ${
                  notification.isRead ? "border-slate-800 opacity-70" : "border-purple-500/40"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    notification.type === "success" ? "bg-green-600/20 text-green-400" :
                    notification.type === "danger" ? "bg-red-600/20 text-red-400" : "bg-purple-600 text-white"
                  }`}>
                    <Icon size={22} />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-semibold text-lg">
                          {notification.title}
                        </h2>
                        <p className="text-slate-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div>
                        {notification.isRead ? (
                          <span className="text-green-400 text-sm font-medium">Read</span>
                        ) : (
                          <button
                            onClick={() => markAsRead(notification._id)}
                            className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg text-sm transition"
                          >
                            Mark Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Timeline */}
      {notifications.length > 0 && (
        <div className="mt-10 bg-[#071633] rounded-2xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold mb-6">Activity Timeline</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-2 before:bg-slate-800 before:w-[2px] before:my-2">
            {notifications.map((notification) => (
              <div key={"timeline-" + notification._id} className="flex gap-4 relative z-10">
                <div
                  className={`w-4 h-4 rounded-full mt-1.5 border-4 border-[#071633] ${
                    notification.type === "success" ? "bg-green-500" :
                    notification.type === "danger" ? "bg-red-500" : "bg-purple-500"
                  }`}
                />
                <div>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-slate-400 text-sm">{notification.message}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}