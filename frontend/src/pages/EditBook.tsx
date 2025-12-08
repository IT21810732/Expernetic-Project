import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setDesc(res.data.description || "");
      } catch (err) {
        alert("Failed to load");
      }
    };
    load();
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/books/${id}`, { title, author, description: desc });
      nav("/");
    } catch (err: any) {
      alert(err?.response?.data || "Update failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Book</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            required
            placeholder="Title"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            required
            placeholder="Author"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
