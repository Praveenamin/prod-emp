import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Dialog } from '@headlessui/react';
import { TrashIcon, PencilIcon, PlusIcon } from 'lucide-react';

const ITAssetManagement = () => {
  const [assets, setAssets] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    laptopDesktop: false,
    serialNumber: '',
    speaker: false,
    headphone: false,
    monitor: false,
    keyboard: false,
    mouse: false,
    networkIP: '',
    requestChange: ''
  });

  // Fetch assets
  const fetchAssets = async () => {
    try {
      const res = await axios.get('/it-assets');
      setAssets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Add or update asset
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`/it-assets/${formData._id}`, formData);
      } else {
        await axios.post('/it-assets', formData);
      }
      setOpen(false);
      setFormData({
        employeeId: '',
        laptopDesktop: false,
        serialNumber: '',
        speaker: false,
        headphone: false,
        monitor: false,
        keyboard: false,
        mouse: false,
        networkIP: '',
        requestChange: ''
      });
      fetchAssets();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete asset
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      await axios.delete(`/it-assets/${id}`);
      fetchAssets();
    }
  };

  // Edit asset
  const handleEdit = (asset) => {
    setFormData(asset);
    setOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">IT Asset Management</h2>
      <button
        onClick={() => setOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
      >
        <PlusIcon size={16} /> Add Asset
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Laptop/Desktop</th>
              <th className="p-2 border">Serial Number</th>
              <th className="p-2 border">Speaker</th>
              <th className="p-2 border">Headphone</th>
              <th className="p-2 border">Monitor</th>
              <th className="p-2 border">Keyboard</th>
              <th className="p-2 border">Mouse</th>
              <th className="p-2 border">Network IP</th>
              <th className="p-2 border">Requests</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id} className="text-center border-b hover:bg-gray-50">
                <td className="p-2 border">{asset.employeeId?.firstName} {asset.employeeId?.lastName}</td>
                <td className="p-2 border">{asset.laptopDesktop ? '✅' : '❌'}</td>
                <td className="p-2 border">{asset.serialNumber}</td>
                <td className="p-2 border">{asset.speaker ? '✅' : '❌'}</td>
                <td className="p-2 border">{asset.headphone ? '✅' : '❌'}</td>
                <td className="p-2 border">{asset.monitor ? '✅' : '❌'}</td>
                <td className="p-2 border">{asset.keyboard ? '✅' : '❌'}</td>
                <td className="p-2 border">{asset.mouse ? '✅' : '❌'}</td>
                <td className="p-2 border">{asset.networkIP}</td>
                <td className="p-2 border">{asset.requestChange}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button onClick={() => handleEdit(asset)} className="text-yellow-600 hover:text-yellow-800">
                    <PencilIcon size={16} />
                  </button>
                  <button onClick={() => handleDelete(asset._id)} className="text-red-600 hover:text-red-800">
                    <TrashIcon size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4">
              {formData._id ? 'Edit Asset' : 'Add Asset'}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Employee ID"
                className="w-full border rounded px-2 py-1"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Serial Number"
                className="w-full border rounded px-2 py-1"
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Network IP"
                className="w-full border rounded px-2 py-1"
                value={formData.networkIP}
                onChange={(e) => setFormData({ ...formData, networkIP: e.target.value })}
                required
              />

              <div className="flex flex-wrap gap-2">
                {['laptopDesktop', 'speaker', 'headphone', 'monitor', 'keyboard', 'mouse'].map((key) => (
                  <label key={key} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                    />
                    {key}
                  </label>
                ))}
              </div>

              <textarea
                placeholder="Request Change"
                className="w-full border rounded px-2 py-1"
                value={formData.requestChange}
                onChange={(e) => setFormData({ ...formData, requestChange: e.target.value })}
              />

              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  {formData._id ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ITAssetManagement;

