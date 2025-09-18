import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from './common/Modal';

export default function ITAssetManagement() {
  const [assets, setAssets] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    employeeId: '', laptopDesktop: false, serialNumber: '', speaker:false, headphone:false, monitor:false, keyboard:false, mouse:false, networkIP:'', requestChange:''
  });
  const [editingId, setEditingId] = useState(null);

  const fetch = async () => {
    try {
      const res = await api.get('/it-assets');
      setAssets(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(()=>{ fetch(); }, []);

  const openNew = ()=>{ setEditingId(null); setForm({ employeeId:'', laptopDesktop:false, serialNumber:'', speaker:false, headphone:false, monitor:false, keyboard:false, mouse:false, networkIP:'', requestChange:'' }); setOpen(true); }

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await api.put(`/it-assets/${editingId}`, form);
      else await api.post('/it-assets', form);
      setOpen(false); fetch();
    } catch (err) { console.error(err); }
  };

  const edit = (a) => { setEditingId(a._id); setForm(a); setOpen(true); };

  const remove = async (id) => { if(!confirm('Delete asset?')) return; await api.delete(`/it-assets/${id}`); fetch(); };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">IT Asset Management</h2>
        <button onClick={openNew} className="px-4 py-2 bg-brand-500 text-white rounded">Add Asset</button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Laptop/Desktop</th>
              <th className="p-3">Serial</th>
              <th className="p-3">Accessories</th>
              <th className="p-3">Network IP</th>
              <th className="p-3">Requests</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(a => (
              <tr key={a._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{a.employeeId?.firstName || a.employeeId || '—'}</td>
                <td className="p-3">{a.laptopDesktop ? 'Yes' : 'No'}</td>
                <td className="p-3">{a.serialNumber}</td>
                <td className="p-3">{[a.speaker && 'Speaker', a.headphone && 'Headphone', a.monitor && 'Monitor', a.keyboard && 'Keyboard', a.mouse && 'Mouse'].filter(Boolean).join(', ')}</td>
                <td className="p-3">{a.networkIP}</td>
                <td className="p-3">{a.requestChange}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={()=>edit(a)} className="text-yellow-600">Edit</button>
                    <button onClick={()=>remove(a._id)} className="text-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {assets.length === 0 && <tr><td colSpan="7" className="p-6 text-center text-gray-400">No assets</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal isOpen={open} setIsOpen={setOpen} title={editingId ? 'Edit Asset' : 'Add Asset'}>
        <form onSubmit={submit} className="space-y-3">
          <input placeholder="Employee ID (user id)" value={form.employeeId} onChange={e=>setForm({...form, employeeId:e.target.value})} className="w-full border rounded px-2 py-1" />
          <input placeholder="Serial number" required value={form.serialNumber} onChange={e=>setForm({...form, serialNumber:e.target.value})} className="w-full border rounded px-2 py-1" />
          <input placeholder="Network IP" value={form.networkIP} onChange={e=>setForm({...form, networkIP:e.target.value})} className="w-full border rounded px-2 py-1" />
          <div className="flex flex-wrap gap-3">
            {['laptopDesktop','speaker','headphone','monitor','keyboard','mouse'].map(k => (
              <label key={k} className="flex items-center gap-2"><input type="checkbox" checked={!!form[k]} onChange={e=>setForm({...form, [k]: e.target.checked})} />{k}</label>
            ))}
          </div>
          <textarea placeholder="Request change" value={form.requestChange} onChange={e=>setForm({...form, requestChange:e.target.value})} className="w-full border rounded px-2 py-1" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={()=>setOpen(false)} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-3 py-2 bg-brand-500 text-white rounded">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

