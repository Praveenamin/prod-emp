import React, { useState } from 'react';
import UserManagement from './UserManagement';
import ITAssetManagement from './ITAssetManagement';
import Announcements from './Announcements';
import Quicklinks from './Quicklinks';
import { Users, Cpu, Megaphone, Link } from 'lucide-react';

const menu = [
  { id: 'users', label: 'User Management', icon: <Users size={18} /> },
  { id: 'it-assets', label: 'IT Assets', icon: <Cpu size={18} /> },
  { id: 'announcements', label: 'Announcements', icon: <Megaphone size={18} /> },
  { id: 'quicklinks', label: 'Quicklinks', icon: <Link size={18} /> },
];

export default function AdminDashboard() {
  const [active, setActive] = useState('users');

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-sm">
        <div className="px-6 py-6 border-b">
          <div className="text-2xl font-bold text-brand-500">Employee Portal</div>
          <div className="text-xs text-gray-500 mt-1">Admin Dashboard</div>
        </div>

        <nav className="p-4 space-y-1">
          {menu.map(m => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${active===m.id ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t">
          <div className="text-xs text-gray-500">Logged in as</div>
          <div className="text-sm font-medium">admin@assistanz.com</div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {active === 'users' && <UserManagement />}
        {active === 'it-assets' && <ITAssetManagement />}
        {active === 'announcements' && <Announcements />}
        {active === 'quicklinks' && <Quicklinks />}
      </main>
    </div>
  );
}

