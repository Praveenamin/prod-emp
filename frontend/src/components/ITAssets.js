import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function ITAssets() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    user: "",
    deviceType: "Laptop",
    serialNumber: "",
    peripherals: { speaker: false, headphone: false, monitor: false, keyboard: false, mouse: false },
    networkIP: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const resAssets = await api.get("/assets");
    const resUsers = await api.get("/users");
    setAssets(resAssets.data);
    setUsers(resUsers.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePeripheralChange = (e) => {
    setForm({
      ...form,
      peripherals: { ...form.peripherals, [e.target.name]: e.target.checked },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/assets/${editingId}`, form);
    } else {
      await api.post("/assets", form);
    }
    setForm({
      user: "",
      deviceType: "Laptop",
      serialNumber: "",
      peripherals: { speaker: false, headphone: false, monitor: false, keyboard: false, mouse: false },
      networkIP: "",
    });
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (asset) => {
    setForm(asset);
    setEditingId(asset._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this asset?")) return;
    await api.delete(`/assets/${id}`);
    fetchData();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">IT Asset Management</h2>

      {/* Asset Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow mb-6">
        <select
          name="user"
          value={form.user}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.firstName} {u.lastName} ({u.email})
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <select name="deviceType" value={form.deviceType} onChange={handleChange} className="border p-2 rounded">
            <option>Laptop</option>
            <option>Desktop</option>
          </select>
          <input
            name="serialNumber"
            placeholder="Serial Number"
            value={form.serialNumber}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        {/* Peripherals */}
        <div className="flex gap-4">
          {["speaker", "headphone", "monitor", "keyboard", "mouse"].map((p) => (
            <label key={p} className="flex items-center gap-1">
              <input
                type="checkbox"
                name={p}
                checked={form.peripherals[p]}
                onChange={handlePeripheralChange}
              />
              {p}
            </label>
          ))}
        </div>

        <input
          name="networkIP"
          placeholder="Network IP"
          value={form.networkIP}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Update Asset" : "Add Asset"}
        </button>
      </form>

      {/* Asset List */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="p-2">User</th>
              <th className="p-2">Device</th>
              <th className="p-2">Serial</th>
              <th className="p-2">Peripherals</th>
              <th className="p-2">Network IP</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a._id} className="border-t">
                <td className="p-2">{a.user?.firstName} {a.user?.lastName}</td>
                <td className="p-2">{a.deviceType}</td>
                <td className="p-2">{a.serialNumber}</td>
                <td className="p-2">
                  {Object.entries(a.peripherals)
                    .filter(([k, v]) => v)
                    .map(([k]) => k)
                    .join(", ")}
                </td>
                <td className="p-2">{a.networkIP}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(a)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(a._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

