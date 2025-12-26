import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Invalid credentials") {
          setError("❌ User doesn't exist. Please register first.");
        } else {
          setError(data.message || "Login failed");
        }
        return;
      }

      localStorage.setItem("token", data.token);
      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-extrabold text-center text-slate-800 mb-2">
          Log in to <span className="text-blue-600">ClinicConnect</span>
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Access your appointments and bookings
        </p>

        {message && (
          <div className="mb-4 text-green-700 font-semibold text-center">{message}</div>
        )}
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm font-semibold text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="text-right mb-5">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
