import { useState } from "react";
import API from "../services/api";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    serialNo: "",
    type: "book",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.serialNo)
      return alert("All fields mandatory");

    await API.post("/books", form);
    alert("Book Added");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Book
        </h2>

        <input
          placeholder="Title"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Author"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
        />

        <input
          placeholder="Serial No"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) =>
            setForm({ ...form, serialNo: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;