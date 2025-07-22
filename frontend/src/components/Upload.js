// src/components/Upload.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function Upload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [section, setSection] = useState("notes");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      navigate("/login");
    }
  }, [navigate]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Not authenticated!");

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file?.type)) {
      return alert("❌ Only PDF, JPEG, and PNG files are allowed.");
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file?.size > maxSizeInBytes) {
      return alert("❌ File size should not exceed 5 MB.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("section", section);

    try {
      await axios.post(`${API_BASE_URL}/api/resources/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Uploaded successfully!");
      setFile(null);
      setTitle("");
      setTags("");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
          📤 Upload a Resource
        </h2>

        <form onSubmit={handleUpload} className="space-y-6">
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="notes">Notes</option>
            <option value="pyqs">PYQs</option>
            <option value="interview">Interview Questions</option>
          </select>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 bg-white border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;

