import React, { useState, useEffect } from "react";
import api from "../services/api";
import Modal from "./common/Modal";

export default function ITAssets() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    user: "",
    deviceType: "Laptop",
    serialNumber: "",
    peripherals: { speaker: false, headphone: false, monitor: false, keyboard: false, mouse: false },
    networkIP: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const [assetsRes, usersRes] = await Promise.all([
        api.get("/assets"),
        api.get("/users")
      ]);
      setAssets(assetsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => {
    setEditingId(null);
    setForm({
      user: "",
      deviceType: "Laptop",
      serialNumber: "",
      peripherals: { speaker: false, headphone: false, monitor: false, keyboard: false, mouse: false },
      networkIP: ""
    });
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/assets/${editingId}`, form);
      } else {
        await api.post("/assets", form);
      }
      setOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (asset) => {
    setEditingId(asset._id);
    setForm(asset);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this asset?")) return;
    await api.delete(`/assets/${id}`);
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">IT Asset Management</h2>
        <button onClick={openNew} className="px-4 py-2 bg-blue-600 text-white rounded">Add Asset</button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-6 gap-2 p-3 text-xs font-semibold text-gray-500 border-b">
          <div>Employee</div>
          <div>Device</div>
          <div>Serial No.</div>
          <div>Peripherals</div>
          <div>Network IP</div>
          <div>Actions</div>
        </div>

        {assets.map((a) => (
          <div key={a._id} className="grid grid-cols-6 gap-2 p-3 items-center border-b hover:bg-gray-50">
            <div>{a.user?.firstName} {a.user?.lastName}</div>
            <div>{a.deviceType}</div>
            <div>{a.serialNumber}</div>
            <div>
              {Object.keys(a.peripherals).filter(p => a.peripherals[p]).join(", ") || "None"}
            </div>
            <div>{a.networkIP}</div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(a)} className="text-yellow-600">Edit</button>
              <button onClick={() => handleDelete(a._id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={open} setIsOpen={setOpen} title={editingId ? "Edit Asset" : "Add Asset"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select required value={form.user} onChange={e=>setForm({...form, user:e.target.value})} className="w-full border rounded px-2 py-1">
            <option value="">Select Employee</option>
            {users.map(u => (
              <option key={u._id} value={u._id}>{u.firstName} {u.lastName}</option>
            ))}
          </select>

          <select value={form.deviceType} onChange={e=>setForm({...form, deviceType:e.target.value})} className="w-full border rounded px-2 py-1">
            <option>Laptop</option>
            <option>Desktop</option>
          </select>

          <input required placeholder="Serial Number" value={form.serialNumber} onChange={e=>setForm({...form, serialNumber:e.target.value})} className="w-full border rounded px-2 py-1" />

          <div className="grid grid-cols-2 gap-2">
            {Object.keys(form.peripherals).map(p => (
              <label key={p} className="flex items-center space-x-2">
                <input type="checkbox" checked={form.peripherals[p]} onChange={e=>setForm({...form, peripherals:{...form.peripherals, [p]:e.target.checked}})} />
                <span className="capitalize">{p}</span>
              </label>
            ))}
          </div>

          <input placeholder="Network IP" value={form.networkIP} onChange={e=>setForm({...form, networkIP:e.target.value})} className="w-full border rounded px-2 py-1" />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={()=>setOpen(false)} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

