import React, { useState, useEffect } from "react";
import API from "../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    designation: "",
    phone: "",
    altPhone: "",
    role: "Employee",
  });

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/users", form);
    fetchUsers();
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      designation: "",
      phone: "",
      altPhone: "",
      role: "Employee",
    });
  };

  const handleDelete = async (id) => {
    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  const toggleHold = async (id) => {
    await API.patch(`/users/${id}/hold`);
    fetchUsers();
  };

  return (
    <div>
      <h2>User Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input placeholder="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
        <input placeholder="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
        <input placeholder="Email" name="email" value={form.email} onChange={handleChange} required />
        <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required />
        <input placeholder="Designation" name="designation" value={form.designation} onChange={handleChange} />
        <input placeholder="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <input placeholder="Alternative Phone" name="altPhone" value={form.altPhone} onChange={handleChange} />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>
                <button onClick={() => toggleHold(u._id)}>
                  {u.status === "Active" ? "Hold" : "Unhold"}
                </button>
                <button onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;

