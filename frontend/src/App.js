import React, { useState } from "react";
import UserManagement from "./components/UserManagement";
import ITAssets from "./components/ITAssets";
import Announcements from "./components/Announcements";
import QuickLinks from "./components/QuickLinks";

function App() {
  const [activePage, setActivePage] = useState("userManagement");

  const renderContent = () => {
    switch (activePage) {
      case "userManagement":
        return <UserManagement />;
      case "itAssets":
        return <ITAssets />;
      case "announcements":
        return <Announcements />;
      case "quickLinks":
        return <QuickLinks />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 text-2xl font-bold text-blue-600">
          Employee Portal
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActivePage("userManagement")}
            className={`block w-full text-left px-6 py-3 hover:bg-blue-100 ${
              activePage === "userManagement" ? "bg-blue-50 font-semibold" : ""
            }`}
          >
            👥 User Management
          </button>
          <button
            onClick={() => setActivePage("itAssets")}
            className={`block w-full text-left px-6 py-3 hover:bg-blue-100 ${
              activePage === "itAssets" ? "bg-blue-50 font-semibold" : ""
            }`}
          >
            💻 IT Assets
          </button>
          <button
            onClick={() => setActivePage("announcements")}
            className={`block w-full text-left px-6 py-3 hover:bg-blue-100 ${
              activePage === "announcements" ? "bg-blue-50 font-semibold" : ""
            }`}
          >
            📢 Announcements
          </button>
          <button
            onClick={() => setActivePage("quickLinks")}
            className={`block w-full text-left px-6 py-3 hover:bg-blue-100 ${
              activePage === "quickLinks" ? "bg-blue-50 font-semibold" : ""
            }`}
          >
            🔗 Quick Links
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Logout
          </button>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
}

export default App;

