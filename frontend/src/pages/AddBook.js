import { useState } from "react";
import API from "../services/api";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    serialNo: "",
    type: "book"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.serialNo)
      return alert("All fields mandatory");

    await API.post("/books", form);
    alert("Book Added");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book</h2>
      <input placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}/>
      <input placeholder="Author"
        onChange={(e) => setForm({ ...form, author: e.target.value })}/>
      <input placeholder="Serial No"
        onChange={(e) => setForm({ ...form, serialNo: e.target.value })}/>
      
      <select onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option value="book">Book</option>
      </select>

      <button>Add</button>
    </form>
  );
}

export default AddBook;
