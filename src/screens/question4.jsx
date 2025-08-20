1 import React, { useState } from "react";
    2 import { useNavigate } from "react-router-dom";
    3 
    4 const Question4 = () => {
    5   const navigate = useNavigate();
    6   const [conditions, setConditions] = useState("");
    7 
    8   // This is the new handleFinish function
    9   const handleFinish = async () => {
   10     // --- Step 1: Save the data from this final page ---
   11     const pageData = { medicalConditions: conditions };
   12     const existingData = JSON.parse(localStorage.getItem('questionnaireData')) || {};
   13     const allData = { ...existingData, ...pageData };
   14 
   15     // Save it one last time (optional, but good practice)
   16     localStorage.setItem('questionnaireData', JSON.stringify(allData));
   17
   18
   19     // --- Step 2: Create the final data object for the backend ---
   20     // Note: Your backend doesn't use all these fields yet, but we'll send them.
   21     // We are using default values for fields you haven't asked for, like height/weight.
   22     const finalApiData = {
   23       height_cm: allData.height || 165, // Using a default if not provided
   24       weight_kg: allData.weight || 60,   // Using a default if not provided
   25       cycle_length: allData.cycleLength,
   26       luteal_length: 14, // A common average
   27       menses_length: (new Date(allData.periodEndDate) - new Date(allData.lastPeriod)) / (1000 * 60 * 60 * 24),
   28       period_start_dates: [allData.lastPeriod],
   29       // Your backend expects these fields, so we'll send defaults
   30       Unusual_Bleeding: 0,
   31       number_of_peak: 2
   32     };
   33
   34
   35     // --- Step 3: Send the final object to the backend ---
   36     try {
   37       const response = await fetch('http://127.0.0.1:5000/setup', {
   38         method: 'POST',
   39         headers: { 'Content-Type': 'application/json' },
   40         body: JSON.stringify(finalApiData)
   41       });
   42
   43       const result = await response.json();
   44
   45       if (result.status === 'success') {
   46         alert('Setup complete! You will now be taken to the homepage.');
   47         // Clear the stored data after successful submission
   48         localStorage.removeItem('questionnaireData');
   49         navigate('/home'); // Go to the homepage
   50       } else {
   51         alert('Error: Could not complete setup. Please check your data.');
   52       }
   53     } catch (error) {
   54       console.error("Final submission error:", error);
   55       alert('Error: Could not connect to the server.');
   56     }
   57   };
   58
   59   return (
   60     <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white px-6">
   61       <h2 className="text-xl font-semibold mb-6">
   62         Do you suffer from any medical conditions?
   63         <br />If yes, please mention them.
   64       </h2>
   65
   66       <textarea
   67         placeholder="Mention all health conditions"
   68         value={conditions}
   69         onChange={(e) => setConditions(e.target.value)}
   70         className="w-full bg-purple-800 text-white py-3 px-4 rounded-xl mb-6"
   71       />
   72
   73       <button
   74         onClick={handleFinish}
   75         className="w-full bg-purple-500 py-3 rounded-xl"
   76       >
   77         Finish
   78       </button>
   79     </div>
   80   );
   81 };
   82
   83 export default Question4;
