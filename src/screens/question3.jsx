import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Question3 = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleNext = () => {
    navigate("/question4");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white px-6">
      <h2 className="text-xl font-semibold mb-6">How tall are you?</h2>

      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="w-full bg-purple-800 text-white py-3 px-4 rounded-xl mb-4"
      />

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="w-full bg-purple-800 text-white py-3 px-4 rounded-xl mb-6"
      />

      <button
        onClick={handleNext}
        className="w-full bg-purple-500 py-3 rounded-xl"
      >
        Next
      </button>
    </div>
  );
};

export default Question3;
