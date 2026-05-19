
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  chartData: any[];
}

export default function DashboardOverview({ chartData }: DashboardProps) {
  return (
    <>
      {/* CARDS WAAWEYN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Sales</p>
            <h3 className="text-3xl font-bold text-white mt-2">$142,384</h3>
            <p className="text-xs text-green-400 font-medium mt-1">▲ +14.2% <span className="text-gray-500">vs last month</span></p>
          </div>
          <div className="p-3 bg-green-500/10 text-green-400 rounded-xl">💰</div>
        </div>

        <div className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Active Users</p>
            <h3 className="text-3xl font-bold text-white mt-2">12,480</h3>
            <p className="text-xs text-purple-400 font-medium mt-1">▲ +8.3% <span className="text-gray-500">vs last week</span></p>
          </div>
          <div className="p-3 bg-purple-500/10 text-[#a855f7] rounded-xl">👥</div>
        </div>

        <div className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Conversion Rate</p>
            <h3 className="text-3xl font-bold text-white mt-2">3.42%</h3>
            <p className="text-xs text-red-400 font-medium mt-1">▼ -0.5% <span className="text-gray-500">vs yesterday</span></p>
          </div>
          <div className="p-3 bg-red-500/10 text-red-400 rounded-xl">📈</div>
        </div>

        <div className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Server Status</p>
            <h3 className="text-3xl font-bold text-white mt-2">99.98%</h3>
            <p className="text-xs text-green-400 font-medium mt-1">● Operational <span className="text-gray-500">now</span></p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">⚡</div>
        </div>
      </div>

      {/* COLUMNS: SHAXAN IYO MACAAMIIL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-200">Revenue Growth (2026)</h2>
              <p className="text-xs text-gray-500 mt-0.5">Xogta dakhliga bilaha ee la falanqeeyey</p>
            </div>
            <span className="text-xs bg-[#a855f7]/10 text-[#a855f7] px-2.5 py-1 rounded-lg font-semibold border border-[#a855f7]/20">Real-time</span>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
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
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#374151', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0b132b] p-6 rounded-2xl border border-gray-800/60 shadow-xl flex flex-col justify-between">
          <h2 className="text-lg font-bold text-gray-200 mb-4">Recent Activities</h2>
          <div className="space-y-4 flex-1 mt-2">
            <div className="flex gap-3 text-sm">
              <span className="text-green-400">🟢</span>
              <p className="text-gray-300">Invoice <span className="text-gray-500">#4321</span> was paid ($1,200)</p>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-blue-400">🔵</span>
              <p className="text-gray-300">New user <span className="text-purple-400">@Suhayb</span> signed up</p>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-yellow-400">🟡</span>
              <p className="text-gray-300">Server CPU reached <span className="text-red-400">88%</span> load</p>
            </div>
          </div>
          <button className="w-full text-center py-2.5 bg-gray-900/60 border border-gray-800 text-xs font-bold text-gray-300 rounded-xl hover:bg-gray-800 transition-colors">Eeg Dhamaan Logs-ka</button>
        </div>
      </div>
    </>
  );
}