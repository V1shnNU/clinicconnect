import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    // Frontend-only simulation
    console.log("Reset link sent to:", email);
    setSent(true);
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

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-bold mb-4">
              Reset link sent successfully!
            </p>
            <p className="text-sm text-slate-600">
              Check your email inbox.
            </p>
          </div>
        )}

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
