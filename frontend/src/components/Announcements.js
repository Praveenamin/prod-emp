import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Modal from './common/Modal';

export default function Announcements() {
  const [ann, setAnn] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title:'', message:'' });

  const fetch = async () => {
    try { const res = await api.get('/announcements'); setAnn(res.data); } catch(e){console.error(e);}
  };
  useEffect(()=>{ fetch(); }, []);

  const submit = async (e)=>{ e.preventDefault(); await api.post('/announcements', form); setOpen(false); setForm({title:'',message:''}); fetch(); }
  const remove = async (id)=>{ if(!confirm('Delete announcement?')) return; await api.delete(`/announcements/${id}`); fetch(); }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <button onClick={()=>setOpen(true)} className="px-4 py-2 bg-brand-500 text-white rounded">Add</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ann.map(a => (
          <div key={a._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{a.message}</p>
              </div>
              <button onClick={()=>remove(a._id)} className="text-red-600">Delete</button>
            </div>
            <div className="mt-3 text-xs text-gray-400">{new Date(a.createdAt || a.publishedAt).toLocaleString()}</div>
          </div>
        ))}
        {ann.length === 0 && <div className="col-span-3 text-center p-6 text-gray-400">No announcements</div>}
      </div>

      <Modal isOpen={open} setIsOpen={setOpen} title="Add Announcement">
        <form onSubmit={submit} className="space-y-3">
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full border rounded px-2 py-1" required />
          <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full border rounded px-2 py-1" required />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={()=>setOpen(false)} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-3 py-2 bg-brand-500 text-white rounded">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

