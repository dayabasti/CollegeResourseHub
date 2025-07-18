import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import PYQs from "./components/PYQs";
import InterviewQuestions from "./components/InterviewQuestions";
import Upload from "./components/Upload";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";



function HomeLayout({ currentSection, setCurrentSection, role, userName, setRole }) {

  return (
    <div className="flex">
      <Sidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        role={role}
        setRole={setRole}
        userName={userName}
      />
      <div className="ml-64 p-8 w-full">
        {/* ✅ Welcome Badge */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Welcome, <span className="capitalize">{userName || "Guest"}</span> 🎉
          </h1>
        </div>

        {/* Section content */}
        {currentSection === "notes" && <Notes role={role} />}
        {currentSection === "pyqs" && <PYQs role={role} />}
        {currentSection === "interview" && <InterviewQuestions role={role} />}
        {currentSection === "upload" && (role === "admin" || role === "user") && <Upload />}

      </div>
    </div>
  );
}

function App() {
  const [currentSection, setCurrentSection] = useState("notes");
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userName, setUserName] = useState(localStorage.getItem("name"));



  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");
    if (storedRole) setRole(storedRole);
    if (storedName) setUserName(storedName);
  }, []);

  return (
    <Router>
      <Routes>
        {/* ✅ Clean homepage without sidebar */}
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <HomeLayout
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              role={role}
              setRole={setRole}
              userName={userName}
            />
          }
        />


        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setRole={setRole} setUserName={setUserName} />} />
      </Routes>
    </Router>
  );
}

export default App;
