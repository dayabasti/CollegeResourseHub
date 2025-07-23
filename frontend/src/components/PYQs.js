import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


function PYQs({ role }) {
  const [resources, setResources] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recent");

  const getFileType = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "image";
    if (ext === "pdf") return "pdf";
    return "other";
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/resources/section/pyqs`)
      .then((res) => {
        const sorted = sortResources(res.data, sortOption);
        setResources(res.data);
        setFiltered(sorted);
      })
      .catch((err) => console.error("Error fetching PYQs:", err));
  }, [sortOption]);

  useEffect(() => {
    setFiltered((prev) => sortResources(prev, sortOption));
  }, [sortOption]);

  const sortResources = (resList, option) => {
    const sorted = [...resList];
    if (option === "recent") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === "size") {
      sorted.sort((a, b) => (b.size || 0) - (a.size || 0));
    }
    return sorted;
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const result = resources.filter((res) =>
      res.title.toLowerCase().includes(query) ||
      res.tags?.join(",").toLowerCase().includes(query)
    );
    setFiltered(sortResources(result, sortOption));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/resources/${id}`);
      const updated = resources.filter((res) => res._id !== id);
      setResources(updated);
      setFiltered(sortResources(updated, sortOption));
      alert("Deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete");
    }
  };

  const handleView = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/api/resources/view/${id}`);
      const res = await axios.get(`${API_BASE_URL}/api/resources/section/pyqs`);
      setResources(res.data);
      setFiltered(sortResources(res.data, sortOption));
    } catch (err) {
      console.error("View update failed", err);
    }
  };

  const handleRate = async (id, rating) => {
    try {
      await axios.post(`${API_BASE_URL}/api/resources/${id}/rate`, { rating });
      const updated = await axios.get(`${API_BASE_URL}/api/resources/section/pyqs`);
      setResources(updated.data);
      setFiltered(sortResources(updated.data, sortOption));
      alert("⭐️ Rated successfully!");
    } catch (err) {
      alert("❌ Rating failed");
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-700">📚 PYQs</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search PYQs by title or tags..."
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="recent">📅 Sort by Most Recent</option>
          <option value="size">📦 Sort by Size</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((res) => (
          <div key={res._id} className="bg-white/60 backdrop-blur rounded-lg p-4 shadow hover:shadow-md transition-all duration-300 text-sm space-y-2">
            <div className="flex justify-center items-center h-16">
              {getFileType(res.file) === "image" ? (
                <img
                  src={`${API_BASE_URL}/uploads/${res.file}`}
                  alt="Thumbnail"
                  className="h-full object-contain rounded"
                />
              ) : getFileType(res.file) === "pdf" ? (
                <div className="text-red-600 text-2xl">📄</div>
              ) : (
                <div className="text-gray-500 text-2xl">📁</div>
              )}
            </div>

            <a
              href={`${API_BASE_URL}/uploads/${res.file}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleView(res._id)}
              className="text-purple-700 hover:underline font-semibold block truncate"
            >
              {res.title}
            </a>

            <p className="text-xs text-gray-600 truncate">
              <strong>Tags:</strong> {res.tags?.join(", ") || "None"}
            </p>

            <div className="text-xs text-gray-600 space-y-0.5">
              <p><strong>Size:</strong> {(res.size / 1024).toFixed(1)} KB</p>
              <p><strong>Date:</strong> {new Date(res.createdAt).toLocaleDateString()}</p>
              <p><strong>Views:</strong> {res.views}</p>
            </div>

            <div className="flex items-center justify-between text-xs mt-2">
              <span>⭐ {res.averageRating?.toFixed(1) || "0.0"}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRate(res._id, star)}
                    className="text-yellow-400 hover:scale-110 transition"
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            {role === "admin" && (
              <button
                onClick={() => handleDelete(res._id)}
                className="text-red-500 text-xs mt-2 hover:underline"
              >
                🗑️ Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PYQs;
