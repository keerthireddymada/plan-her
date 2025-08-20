import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Question1 = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleAnswer = (answer) => {
    if (currentQuestion === 1) {
      setCurrentQuestion(2);
    } else {
      navigate("/question2");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white px-6">
      {currentQuestion === 1 ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Are your periods regular?</h2>
          <p className="text-gray-400 text-sm mb-6">
            Understanding your cycle helps us personalize your experience.
          </p>
          <button
            onClick={() => handleAnswer("Yes")}
            className="w-full bg-purple-500 text-white py-3 rounded-xl mb-4"
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer("No")}
            className="w-full bg-gray-700 text-white py-3 rounded-xl"
          >
            No
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">How do you describe your periods?</h2>
          <p className="text-gray-400 text-sm mb-6">
            This helps us understand your cycle better.
          </p>
          <button
            onClick={() => handleAnswer("Usual")}
            className="w-full bg-purple-500 text-white py-3 rounded-xl mb-4"
          >
            Usual
          </button>
          <button
            onClick={() => handleAnswer("Unusual")}
            className="w-full bg-gray-700 text-white py-3 rounded-xl"
          >
            Unusual
          </button>
        </>
      )}
    </div>
  );
};

export default Question1;
