
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface UserSpending {
  name: string;
  spending: number;
}

interface StatusDistribution {
  name: string;
  value: number;
}

export default function AnalyticsPage() {
  const [userSpending, setUserSpending] = useState<UserSpending[]>([]);
  const [statusDistribution, setStatusDistribution] = useState<
    StatusDistribution[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const COLORS = ["#22c55e", "#ef4444"];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/analytics"
      );

      setUserSpending(res.data.data.userSpending);
      setStatusDistribution(res.data.data.statusDistribution);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "⚠️ Xogtii falanqaynta waa la waayey"
      );
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = userSpending.length;

  const totalRevenue = userSpending.reduce(
    (sum, user) => sum + user.spending,
    0
  );

  const activeUsers =
    statusDistribution.find(
      (item) => item.name === "Active Users"
    )?.value || 0;

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading Analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-slate-950 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800">
          <p className="text-slate-400">Total Users</p>
          <h2 className="text-3xl font-bold mt-2">
            {totalUsers}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800">
          <p className="text-slate-400">Active Users</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {activeUsers}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800">
          <p className="text-slate-400">Total Revenue</p>
          <h2 className="text-3xl font-bold mt-2 text-cyan-400">
            ${totalRevenue.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
          <h2 className="text-xl font-semibold mb-6">
            User Spending
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={userSpending}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spending" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
          <h2 className="text-xl font-semibold mb-6">
            User Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >
                {statusDistribution.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

