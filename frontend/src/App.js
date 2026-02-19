import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import Membership from "./pages/Membership";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/issue-book" element={<IssueBook />} />
        <Route path="/return-book" element={<ReturnBook />} />
        <Route path="/membership" element={<Membership />} />
      </Routes>
    </Router>
  );
}

export default App;
