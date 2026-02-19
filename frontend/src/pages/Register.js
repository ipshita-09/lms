import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password)
      return alert("All fields mandatory");

    await API.post("/auth/register", form);
    alert("Registered successfully");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      
      <label>
        <input type="radio" value="user"
          checked={form.role === "user"}
          onChange={(e) => setForm({ ...form, role: e.target.value })}/>
        User
      </label>

      <label>
        <input type="radio" value="admin"
          onChange={(e) => setForm({ ...form, role: e.target.value })}/>
        Admin
      </label>

      <button>Register</button>
    </form>
  );
}

export default Register;
