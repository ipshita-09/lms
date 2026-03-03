import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-gray-800 flex items-center justify-between px-6 shadow-md z-20">
      {/* Left text */}
      <h1 className="text-white text-xl font-bold tracking-wide">
        Library Management System
      </h1>

      {/* Logout */}
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;