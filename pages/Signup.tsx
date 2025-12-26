import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Backend will be added later
    // For now, just redirect after signup
    navigate("/");
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

        <form onSubmit={handleSignup}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              required
              className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              required
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
                required
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
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition"
          >
            Create Account
          </button>
        </form>

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
