import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.js";
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";
  return (
    <><Navbar />
      <div className="flex pt-8 min-h-screen bg-gray-100">
        <aside className="w-60 bg-gray-800 text-white p-6 space-y-4">
          <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Home</Link>
          {isAdmin && (
            <Link to="/add-book" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Add Book</Link> 
          )}
          <Link to="/issue-book" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Issue Book</Link>
          <Link to="/return-book" className="block px-4 py-2 rounded hover:bg-gray-700 transition"> Return Book</Link>
          <Link to="/search" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Search</Link>
          <Link to="/membership" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Membership</Link>
        </aside>
        <main className="flex-1 bg-gradient-to-br from-slate-100 to-slate-300 px-6 py-8">
          <div className="bg-white max-w-2xl mx-auto rounded-3xl shadow-2xl p-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
              Welcome,{" "} <span className="text-blue-600">
                {user?.name || "User"}
              </span> </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="rounded-2xl bg-blue-50 border border-blue-200 p-6">
                <p className="text-sm text-blue-600 font-medium mb-1">Role</p>
                <p className="text-xl font-semibold text-blue-900 capitalize">{user?.role}</p>
              </div>
              <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6">
                <p className="text-sm text-rose-600 font-medium mb-1">Fine Due</p>
                <p className="text-xl font-semibold text-rose-900"> ₹{user?.fineDue ?? 0}</p>
              </div>
            </div>
            {isAdmin && (
              <><h1 className="text-lg font-semibold text-gray-800 mb-4 text-center">  Admin Controls </h1>
                <div className="bg-slate-50 rounded-3xl shadow-lg p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">{[
                      { label: "Add User", path: "/add-user" },
                      { label: "Manage Fines", path: "/manage-fines" },
                      { label: "View Users", path: "/users" },
                    ].map((btn) => (
                      <button key={btn.label}onClick={() => navigate(btn.path)}className="h-16 rounded-2xl bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 hover:shadow-xl active:scale-95 transition"> {btn.label}</button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;