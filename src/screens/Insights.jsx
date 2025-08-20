import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Bell, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const Insights = () => {
  const [notificationSettings, setNotificationSettings] = React.useState([
    true, true, true, false, false
  ]);

  const toggleNotification = (index) => {
    const newSettings = [...notificationSettings];
    newSettings[index] = !newSettings[index];
    setNotificationSettings(newSettings);
  };
  const moodData = [
    { day: 'Mon', mood: 7, energy: 6 },
    { day: 'Tue', mood: 8, energy: 8 },
    { day: 'Wed', mood: 6, energy: 5 },
    { day: 'Thu', mood: 9, energy: 9 },
    { day: 'Fri', mood: 7, energy: 7 },
    { day: 'Sat', mood: 8, energy: 8 },
    { day: 'Sun', mood: 9, energy: 9 },
  ];

  const weeklyPlan = [
    { day: 'Mon', activity: 'High-intensity workout', optimal: true },
    { day: 'Tue', activity: 'Creative work session', optimal: true },
    { day: 'Wed', activity: 'Light yoga', optimal: false },
    { day: 'Thu', activity: 'Social activities', optimal: true },
    { day: 'Fri', activity: 'Rest and recovery', optimal: false },
    { day: 'Sat', activity: 'Meal prep', optimal: true },
    { day: 'Sun', activity: 'Self-care day', optimal: true },
  ];

  const insights = [
    {
      type: 'pattern',
      title: 'Cycle Pattern Detected',
      description: 'Your cycles have been consistent at 28 days for the past 3 months.',
      status: 'normal'
    },
    {
      type: 'mood',
      title: 'Mood Improvement',
      description: 'Your mood ratings have increased by 15% this month.',
      status: 'positive'
    },
    {
      type: 'warning',
      title: 'Irregular Sleep',
      description: 'Consider maintaining consistent sleep schedule during PMS.',
      status: 'attention'
    }
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
          Insights
        </motion.h1>
        <p className="text-black-400">Understand your patterns and optimize your life</p>
      </div>

      {/* Mood & Energy Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-black-900 rounded-2xl p-6 mb-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Mood & Energy</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#404040', fontSize: 12 }}
              />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#a891bd" 
                strokeWidth={3}
                dot={{ fill: '#a891bd', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#7a5e8b" 
                strokeWidth={3}
                dot={{ fill: '#7a5e8b', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-lavender-500 rounded-full mr-2" />
            <span className="text-sm text-black-400">Mood</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-lavender-700 rounded-full mr-2" />
            <span className="text-sm text-black-400">Energy</span>
          </div>
        </div>
      </motion.div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black-900 rounded-2xl p-6 mb-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Key Insights</h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-4 bg-black-800 rounded-xl"
            >
              <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
              <p className="text-sm text-black-400">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Optimization Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-black-900 rounded-2xl p-6 mb-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Optimization Plan</h3>
        <div className="space-y-3">
          {weeklyPlan.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl ${
                item.optimal 
                  ? 'bg-lavender-600 text-white' 
                  : 'bg-black-800 text-black-400'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  item.optimal ? 'bg-white' : 'bg-black-600'
                }`} />
                <div>
                  <p className="font-medium">{item.day}</p>
                  <p className="text-sm opacity-80">{item.activity}</p>
                </div>
              </div>
              {item.optimal && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  Optimal
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-black-900 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Notification Settings</h3>
        <div className="space-y-4">
          {[
            'Period reminders',
            'Fertile window alerts',
            'Mood tracking reminders',
            'Self-care notifications',
            'Irregular cycle warnings'
          ].map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-black-800 rounded-xl"
            >
              <span className="text-white font-medium">{notification}</span>
              <button
                onClick={() => toggleNotification(index)}
                className={`w-12 h-6 rounded-full ${notificationSettings[index] ? 'bg-lavender-500' : 'bg-black-700'}`}>
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notificationSettings[index] ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`} />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Insights;
