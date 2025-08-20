import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Question2 = () => {
  const navigate = useNavigate();
  const [lastPeriod, setLastPeriod] = useState("");
  const [periodEndDate, setPeriodEndDate] = useState("");
  const [cycleLength, setCycleLength] = useState("");

  const handleNext = () => {
    const pageData = {
      lastPeriod: lastPeriod,
      periodEndDate: periodEndDate,
      cycleLength: parseInt(cycleLength),
    };

    // Get any data you saved from previous pages
    const existingData = JSON.parse(localStorage.getItem('questionnaireData')) || {};
    
    // Add this page's data to it
    const updatedData = { ...existingData, ...pageData };
    
    // Save the combined data back to local storage
    localStorage.setItem('questionnaireData', JSON.stringify(updatedData));

    navigate("/question3");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white px-6">
      <h2 className="text-xl font-semibold mb-6">When did your last period start?</h2>

      <input
        type="date"
        value={lastPeriod}
        onChange={(e) => setLastPeriod(e.target.value)}
        className="w-full bg-purple-800 text-white py-3 px-4 rounded-xl mb-4"
      />

      <h2 className="text-xl font-semibold mb-6">When did your period end?</h2>

      <input
        type="date"
        value={periodEndDate}
        onChange={(e) => setPeriodEndDate(e.target.value)}
        className="w-full bg-purple-800 text-white py-3 px-4 rounded-xl mb-6"
      />

      <h2 className="text-xl font-semibold mb-6">What was your last cycle's length?</h2>

      <input
        type="number"
        value={cycleLength}
        onChange={(e) => setCycleLength(e.target.value)}
        className="w-full bg-purple-800 text-white py-3 px-4 rounded-xl mb-6"
        placeholder="e.g., 28 days"
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

export default Question2;
