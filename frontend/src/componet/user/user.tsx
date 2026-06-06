import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // U daa halkan salka API-ga si uu routes-ka kale ugu daro jidka saxda ah

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  monthlySpending: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // States-ka Maareynta Modal-ka (Add/Edit Form)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // States-ka Form-ka hantiyeed
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
    monthlySpending: 0,
  });

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 1. 📤 GET: Ka soo dhuuq xogta Backend-ka
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}`, axiosConfig);
      setUsers(res.data.data);
      setFilteredUsers(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔎 Shaqada raadinta (Search Filter)
  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

  // Furitaanka Modal-ka marka qof cusub la darayo
  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "User", status: "Active", monthlySpending: 0 });
    setIsModalOpen(true);
  };

  // Furitaanka Modal-ka marka qof la beddelayo (Edit)
  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      monthlySpending: user.monthlySpending,
    });
    setIsModalOpen(true);
  };

  // 2 & 3. 📥 SUBMIT: Ku daris ama Wax ka beddel (Add or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.monthlySpending < 0) {
        alert("Fadlan monthly spending kama yaraan karo 0!");
        return;
      }

      if (editingUser) {
        // PUT: Edit User
        const res = await axios.put(
  `${API_URL}/edit-user/${editingUser._id}`,
  formData,
  axiosConfig
);
        if (res.data.success) {
          setUsers(users.map((u) => (u._id === editingUser._id ? res.data.data : u)));
          setIsModalOpen(false);
        }
      } else {
        // POST: Add User
        const res = await axios.post(
     `${API_URL}/add-user`,
     formData,
     axiosConfig
        );
        if (res.data.success) {
          setUsers([res.data.data, ...users]);
          setIsModalOpen(false);
        }
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Hawshu way fashilantay");
    }
  };

  // 4. ❌ DELETE: Tirtirista isticmaalaha
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Ma hubtaa inaad tirtirayso user-kan?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/delete-user/${id}`, axiosConfig);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="p-6 text-white text-center">🔄 Loading users...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-center">⚠️ {error}</div>;
  }

  return (
    <div className="p-6 text-white bg-[#070b19] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-xs text-gray-400 mt-1">Ku dar, wax ka beddel, ama tirtir isticmaalayaasha.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-xl text-black bg-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          {/* ✅ Badhanka ku darista oo hadda Modal-ka toos u furaya */}
          <button
            onClick={handleOpenAddModal}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all whitespace-nowrap"
          >
            + Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-[#0b132b] border border-gray-800 rounded-2xl shadow-xl">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-900/50 border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Spending</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800/50 text-sm text-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-950/40 transition-colors">
                <td className="p-4 font-semibold text-white">{user.name}</td>
                <td className="p-4 text-gray-400">{user.email}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs bg-gray-800 rounded-lg text-gray-300 font-medium">{user.role}</span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${user.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 font-medium">${user.monthlySpending.toLocaleString()}</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(user)}
                    className="text-blue-400 hover:text-blue-300 bg-blue-500/10 px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📋 POPUP MODAL FOR ADD / EDIT USER */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-[#0b132b] border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingUser ? "Edit User Details" : "Add New User"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Magaca</label>
                <input
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Email-ka</label>
                <input
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Booska (Role)</label>
                  <input
                    type="text" required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Xaaladda (Status)</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Monthly Spending ($)</label>
                <input
                  type="number" required min="0"
                  value={formData.monthlySpending}
                  onChange={(e) => setFormData({ ...formData, monthlySpending: Number(e.target.value) })}
                  className="w-full bg-[#070b19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800 mt-6">
                <button
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="bg-gray-900 border border-gray-800 text-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition-colors"
                >
                  Ka Noqo
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors"
                >
                  {editingUser ? "Cusboonaysii" : "Kaydi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}