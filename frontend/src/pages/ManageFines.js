import { useEffect, useState } from "react";
import API from "../services/api";

function ManageFines() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const updateFine = async (id, fineDue) => {
    await API.put(`/admin/update-fine/${id}`, { fineDue });
    alert("Fine updated");
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Fines</h2>

      <div className="bg-white rounded-xl shadow p-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                defaultValue={user.fineDue}
                className="w-24 border rounded-lg px-2 py-1"
                onChange={(e) =>
                  (user.fineDue = e.target.value)
                }
              />

              <button
                onClick={() => updateFine(user._id, user.fineDue)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageFines;