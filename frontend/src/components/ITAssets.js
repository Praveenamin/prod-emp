import React, { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "./common/Modal";

function EmptyRow() {
  return <div className="text-center p-6 text-gray-400">No assets found</div>;
}

export default function ITAssets() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    serialNumber: "",
    purchaseDate: "",
    status: "Available",
    assignedTo: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchAssets = async () => {
    const res = await api.get("/assets");
    setAssets(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchAssets();
    fetchUsers();
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm({ name: "", type: "", serialNumber: "", purchaseDate: "", status: "Available", assignedTo: "" });
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/assets/${editingId}`, form);
    } else {
      await api.post("/assets", form);
    }
    setOpen(false);
    fetchAssets();
  };

  const handleEdit = (asset) => {
    setEditingId(asset._id);
    setForm({
      name: asset.name,
      type: asset.type,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate ? asset.purchaseDate.slice(0, 10) : "",
      status: asset.status,
      assignedTo: asset.assignedTo?._id || "",
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this asset?")) return;
    await api.delete(`/assets/${id}`);
    fetchAssets();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">IT Assets</h2>
        <button onClick={openNew} className="px-4 py-2 bg-brand-500 text-white rounded">
          Add Asset
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-6 gap-2 p-3 text-xs font-semibold text-gray-500 border-b">
          <div>Name</div>
          <div>Type</div>
          <div>Serial No.</div>
          <div>Status</div>
          <div>Assigned To</div>
          <div>Actions</div>
        </div>

        {assets.length === 0 ? (
          <EmptyRow />
        ) : (
          assets.map((a) => (
            <div key={a._id} className="grid grid-cols-6 gap-2 p-3 items-center border-b hover:bg-gray-50">
              <div>{a.name}</div>
              <div>{a.type}</div>
              <div>{a.serialNumber}</div>
              <div>{a.status}</div>
              <div>{a.assignedTo ? `${a.assignedTo.firstName} ${a.assignedTo.lastName}` : "-"}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(a)} className="text-yellow-600 hover:text-yellow-800">
                  Edit
                </button>
                <button onClick={() => handleDelete(a._id)} className="text-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={open} setIsOpen={setOpen} title={editingId ? "Edit Asset" : "Add Asset"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-2 py-1" />
          <input required placeholder="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border rounded px-2 py-1" />
          <input required placeholder="Serial Number" value={form.serialNumber} onChange={(e) => setForm({ ...form, serialNumber: e.target.value })} className="w-full border rounded px-2 py-1" />
          <input type="date" value={form.purchaseDate} onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })} className="w-full border rounded px-2 py-1" />

          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border rounded px-2 py-1">
            <option>Available</option>
            <option>Assigned</option>
            <option>In Repair</option>
            <option>Retired</option>
          </select>

          <select value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} className="w-full border rounded px-2 py-1">
            <option value="">-- Assign to User --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.firstName} {u.lastName}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button type="submit" className="px-3 py-2 bg-brand-500 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

