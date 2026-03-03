import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    fineDue: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/admin/add-user", form);
      alert("User added successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Error adding user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New User
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="number"
          placeholder="Fine Due"
          className="w-full mb-4 p-2 border rounded-lg"
          onChange={(e) =>
            setForm({ ...form, fineDue: e.target.value })
          }
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;