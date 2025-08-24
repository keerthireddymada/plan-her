import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

const Question3 = () => {
  const navigate = useNavigate();
  const { updateProfileData } = useProfile();
  const [lutealLength, setLutealLength] = useState("");
  const [mensesLength, setMensesLength] = useState("");

  const handleNext = () => {
    if (lutealLength && mensesLength) {
      updateProfileData({
        luteal_length: parseInt(lutealLength),
        menses_length: parseInt(mensesLength)
      });
      navigate("/question4");
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
            Cycle Details
          </h1>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-center">More about your cycle</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">
          These details help us provide more accurate predictions.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Luteal Phase Length (days)</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-lavender-400"
              value={lutealLength}
              onChange={(e) => setLutealLength(e.target.value)}
              placeholder="14"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Menses Length (days)</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-black-800 text-white focus:outline-none focus:ring-2 focus:ring-lavender-400"
              value={mensesLength}
              onChange={(e) => setMensesLength(e.target.value)}
              placeholder="5"
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!lutealLength || !mensesLength}
            className={`w-full font-semibold py-3 rounded-xl transition-all ${
              !lutealLength || !mensesLength
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

export default Question3;
