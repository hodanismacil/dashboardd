import React from 'react';

export default function UsersPage() {
  return (
    <div className="bg-[#0b132b] rounded-2xl border border-gray-800/60 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-200">Macaamiisha System-ka</h2>
          <p className="text-xs text-gray-400 mt-0.5">Maamul, wax ka beddel, ama tirtir xogta dadka ka diiwaan gashan.</p>
        </div>
        <button className="px-4 py-2 bg-[#a855f7] hover:bg-purple-600 font-semibold text-sm rounded-xl text-white shadow-lg shadow-purple-500/20 transition-all">+ Add New User</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800/40 text-gray-400 text-xs font-bold bg-gray-900/20 uppercase tracking-wider">
              <th className="p-4 pl-6">User Profile</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-300 divide-y divide-gray-800/30">
            <tr className="hover:bg-gray-800/10 transition-colors">
              <td className="p-4 pl-6 flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-500/20 text-[#a855f7] rounded-full flex items-center justify-center font-bold">HA</div>
                <div>
                  <p className="font-semibold text-gray-200">Hamda Cali</p>
                  <p className="text-xs text-gray-500">hamda@company.com</p>
                </div>
              </td>
              <td className="p-4 font-medium">UI/UX Designer</td>
              <td className="p-4"><span className="px-2.5 py-1 text-xs font-semibold bg-green-500/10 text-green-400 rounded-full">Active</span></td>
              <td className="p-4 text-right pr-6 space-x-2">
                <button className="text-gray-400 hover:text-white font-medium text-xs bg-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-700">Edit</button>
                <button className="text-red-400 hover:text-red-300 font-medium text-xs bg-red-500/10 px-2.5 py-1.5 rounded-lg">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>

      <div>
        <p className="text-center text-xs text-gray-500 py-4">Showing 1 of 1 users</p>
        
      </div>
    </div>
  );
}
      
  