import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

const Question2 = () => {
  const navigate = useNavigate();
  const { updateProfileData } = useProfile();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [cycleLength, setCycleLength] = useState("");

  const handleNext = () => {
    if (height && weight && cycleLength) {
      updateProfileData({
        height_cm: parseInt(height),
        weight_kg: parseFloat(weight),
        cycle_length: parseInt(cycleLength)
      });
      navigate("/question3");
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
            Physical Information
          </h1>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-center">Tell us about your body</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">
          This helps us calculate your BMI and understand your cycle better.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Height (cm)</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-lavender-400"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="165"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Weight (kg)</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-lavender-400"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="60"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Average Cycle Length (days)</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-lavender-400"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              placeholder="28"
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!height || !weight || !cycleLength}
            className={`w-full font-semibold py-3 rounded-xl transition-all ${
              !height || !weight || !cycleLength
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-lavender-400 text-black hover:bg-lavender-300'
            }`}
          >
            Next
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Question2;
