import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Inline message
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setMessage("");
    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setMessage("🎉 Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2s
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
          Create your <span className="text-blue-600">ClinicConnect</span> account
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Join us and manage your healthcare easily
        </p>

        {message && (
          <div className="mb-4 text-green-700 font-semibold text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
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

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
