import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './screens/Home';
import Log from './screens/Log';
import Insights from './screens/Insights';
import Share from './screens/Share';
import Settings from './screens/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black-950">
        <div className="max-w-sm mx-auto bg-black-950 min-h-screen relative">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/log" element={<Log />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/share" element={<Share />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
          <Navigation />
        </div>
      </div>
    </Router>
  );
}

export default App;
