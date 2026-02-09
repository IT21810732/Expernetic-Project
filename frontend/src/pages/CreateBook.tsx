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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#67B2D8] via-[#5A9BC4] to-[#4A8AB0] px-4 py-12">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-[1.01] transition-all duration-300">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-[#BF124D] to-[#D91A5F] rounded-full p-4 mb-4">
            <span className="text-4xl">📚</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#5A0E24] to-[#BF124D] bg-clip-text text-transparent mb-2">
            Add New Book
          </h2>
          <p className="text-gray-600 text-sm">Fill in the details to add a book to your library</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              placeholder="Enter book title..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl outline-none focus:border-[#BF124D] focus:ring-2 focus:ring-[#BF124D]/20 transition-all duration-300 bg-white/80 hover:bg-white text-gray-800 placeholder:text-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              required
              placeholder="Enter author name..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl outline-none focus:border-[#BF124D] focus:ring-2 focus:ring-[#BF124D]/20 transition-all duration-300 bg-white/80 hover:bg-white text-gray-800 placeholder:text-gray-400"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter book description (optional)..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl outline-none focus:border-[#BF124D] focus:ring-2 focus:ring-[#BF124D]/20 transition-all duration-300 bg-white/80 hover:bg-white text-gray-800 placeholder:text-gray-400 resize-none"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#BF124D] to-[#D91A5F] hover:from-[#76153C] hover:to-[#BF124D] text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving book...
              </span>
            ) : (
              "➕ Add Book to Library"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
