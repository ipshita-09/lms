import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: 10, background: "#eee" }}>
      {user && (
        <>
          <Link to="/dashboard">Dashboard </Link>
          {user.role === "admin" && <Link to="/add-book">Add Book </Link>}
          <Link to="/issue-book">Issue </Link>
          <Link to="/return-book">Return </Link>
          <Link to="/membership">Membership </Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Navbar;
