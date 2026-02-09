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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#67B2D8] via-[#5A9BC4] to-[#4A8AB0] px-4 py-12">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#5A0E24] to-[#BF124D] bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 text-sm">Join Expernetic Library today</p>
        </div>

        {err && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm shadow-md animate-pulse">
            <strong>Error:</strong> {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              required
              placeholder="John Doe"
              className="w-full mt-1 p-4 border-2 border-gray-200 rounded-xl outline-none focus:border-[#BF124D] focus:ring-2 focus:ring-[#BF124D]/20 transition-all duration-300 bg-white/80 hover:bg-white text-gray-800 placeholder:text-gray-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              required
              type="email"
              placeholder="example@gmail.com"
              className="w-full mt-1 p-4 border-2 border-gray-200 rounded-xl outline-none focus:border-[#BF124D] focus:ring-2 focus:ring-[#BF124D]/20 transition-all duration-300 bg-white/80 hover:bg-white text-gray-800 placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password <span className="text-xs text-gray-500">(min. 6 characters)</span>
            </label>
            <input
              required
              minLength={6}
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 p-4 border-2 border-gray-200 rounded-xl outline-none focus:border-[#BF124D] focus:ring-2 focus:ring-[#BF124D]/20 transition-all duration-300 bg-white/80 hover:bg-white text-gray-800 placeholder:text-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-gradient-to-r from-[#BF124D] to-[#D91A5F] hover:from-[#76153C] hover:to-[#BF124D] text-white py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="text-[#BF124D] font-semibold hover:text-[#76153C] hover:underline transition-colors duration-200" to="/login">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
