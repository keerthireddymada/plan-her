import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    const result = await login(email, password);
    
    if (result.success) {
      // Redirect based on profile status
      if (result.hasProfile) {
        navigate("/home"); // User has profile → go to home
      } else {
        navigate("/question1"); // User needs profile setup → go to questions
      }
    }
    
    setIsLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-black-950 text-white px-6 font-serif"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-sm bg-black-900 p-8 rounded-2xl shadow-lg">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="PlanHer Logo" className="w-24 h-24 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-lavender-400">
            PlanHer
          </h1>
          <p className="text-white mt-2">
            Track your period cycle, understand your body, and live in sync with your natural rythm.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-lavender-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-lavender-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className={`w-full font-semibold py-3 rounded-xl transition-all ${
              isLoading 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-lavender-400 text-black hover:bg-lavender-300'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <span
            className="text-lavender-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </motion.div>
  );
}
