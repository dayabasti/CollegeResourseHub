import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ currentSection, setCurrentSection }) {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (!storedToken) {
      navigate("/login");
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-600 to-pink-500 text-white fixed p-6 shadow-lg">
      <h2 className="text-2xl font-extrabold mb-10 text-center tracking-wide">
        📚 College Resource Hub
      </h2>

      <ul className="space-y-4 text-md font-semibold">
        {(role === "admin" || role === "user") && (
          <li
            onClick={() => setCurrentSection("upload")}
            className={`cursor-pointer px-4 py-2 rounded transition-all ${
              currentSection === "upload"
                ? "bg-white text-indigo-700 font-bold"
                : "hover:bg-white/20"
            }`}
          >
            📤 Upload
          </li>
        )}

        <li
          onClick={() => setCurrentSection("notes")}
          className={`cursor-pointer px-4 py-2 rounded transition-all ${
            currentSection === "notes"
              ? "bg-white text-indigo-700 font-bold"
              : "hover:bg-white/20"
          }`}
        >
          📄 Notes
        </li>

        <li
          onClick={() => setCurrentSection("pyqs")}
          className={`cursor-pointer px-4 py-2 rounded transition-all ${
            currentSection === "pyqs"
              ? "bg-white text-indigo-700 font-bold"
              : "hover:bg-white/20"
          }`}
        >
          📘 PYQs
        </li>

        <li
          onClick={() => setCurrentSection("interview")}
          className={`cursor-pointer px-4 py-2 rounded transition-all ${
            currentSection === "interview"
              ? "bg-white text-indigo-700 font-bold"
              : "hover:bg-white/20"
          }`}
        >
          💼 Interview Qs
        </li>

        <li
          className="cursor-pointer text-red-200 hover:text-white mt-10 px-4 py-2 transition-all"
          onClick={handleLogout}
        >
          🚪 Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
