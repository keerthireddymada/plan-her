import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Question4 = () => {
  const navigate = useNavigate();
  const [conditions, setConditions] = useState("");

  // This is the new handleFinish function
  const handleFinish = async () => {
    // --- Step 1: Save the data from this final page ---
    const pageData = { medicalConditions: conditions };
    const existingData = JSON.parse(localStorage.getItem('questionnaireData')) || {};
    const allData = { ...existingData, ...pageData };

    // Save it one last time (optional, but good practice)
    localStorage.setItem('questionnaireData', JSON.stringify(allData));

    // --- Step 2: Create the final data object for the backend ---
    // Note: Your backend doesn't use all these fields yet, but we'll send them.
    // We are using default values for fields you haven't asked for, like height/weight.
    const finalApiData = {
      height_cm: allData.height || 165, // Using a default if not provided
      weight_kg: allData.weight || 60,  // Using a default if not provided
      cycle_length: allData.cycleLength,
      luteal_length: 14, // A common average
      menses_length:
        (new Date(allData.periodEndDate) - new Date(allData.lastPeriod)) /
        (1000 * 60 * 60 * 24),
      period_start_dates: [allData.lastPeriod],
      // Your backend expects these fields, so we'll send defaults
      Unusual_Bleeding: 0,
      number_of_peak: 2
    };

    // --- Step 3: Send the final object to the backend ---
    try {
      const response = await fetch('http://127.0.0.1:5000/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalApiData)
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert('Setup complete! You will now be taken to the homepage.');
        // Clear the stored data after successful submission
        localStorage.removeItem('questionnaireData');
        navigate('/home'); // Go to the homepage
      } else {
        alert('Error: Could not complete setup. Please check your data.');
      }
    } catch (error) {
      console.error("Final submission error:", error);
      alert('Error: Could not connect to the server.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white px-6">
      <h2 className="text-xl font-semibold mb-6">
        Do you suffer from any medical conditions?
        <br />If yes, please mention them.
      </h2>

      <textarea
        placeholder="Mention all health conditions"
        value={conditions}
        onChange={(e) => setConditions(e.target.value)}
        className="w-full bg-purple-800 text-white py-3 px-4 rounded-xl mb-6"
      />

      <button
        onClick={handleFinish}
        className="w-full bg-purple-500 py-3 rounded-xl"
      >
        Finish
      </button>
    </div>
  );
};

export default Question4;

