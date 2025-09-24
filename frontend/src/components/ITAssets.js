import React, { useEffect, useState } from "react";
import api from "../services/api";

function ITAsset() {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    assignedTo: "",
    deviceType: "Laptop",
    serialNumber: "",
    peripherals: [],
    networkIP: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all assets
  const fetchAssets = async () => {
    try {
      const res = await api.get("/assets");
      setAssets(res.data);
    } catch (err) {
      console.error("❌ Error fetching assets", err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => {
        const peripherals = checked
          ? [...prev.peripherals, value]
          : prev.peripherals.filter((p) => p !== value);
        return { ...prev, peripherals };
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/assets/${editingId}`, form);
      } else {
        await api.post("/assets", form);
      }
      setForm({
        assignedTo: "",
        deviceType: "Laptop",
        serialNumber: "",
        peripherals: [],
        networkIP: "",
      });
      setEditingId(null);
      fetchAssets();
    } catch (err) {
      console.error("❌ Error saving asset", err);
    }
  };

  // Edit asset
  const handleEdit = (asset) => {
    setForm({
      assignedTo: asset.assignedTo?._id || "",
      deviceType: asset.deviceType,
      serialNumber: asset.serialNumber,
      peripherals: asset.peripherals || [],
      networkIP: asset.networkIP,
    });
    setEditingId(asset._id);
  };

  // Delete asset
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;
    try {
      await api.delete(`/assets/${id}`);
      fetchAssets();
    } catch (err) {
      console.error("❌ Error deleting asset", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">IT Asset Management</h2>

      {/* Asset Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <select
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select User --</option>
          {/* later: map users dynamically */}
          <option value="USER_ID_1">User One</option>
          <option value="USER_ID_2">User Two</option>
        </select>

        <select
          name="deviceType"
          value={form.deviceType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
        </select>

        <input
          type="text"
          name="serialNumber"
          value={form.serialNumber}
          onChange={handleChange}
          placeholder="Serial Number"
          className="w-full p-2 border rounded"
          required
        />

        {/* Peripherals */}
        <div className="flex gap-4">
          {["Speaker", "Headphone", "Monitor", "Keyboard", "Mouse"].map((item) => (
            <label key={item} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={item}
                checked={form.peripherals.includes(item)}
                onChange={handleChange}
              />
              {item}
            </label>
          ))}
        </div>

        <input
          type="text"
          name="networkIP"
          value={form.networkIP}
          onChange={handleChange}
          placeholder="Network IP"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Asset" : "Add Asset"}
        </button>
      </form>

      {/* Assets Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User</th>
            <th className="border p-2">Device</th>
            <th className="border p-2">Serial</th>
            <th className="border p-2">Peripherals</th>
            <th className="border p-2">Network IP</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset._id}>
              <td className="border p-2">
                {asset.assignedTo
                  ? `${asset.assignedTo.firstName} ${asset.assignedTo.lastName}`
                  : "Unassigned"}
              </td>
              <td className="border p-2">{asset.deviceType}</td>
              <td className="border p-2">{asset.serialNumber}</td>
              <td className="border p-2">{asset.peripherals.join(", ")}</td>
              <td className="border p-2">{asset.networkIP}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(asset)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(asset._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ITAsset;

