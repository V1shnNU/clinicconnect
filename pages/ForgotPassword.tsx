import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // ← payload
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMessage("Reset link sent successfully. Check your email.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-extrabold text-center text-slate-800 mb-2">
          Reset <span className="text-blue-600">Password</span>
        </h2>

        <p className="text-center text-slate-500 mb-6">
          Enter your email and we’ll send you reset instructions
        </p>

        {message && (
          <p className="text-green-600 font-semibold text-center mb-4">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 font-semibold text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;