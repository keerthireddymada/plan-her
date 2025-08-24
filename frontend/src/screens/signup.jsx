import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    const result = await register(email, password, name);
    
    if (result.success) {
      // New users always need profile setup
      navigate("/question1");
    }
    
    setIsLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-black-950 text-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-sm bg-black-900 p-8 rounded-2xl shadow-lg">
        {/* Logo / Title */}
        <h1 className="text-3xl font-bold text-center mb-2 text-lavender-400">
          Create Account
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Start your journey with us
        </p>

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

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-lavender-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              disabled={isLoading}
            />
          </div>

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
                Creating account...
              </div>
            ) : (
              'Sign Up'
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <span
            className="text-lavender-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </motion.div>
  );
}
