import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

const Question1 = () => {
  const navigate = useNavigate();
  const { updateProfileData } = useProfile();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [cycleRegular, setCycleRegular] = useState(null);
  const [unusualBleeding, setUnusualBleeding] = useState(null);

  const handleAnswer = (answer) => {
    if (currentQuestion === 1) {
      setCycleRegular(answer === "Yes");
      setCurrentQuestion(2);
    } else {
      setUnusualBleeding(answer === "Unusual");
      // Save the data and move to next question
      updateProfileData({
        unusual_bleeding: answer === "Unusual"
      });
      navigate("/question2");
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
            {currentQuestion === 1 ? "Cycle Regularity" : "Period Description"}
          </h1>
        </div>

        {currentQuestion === 1 ? (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">Are your periods regular?</h2>
            <p className="text-gray-400 text-sm mb-6 text-center">
              Understanding your cycle helps us personalize your experience.
            </p>
            <div className="space-y-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer("Yes")}
                className="w-full font-semibold py-3 rounded-xl bg-lavender-400 text-black hover:bg-lavender-300 transition-all"
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer("No")}
                className="w-full font-semibold py-3 rounded-xl bg-black-800 text-white hover:bg-black-700 transition-all"
              >
                No
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">How do you describe your periods?</h2>
            <p className="text-gray-400 text-sm mb-6 text-center">
              This helps us understand your cycle better.
            </p>
            <div className="space-y-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer("Usual")}
                className="w-full font-semibold py-3 rounded-xl bg-lavender-400 text-black hover:bg-lavender-300 transition-all"
              >
                Usual
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer("Unusual")}
                className="w-full font-semibold py-3 rounded-xl bg-black-800 text-white hover:bg-black-700 transition-all"
              >
                Unusual
              </motion.button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Question1;
