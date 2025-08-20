import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Question4 = () => {
  const navigate = useNavigate();
  const [conditions, setConditions] = useState("");

  const handleFinish = () => {
    navigate("/home");
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

export default Question4;
