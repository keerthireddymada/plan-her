import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import { profileAPI } from "../services/api";

const Question4 = () => {
  const navigate = useNavigate();
  const { profileData, clearProfileData } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFinishSetup = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await profileAPI.createProfile(profileData);
      console.log("Profile creation response:", response);
      
      // FastAPI returns the created profile directly, not wrapped in success/message
      if (response.data) {
        clearProfileData();
        navigate("/home");
      } else {
        setError("Profile creation failed");
      }
    } catch (err) {
      console.error("Profile creation error:", err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Profile creation failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
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
          <img src="/logo.png" alt="PlanHer Logo" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-lavender-400 mb-2">
            Setup Complete
          </h1>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-center">You're all set!</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Your profile has been created. You can now start tracking your cycle and mood.
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

        <div className="space-y-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleFinishSetup}
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
                Creating Profile...
              </div>
            ) : (
              'Finish Setup'
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Question4;
