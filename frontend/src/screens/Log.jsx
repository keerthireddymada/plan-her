import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Calendar,
  Smile,
  Zap,
  AlertCircle,
  Heart,
  Check,
} from "lucide-react";
import { moodAPI, periodAPI } from "../services/api";

const Log = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [energyLevel, setEnergyLevel] = useState(""); // Changed to string
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState("");
  const [isPeriodStarted, setIsPeriodStarted] = useState(false);
  const [periodStartDate, setPeriodStartDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const moods = [
    { value: "happy", label: "😊 Happy" },
    { value: "calm", label: "😌 Calm" },
    { value: "anxious", label: "😰 Anxious" },
    { value: "sad", label: "😢 Sad" },
    { value: "irritated", label: "😤 Irritated" },
  ];

  const commonSymptoms = [
    "Cramps",
    "Headache",
    "Bloating",
    "Fatigue",
    "Breast tenderness",
    "Mood swings",
    "Back pain",
    "Nausea",
    "Acne",
    "Food cravings",
  ];

  const toggleSymptom = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSaveLog = async () => {
    if (!energyLevel) {
      alert("Please select your energy level");
      return;
    }

    setSaving(true);
    setSaveSuccess(false);

    try {
      // Save mood data
      await moodAPI.createMood({
        date: new Date().toISOString().split("T")[0],
        energy_level: energyLevel,
        mood: selectedMood || "neutral",
        symptoms: symptoms.join(", "),
        notes: notes,
      });

      // Save period data if period started
      if (isPeriodStarted && periodStartDate) {
        await periodAPI.createPeriod({
          start_date: periodStartDate,
          end_date: null,
          flow_intensity: "medium",
        });
      }

      setSaveSuccess(true);

      // Clear form after successful save
      setTimeout(() => {
        setSelectedMood("");
        setEnergyLevel("");
        setSymptoms([]);
        setNotes("");
        setIsPeriodStarted(false);
        setPeriodStartDate("");
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error saving log:", error);
      alert("Failed to save log. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePeriod = () => {
    setIsPeriodStarted((prev) => !prev);
    if (!isPeriodStarted) {
      // Set today's date as default when starting period
      setPeriodStartDate(new Date().toISOString().split("T")[0]);
    } else {
      setPeriodStartDate("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-20 px-6 pt-12 bg-black-950 min-h-screen"
    >
      {/* Top Navigation */}

      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Daily Log
        </motion.h1>
        <p className="text-black-400">How are you feeling today?</p>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-900 border border-green-700 rounded-xl text-green-200 text-sm flex items-center"
        >
          <Check size={16} className="mr-2" />
          Log saved successfully!
        </motion.div>
      )}

      {/* Period Tracking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-black-900 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center mb-4">
          <Calendar className="text-lavender-400 mr-3" size={24} />
          <h2 className="text-lg font-semibold text-white">Period Tracking</h2>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-white">Did your period start today?</span>
          <button
            onClick={handleTogglePeriod}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              isPeriodStarted
                ? "bg-lavender-600 text-white"
                : "bg-black-800 text-gray-400 hover:bg-black-700"
            }`}
          >
            {isPeriodStarted ? "Yes" : "No"}
          </button>
        </div>

        {isPeriodStarted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3"
          >
            <label className="block text-sm text-gray-400">
              Period Start Date
            </label>
            <input
              type="date"
              value={periodStartDate}
              onChange={(e) => setPeriodStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-black-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-400"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-black-900 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center mb-4">
          <Heart className="text-lavender-400 mr-3" size={24} />
          <h2 className="text-lg font-semibold text-white">Notes</h2>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How are you feeling today? Any observations or thoughts..."
          className="w-full h-24 p-3 bg-black-800 text-white placeholder-black-400 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lavender-500"
        />
      </motion.div>

      {/* Energy Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black-900 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center mb-4">
          <Zap className="text-lavender-400 mr-3" size={24} />
          <h2 className="text-lg font-semibold text-white">Energy Level</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["low", "medium", "high"].map((level) => (
            <motion.button
              key={level}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEnergyLevel(level)}
              className={`p-3 rounded-xl transition-all capitalize ${
                energyLevel === level
                  ? "bg-lavender-600 text-white"
                  : "bg-black-800 text-black-400"
              }`}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mood Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-black-900 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center mb-4">
          <Smile className="text-lavender-400 mr-3" size={24} />
          <h2 className="text-lg font-semibold text-white">Mood</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-3 rounded-xl transition-all ${
                selectedMood === mood.value
                  ? "bg-lavender-600 text-white"
                  : "bg-black-800 text-black-400"
              }`}
            >
              <span className="text-sm font-medium">{mood.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Symptoms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-black-900 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center mb-4">
          <AlertCircle className="text-lavender-400 mr-3" size={24} />
          <h2 className="text-lg font-semibold text-white">Symptoms</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {commonSymptoms.map((symptom) => (
            <motion.button
              key={symptom}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSymptom(symptom)}
              className={`p-3 rounded-xl transition-all text-sm ${
                symptoms.includes(symptom)
                  ? "bg-lavender-600 text-white"
                  : "bg-black-800 text-black-400"
              }`}
            >
              {symptom}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSaveLog}
        disabled={saving}
        className={`w-full rounded-2xl p-4 font-semibold transition-all ${
          saving
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-lavender-600 text-white hover:bg-lavender-500"
        }`}
      >
        {saving ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Saving...
          </div>
        ) : (
          "Save Today's Log"
        )}
      </motion.button>
    </motion.div>
  );
};

export default Log;
