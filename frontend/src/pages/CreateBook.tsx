import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/books", { title, author, description: desc });
      nav("/");
    } catch (err: any) {
      alert(err?.response?.data || "Create failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#67B2D8]/80 px-4">
      <div className="w-full max-w-lg bg-white/50 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Book</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            required
            placeholder="Title"
            className="w-full p-3 border rounded-lg outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            required
            placeholder="Author"
            className="w-full p-3 border rounded-lg outline-none"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg outline-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#BF124D] hover:bg-[#76153C] text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
