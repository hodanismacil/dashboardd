
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  chartData: any[];
}

export default function AnalyticsPage({ chartData }: AnalyticsProps) {
  return (
    <div className="bg-[#0b132b] p-8 rounded-2xl border border-gray-800/60 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-2">Advanced Data Analytics</h2>
      <p className="text-gray-400 text-sm mb-6">Halkan ka eeg qaabka uu u korayo dakhliga guud ee shirkadda.</p>
      
      <div className="h-80 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#374151', borderRadius: '12px' }} />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="users" fill="#a855f7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}