import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password)
      return alert("All fields required");

    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button>Login</button>
      <Link to="/register">Register</Link>
    </form>
  );
}

export default Login;
