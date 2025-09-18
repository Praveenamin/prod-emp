import React, { useEffect, useState } from "react";
import api from "../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    designation: "",
    phoneNumber: "",
    alternativeNumber: "",
    role: "Employee",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open modal for new user
  const openNew = () => {
    setEditingId(null);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      designation: "",
      phoneNumber: "",
      alternativeNumber: "",
      role: "Employee",
    });
    setOpen(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, form);
      } else {
        await api.post("/users", form);
      }
      setOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  // Edit existing user
  const handleEdit = (user) => {
    setEditingId(user._id);
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      password: "",
      designation: user.designation || "",
      phoneNumber: user.phoneNumber || "",
      alternativeNumber: user.alternativeNumber || "",
      role: user.role || "Employee",
    });
    setOpen(true);
  };

  // Hold user
  const handleHold = async (id) => {
    if (!window.confirm("Hold this user?")) return;
    try {
      await api.patch(`/users/hold/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error holding user:", err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">👥 User Management</h2>
        <button
          onClick={openNew}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      {/* User Table */}
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

        {users.length === 0 ? (
          <div className="text-center p-6 text-gray-400">No users found</div>
        ) : (
          users.map((u) => (
            <div
              key={u._id}
              className="grid grid-cols-7 gap-2 p-3 items-center border-b hover:bg-gray-50"
            >
              <div>
                {u.firstName} {u.lastName}
              </div>
              <div>{u.email}</div>
              <div>{u.designation}</div>
              <div>{u.phoneNumber}</div>
              <div>{u.role}</div>
              <div>{u.status || "Active"}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleHold(u._id)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Hold
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit User" : "Add User"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  required
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className="border rounded px-2 py-1"
                />
                <input
                  required
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className="border rounded px-2 py-1"
                />
              </div>
              <input
                required
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Designation"
                  value={form.designation}
                  onChange={(e) =>
                    setForm({ ...form, designation: e.target.value })
                  }
                  className="border rounded px-2 py-1"
                />
                <input
                  placeholder="Phone"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, phoneNumber: e.target.value })
                  }
                  className="border rounded px-2 py-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Alternative number"
                  value={form.alternativeNumber}
                  onChange={(e) =>
                    setForm({ ...form, alternativeNumber: e.target.value })
                  }
                  className="border rounded px-2 py-1"
                />
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="border rounded px-2 py-1"
                >
                  <option>Employee</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;

