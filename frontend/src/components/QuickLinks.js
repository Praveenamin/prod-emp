import React, { useState, useEffect } from "react";
import api from "../services/api";

function EmptyRow() {
  return <div className="text-center p-6 text-gray-400">No quick links yet</div>;
}

export default function QuickLinks() {
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState({ label: "", url: "" });

  const fetchLinks = async () => {
    try {
      const res = await api.get("/quicklinks");
      setLinks(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch quick links", err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/quicklinks", form);
      setForm({ label: "", url: "" });
      fetchLinks();
    } catch (err) {
      console.error("❌ Failed to add quick link", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this quick link?")) return;
    try {
      await api.delete(`/quicklinks/${id}`);
      fetchLinks();
    } catch (err) {
      console.error("❌ Failed to delete quick link", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🔗 Quick Links</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6">
        <input
          required
          placeholder="Label"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          className="w-full border rounded px-2 py-1 mb-2"
        />
        <input
          required
          placeholder="URL"
          type="url"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          className="w-full border rounded px-2 py-1 mb-2"
        />
        <button className="bg-brand-500 text-white px-4 py-2 rounded">Add Link</button>
      </form>

      <div className="bg-white shadow rounded">
        {links.length === 0 ? (
          <EmptyRow />
        ) : (
          links.map((link) => (
            <div
              key={link._id}
              className="flex justify-between items-center border-b p-4 hover:bg-gray-50"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {link.label}
              </a>
              <button
                onClick={() => handleDelete(link._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

