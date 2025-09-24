import React, { useState, useEffect } from "react";
import api from "../services/api";

function EmptyRow() {
  return <div className="text-center p-6 text-gray-400">No announcements yet</div>;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", message: "" });

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get("/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch announcements", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/announcements", form);
      setForm({ title: "", message: "" });
      fetchAnnouncements();
    } catch (err) {
      console.error("❌ Failed to add announcement", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await api.delete(`/announcements/${id}`);
      fetchAnnouncements();
    } catch (err) {
      console.error("❌ Failed to delete announcement", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📢 Announcements</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6">
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border rounded px-2 py-1 mb-2"
        />
        <textarea
          required
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border rounded px-2 py-1 mb-2"
        />
        <button className="bg-brand-500 text-white px-4 py-2 rounded">Add Announcement</button>
      </form>

      <div className="bg-white shadow rounded">
        {announcements.length === 0 ? (
          <EmptyRow />
        ) : (
          announcements.map((a) => (
            <div
              key={a._id}
              className="flex justify-between items-center border-b p-4 hover:bg-gray-50"
            >
              <div>
                <div className="font-semibold">{a.title}</div>
                <div className="text-gray-600">{a.message}</div>
              </div>
              <button
                onClick={() => handleDelete(a._id)}
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

