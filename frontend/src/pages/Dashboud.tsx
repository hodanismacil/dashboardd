import axios from 'axios';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
  });
  
  // 📊 Halkaan waxaa ku kaydsami doona xogta garaafka ee backend-ka ka timaada
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data) {
          // Waxaan u qaybineynaa xogta kaararka iyo xogta garaafka
          setStats(res.data.data);
          setChartData(res.data.chartData || []); // Haddii backend-ku soo diro chartData
        }
      } catch (error: any) {
        console.error("Dashboard error:", error);
        setError(error.response?.data?.message || "Xogtii dashboard-ka waa la waayey");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-6 text-white text-center">🔄 Garaafyada iyo Xogta Dashboard-ka ayaa la soo dhuuqayaa...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-center">⚠️ {error}</div>;
  }

  return (
    <div className="space-y-8">
      {/* 📊 CARDS WAAWEYN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-3xl font-bold text-white mt-2">
              ${stats.totalRevenue ? stats.totalRevenue.toLocaleString() : "0"}
            </h3>
            <p className="text-xs text-green-400 font-medium mt-1">▲ Nidaamka Shirkadda</p>
          </div>
          <div className="p-3 bg-green-500/10 text-green-400 rounded-xl">💰</div>
        </div>

        <div className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Active Users</p>
            <h3 className="text-3xl font-bold text-white mt-2">
              {stats.activeUsers ? stats.activeUsers.toLocaleString() : "0"}
            </h3>
            <p className="text-xs text-purple-400 font-medium mt-1">● Khadka ku jira</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-[#a855f7] rounded-xl">👥</div>
        </div>

        <div className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Registered Users</p>
            <h3 className="text-3xl font-bold text-white mt-2">
              {stats.totalUsers ? stats.totalUsers.toLocaleString() : "0"}
            </h3>
            <p className="text-xs text-blue-400 font-medium mt-1">👥 Wadar ahaan</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">⚡</div>
        </div>
      </div>

      {/* 📈 GARAAFKA REVENUE GROWTH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-200">Revenue Growth (2026)</h2>
              <p className="text-xs text-gray-500 mt-0.5">Xogta dakhliga bilaha ee la falanqeeyey</p>
            </div>
            <span className="text-xs bg-[#a855f7]/10 text-[#a855f7] px-2.5 py-1 rounded-lg font-semibold border border-[#a855f7]/20">Real-time</span>
          </div>
          
          <div className="w-full mt-4">
            {chartData.length === 0 ? (
              <div className="h-[250px] flex items-center justify-center text-gray-500 text-sm">
                Xogta garaafka wali laguma soo shubin backend-ka.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#374151', borderRadius: '12px', color: '#fff' }} />
                  
                  {/* 🎯 Kani wuxuu raadinayaa furaha 'revenue' ee ku jira xogta bilaha */}
                  <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* RECENT ACTIVITIES LOGS */}
        <div className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl flex flex-col justify-between">
          <h2 className="text-lg font-bold text-gray-200 mb-4">Recent Activities</h2>
          <div className="space-y-4 flex-1 mt-2">
            <div className="flex gap-3 text-sm">
              <span className="text-green-400">🟢</span>
              <p className="text-gray-300">Invoice <span className="text-gray-500">#4321</span> was paid ($1,200)</p>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-blue-400">🔵</span>
              <p className="text-gray-300">New user signed up to the system</p>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-yellow-400">🟡</span>
              <p className="text-gray-300">Dashboard status <span className="text-green-400">Stable</span></p>
            </div>
          </div>
          <button className="w-full text-center py-2.5 bg-gray-900/60 border border-gray-800 text-xs font-bold text-gray-300 rounded-xl hover:bg-gray-800 transition-colors">Eeg Dhamaan Logs-ka</button>
        </div>
      </div>
    </div>
  );
}