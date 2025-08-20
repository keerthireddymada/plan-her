import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Brain, Utensils, Sun, Moon } from 'lucide-react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

const Home = () => {
  const currentDate = new Date();

// --- Data from your backend will go here ---
const [cycleDay, setCycleDay] = useState(14);
const [cyclePhase, setCyclePhase] = useState('Follicular Phase');
const [moodForecast, setMoodForecast] = useState('Energetic');
const [energyLevel, setEnergyLevel] = useState(85);

// This value is not from the backend yet
const nextPeriod = 14;

// --- This code fetches the data from your server ---
useEffect(() => {
  async function getPrediction() {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict');
      const data = await response.json();

      setCycleDay(data.day_of_cycle);
      setCyclePhase(data.cycle_phase);

      if (data.predicted_mood === 0) {
        setMoodForecast('Restful');
        setEnergyLevel(25);
      } else if (data.predicted_mood === 1) {
        setMoodForecast('Balanced');
        setEnergyLevel(60);
      } else if (data.predicted_mood === 2) {
        setMoodForecast('Energetic');
        setEnergyLevel(90);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setCyclePhase('Error');
      setMoodForecast('Could not load');
    }
  }
  getPrediction();
}, []);


  const selfCareReminders = [
    { icon: Sun, text: "Morning meditation", time: "8:00 AM" },
    { icon: Heart, text: "Light exercise", time: "6:00 PM" },
    { icon: Moon, text: "Wind down routine", time: "9:30 PM" }
  ];

  const foodRecommendations = [
    "Iron-rich foods (spinach, lentils)",
    "Omega-3 sources (salmon, walnuts)",
    "Complex carbs (quinoa, sweet potato)"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-20 px-6 pt-12 bg-black-950 min-h-screen"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Good morning, Sarah
        </motion.h1>
        <p className="text-black-400">{format(currentDate, 'EEEE, MMMM d')}</p>
      </div>

      {/* Cycle Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-lavender-600 rounded-2xl p-6 mb-6 text-white shadow-glow"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar size={24} className="mr-3" />
            <span className="text-lg font-semibold">Cycle Day {cycleDay}</span>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Next period in</p>
            <p className="text-xl font-bold">{nextPeriod} days</p>
          </div>
        </div>
        
        <div className="bg-black-900 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-lavender-200">Follicular Phase</span>
            <span className="text-sm font-medium text-white">Day {cycleDay} of 28</span>
          </div>
          <div className="w-full bg-black-700 rounded-full h-3">
            <div 
              className="bg-lavender-400 rounded-full h-3 transition-all duration-300"
              style={{ width: `${(cycleDay / 28) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Mood & Energy Forecast */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black-900 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center mb-4">
          <Brain className="text-lavender-400 mr-3" size={24} />
          <h2 className="text-lg font-semibold text-white">Today's Forecast</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-black-400 mb-1">Mood</p>
            <p className="text-xl font-bold text-lavender-400">{moodForecast}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-black-400 mb-1">Energy</p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-3 bg-black-800 rounded-full mr-2">
                <div 
                  className="h-3 bg-lavender-500 rounded-full transition-all duration-300"
                  style={{ width: `${energyLevel}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-white">{energyLevel}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Self-Care Reminders */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-black-900 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center mb-4">
          <Heart className="text-lavender-400 mr-3" size={24} />
          <h2 className="text-lg font-semibold text-white">Self-Care Today</h2>
        </div>
        
        <div className="space-y-3">
          {selfCareReminders.map((reminder, index) => {
            const Icon = reminder.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-black-800 rounded-xl"
              >
                <div className="flex items-center">
                  <Icon className="text-lavender-400 mr-3" size={18} />
                  <span className="text-white font-medium">{reminder.text}</span>
                </div>
                <span className="text-sm text-black-400">{reminder.time}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Food Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-black-900 rounded-2xl p-6"
      >
        <div className="flex items-center mb-4">
          <Utensils className="text-lavender-400 mr-3" size={24} />
          <h2 className="text-lg font-semibold text-white">Nutrition Focus</h2>
        </div>
        
        <div className="space-y-3">
          {foodRecommendations.map((food, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center p-3 bg-black-800 rounded-xl"
            >
              <div className="w-3 h-3 bg-lavender-400 rounded-full mr-3" />
              <span className="text-black-200">{food}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
