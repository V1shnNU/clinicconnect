import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-extrabold text-center text-slate-800 mb-2">
          Log in to <span className="text-blue-600">ClinicConnect</span>
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Access your appointments and bookings
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
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

        {/* Forgot Password */}
        <div className="text-right mb-5">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
          Log In
        </button>

        {/* Create Account */}
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
