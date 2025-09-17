import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Dialog } from '@headlessui/react';
import { TrashIcon, PlusIcon } from 'lucide-react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', message: '' });

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get('/announcements');
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/announcements', formData);
      setOpen(false);
      setFormData({ title: '', message: '' });
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this announcement?')) {
      await axios.delete(`/announcements/${id}`);
      fetchAnnouncements();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon size={16} /> Add
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map((item) => (
          <div key={item._id} className="p-4 border rounded shadow hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="mt-2 text-gray-700">{item.message}</p>
              </div>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">
                <TrashIcon size={16} />
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Add Announcement Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4">Add Announcement</Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Title"
                className="w-full border rounded px-2 py-1"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Message"
                className="w-full border rounded px-2 py-1"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Add
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Announcements;

