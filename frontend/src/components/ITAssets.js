import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ITAssets() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    user: "",
    deviceType: "Laptop",
    serialNumber: "",
    peripherals: {
      speaker: false,
      headphone: false,
      monitor: false,
      keyboard: false,
      mouse: false,
    },
    networkIP: "",
  });

  const fetchData = async () => {
    const [assetRes, userRes] = await Promise.all([
      api.get("/assets"),
      api.get("/users"),
    ]);
    setAssets(assetRes.data);
    setUsers(userRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (form.peripherals.hasOwnProperty(name)) {
      setForm({ ...form, peripherals: { ...form.peripherals, [name]: checked } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/assets", form);
    setForm({
      user: "",
      deviceType: "Laptop",
      serialNumber: "",
      peripherals: { speaker: false, headphone: false, monitor: false, keyboard: false, mouse: false },
      networkIP: "",
    });
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this asset?")) return;
    await api.delete(`/assets/${id}`);
    fetchData();
  };

  const handleApprove = async (id) => {
    await api.patch(`/assets/${id}/approve-change`);
    fetchData();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">IT Asset Management</h2>

      {/* Asset Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <select name="user" value={form.user} onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Select Employee</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.firstName} {u.lastName} ({u.email})
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <select name="deviceType" value={form.deviceType} onChange={handleChange} className="border p-2 rounded">
            <option>Laptop</option>
            <option>Desktop</option>
          </select>
          <input type="text" name="serialNumber" placeholder="Serial Number" value={form.serialNumber} onChange={handleChange} required className="border p-2 rounded" />
        </div>

        {/* Peripherals */}
        <div className="grid grid-cols-5 gap-2">
          {["speaker", "headphone", "monitor", "keyboard", "mouse"].map((p) => (
            <label key={p} className="flex items-center gap-1 text-sm">
              <input type="checkbox" name={p} checked={form.peripherals[p]} onChange={handleChange} />
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </label>
          ))}
        </div>

        <input type="text" name="networkIP" placeholder="Network IP" value={form.networkIP} onChange={handleChange} className="w-full border p-2 rounded" />

        <button type="submit" className="bg-brand-500 text-white px-4 py-2 rounded">Add Asset</button>
      </form>

      {/* Assets List */}
      <div className="bg-white rounded shadow">
        <div className="grid grid-cols-7 gap-2 p-3 text-xs font-semibold text-gray-500 border-b">
          <div>User</div>
          <div>Device</div>
          <div>Serial</div>
          <div>Peripherals</div>
          <div>IP</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {assets.map((a) => (
          <div key={a._id} className="grid grid-cols-7 gap-2 p-3 border-b text-sm items-center">
            <div>{a.user?.firstName} {a.user?.lastName}</div>
            <div>{a.deviceType}</div>
            <div>{a.serialNumber}</div>
            <div>
              {Object.keys(a.peripherals).filter((k) => a.peripherals[k]).join(", ")}
            </div>
            <div>{a.networkIP}</div>
            <div>{a.status}</div>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(a._id)} className="text-red-600">Delete</button>
              {a.status === "ChangeRequested" && (
                <button onClick={() => handleApprove(a._id)} className="text-green-600">Approve</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

