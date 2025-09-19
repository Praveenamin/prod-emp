import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            {user.role === "Admin" ? (
              <Route path="/*" element={<DashboardLayout onLogout={handleLogout} />} />
            ) : (
              <Route path="/*" element={<div>Employee Dashboard (coming soon)</div>} />
            )}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

