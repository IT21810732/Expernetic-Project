import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { setToken } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      await api.post("/auth/register", { email, password, fullName });

      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      nav("/");
    } catch (error: any) {
      setErr(error?.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#67B2D8]/80 px-4">
      <div className="w-full max-w-md bg-white/50 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        {err && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              required
              placeholder="John Doe"
              className="w-full mt-1 p-3 border rounded-lg outline-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              required
              type="email"
              placeholder="example@gmail.com"
              className="w-full mt-1 p-3 border rounded-lg outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              required
              minLength={6}
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 p-3 border rounded-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-[#BF124D] hover:bg-[#76153C] text-white py-3 rounded-lg transition font-medium"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="text-[#BF124D] font-medium hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
