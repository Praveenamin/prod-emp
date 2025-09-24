import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Modal from './common/Modal';

function EmptyRow() {
  return <div className="text-center p-6 text-gray-400">No users found</div>;
}

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', designation: '', phoneNumber: '', alternativeNumber: '', role: 'Employee'
  });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const openNew = () => {
    setEditingId(null);
    setForm({ firstName: '', lastName: '', email: '', password: '', designation: '', phoneNumber: '', alternativeNumber: '', role: 'Employee' });
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, form);
      } else {
        await api.post('/users', form);
      }
      setOpen(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      password: '',
      designation: user.designation || '',
      phoneNumber: user.phoneNumber || '',
      alternativeNumber: user.alternativeNumber || '',
      role: user.role || 'Employee'
    });
    setOpen(true);
  };

  const handleHold = async (id) => {
    if (!window.confirm('Hold this user?')) return;
    await api.patch(`/users/hold/${id}`);
    fetchUsers();
  };

  const handleActivate = async (id) => {
    if (!window.confirm('Activate this user?')) return;
    await api.patch(`/users/activate/${id}`);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div>
          <button onClick={openNew} className="px-4 py-2 bg-brand-500 text-white rounded">Add User</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-2 p-3 text-xs font-semibold text-gray-500 border-b">
          <div>Employee</div>
          <div>Email</div>
          <div>Designation</div>
          <div>Phone</div>
          <div>Role</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {users.length === 0 ? <EmptyRow/> : users.map(u => (
          <div key={u._id} className="grid grid-cols-7 gap-2 p-3 items-center border-b hover:bg-gray-50">
            <div>{u.firstName} {u.lastName}</div>
            <div>{u.email}</div>
            <div>{u.designation}</div>
            <div>{u.phoneNumber}</div>
            <div>{u.role}</div>
            <div>{u.status || 'Active'}</div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(u)} className="text-yellow-600 hover:text-yellow-800">Edit</button>
              {u.status === 'On Hold' ? (
                <button onClick={() => handleActivate(u._id)} className="text-green-600">Activate</button>
              ) : (
                <button onClick={() => handleHold(u._id)} className="text-indigo-600">Hold</button>
              )}
              <button onClick={() => handleDelete(u._id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={open} setIsOpen={setOpen} title={editingId ? 'Edit User' : 'Add User'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input required placeholder="First name" value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} className="border rounded px-2 py-1" />
            <input required placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} className="border rounded px-2 py-1" />
          </div>
          <input required placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full border rounded px-2 py-1" />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full border rounded px-2 py-1" />
          <div className="grid grid-cols-2 gap-2">
            <input placeholder="Designation" value={form.designation} onChange={e=>setForm({...form, designation:e.target.value})} className="border rounded px-2 py-1" />
            <input placeholder="Phone" value={form.phoneNumber} onChange={e=>setForm({...form, phoneNumber:e.target.value})} className="border rounded px-2 py-1" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input placeholder="Alternative number" value={form.alternativeNumber} onChange={e=>setForm({...form, alternativeNumber:e.target.value})} className="border rounded px-2 py-1" />
            <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="border rounded px-2 py-1">
              <option>Employee</option>
              <option>Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={()=>setOpen(false)} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-3 py-2 bg-brand-500 text-white rounded">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

