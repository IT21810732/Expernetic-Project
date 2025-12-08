import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { setToken } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      nav("/");
    } catch (error: any) {
      setErr(error?.response?.data || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Welcome
        </h2>

        {err && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              required
              type="email"
              placeholder="example@gmail.com"
              className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-medium"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="text-green-600 font-medium hover:underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
