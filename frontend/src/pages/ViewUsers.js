import { useEffect, useState } from "react";
import API from "../services/api";

function ViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?"))
    return;

  try {
    await API.delete(`/admin/users/${id}`);
    fetchUsers(); // refresh list
  } catch (err) {
    alert("Delete failed");
  }
};
  
  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Fine Due</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 text-red-600 font-semibold">
                  ₹{user.fineDue}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-4 py-2 rounder-lg bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewUsers;