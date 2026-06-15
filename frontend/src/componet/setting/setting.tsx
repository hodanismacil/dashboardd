import { useEffect, useState } from "react";
import axios from "axios";

interface User {
id?: string;
name: string;
email: string;
role: string;
}

export default function SettingsPage() {
const [user, setUser] = useState<User>({
name: "",
email: "",
role: "",
});

const [loading, setLoading] = useState(true);

const token = localStorage.getItem("token");

const axiosConfig = {
headers: {
Authorization: `Bearer ${token}`,
},
};

useEffect(() => {
const fetchUser = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/users/check-user",
axiosConfig
);


    setUser({
      name: res.data.name || "",
      email: res.data.email || "",
      role: res.data.role || "",
    });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

fetchUser();


}, []);

const handleSave = async () => {
try {
await axios.put(
"http://localhost:5000/api/users/profile",
{
name: user.name,
email: user.email,
},
axiosConfig
);


  alert("Profile updated successfully");
} catch (error) {
  alert("Update failed");
}


};

if (loading) {
return ( <div className="text-white p-6">
Loading... </div>
);
}

return ( <div className="min-h-screen bg-[#020B24] text-white p-6"> <h1 className="text-4xl font-bold mb-8">
Settings </h1>

  <div className="bg-[#071633] rounded-2xl p-6 border border-slate-800 max-w-3xl">
    <h2 className="text-2xl font-semibold mb-6">
      Admin Profile
    </h2>

    <div className="space-y-5">
      <div>
        <label className="block mb-2 text-slate-400">
          Full Name
        </label>

        <input
          type="text"
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
          className="w-full bg-[#020B24] border border-slate-700 rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block mb-2 text-slate-400">
          Email
        </label>

        <input
          type="email"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
          className="w-full bg-[#020B24] border border-slate-700 rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block mb-2 text-slate-400">
          Role
        </label>

        <input
          type="text"
          value={user.role}
          disabled
          className="w-full bg-[#020B24] border border-slate-700 rounded-xl p-3 opacity-70"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold"
      >
        Save Changes
      </button>
    </div>
  </div>
</div>

);
}
