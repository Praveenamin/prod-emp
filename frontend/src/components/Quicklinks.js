import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Modal from './common/Modal';

export default function Quicklinks(){
  const [links, setLinks] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title:'', url:'' });

  const fetch = async()=>{ try{ const res = await api.get('/quicklinks'); setLinks(res.data); } catch(e){console.error(e)} }
  useEffect(()=>{ fetch(); }, []);

  const submit = async e=>{ e.preventDefault(); await api.post('/quicklinks', form); setOpen(false); setForm({title:'',url:''}); fetch(); }
  const remove = async id=>{ if(!confirm('Delete quicklink?')) return; await api.delete(`/quicklinks/${id}`); fetch(); }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quicklinks</h2>
        <button onClick={()=>setOpen(true)} className="px-4 py-2 bg-brand-500 text-white rounded">Add</button>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {links.map(l => (
          <div key={l._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <a className="text-blue-600 hover:underline" href={l.url} target="_blank" rel="noreferrer">{l.title}</a>
            <button onClick={()=>remove(l._id)} className="text-red-600">Delete</button>
          </div>
        ))}
        {links.length === 0 && <div className="col-span-4 text-center p-6 text-gray-400">No quicklinks</div>}
      </div>

      <Modal isOpen={open} setIsOpen={setOpen} title="Add Quicklink">
        <form onSubmit={submit} className="space-y-3">
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full border rounded px-2 py-1" required />
          <input placeholder="URL (https://...)" value={form.url} onChange={e=>setForm({...form, url:e.target.value})} className="w-full border rounded px-2 py-1" required />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={()=>setOpen(false)} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-3 py-2 bg-brand-500 text-white rounded">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

