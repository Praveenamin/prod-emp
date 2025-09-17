import React, { useState } from 'react';
import UserManagement from './UserManagement';
import ITAssetManagement from './ITAssetManagement';
import Announcements from './Announcements';
import Quicklinks from './Quicklinks';
import { Home, Users, Cpu, Megaphone, Link } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const menuItems = [
    { id: 'users', label: 'User Management', icon: <Users size={20} /> },
    { id: 'it-assets', label: 'IT Assets', icon: <Cpu size={20} /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone size={20} /> },
    { id: 'quicklinks', label: 'Quicklinks', icon: <Link size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-xl font-bold border-b">Admin Portal</div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-gray-100 ${
                activeTab === item.id ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'it-assets' && <ITAssetManagement />}
        {activeTab === 'announcements' && <Announcements />}
        {activeTab === 'quicklinks' && <Quicklinks />}
      </main>
    </div>
  );
};

export default AdminDashboard;

