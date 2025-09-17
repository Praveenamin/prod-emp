import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Dialog } from '@headlessui/react';
import { PlusIcon, TrashIcon, ExternalLink } from 'lucide-react';

const Quicklinks = () => {
  const [links, setLinks] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', url: '' });

  const fetchLinks = async () => {
    try {
      const res = await axios.get('/quicklinks');
      setLinks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/quicklinks', formData);
      setOpen(false);
      setFormData({ title: '', url: '' });
      fetchLinks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this quicklink?')) {
      await axios.delete(`/quicklinks/${id}`);
      fetchLinks();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Quicklinks</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon size={16} /> Add
        </button>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {links.map((link) => (
          <div
            key={link._id}
            className="p-4 border rounded shadow hover:shadow-lg flex justify-between items-center transition"
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
              {link.title} <ExternalLink size={14} />
            </a>
            <button onClick={() => handleDelete(link._id)} className="text-red-600 hover:text-red-800">
              <TrashIcon size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Quicklink Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4">Add Quicklink</Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Title"
                className="w-full border rounded px-2 py-1"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <input
                type="url"
                placeholder="URL (https://example.com)"
                className="w-full border rounded px-2 py-1"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
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

export default Quicklinks;

