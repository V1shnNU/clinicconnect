import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-extrabold text-center text-slate-800 mb-2">
          Create your <span className="text-blue-600">ClinicConnect</span> account
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Join us and manage your healthcare easily
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
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

        <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition">
          Create Account
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-3 text-sm text-slate-500 font-semibold">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <button className="w-full border-2 border-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
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
