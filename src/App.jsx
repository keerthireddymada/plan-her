import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Onboarding from './screens/onboarding';
import Onboarding2 from './screens/onboarding2';
import Onboarding3 from './screens/onboarding3';
import Login from './screens/login';
import Signup from './screens/signup';
import Question1 from './screens/question1';
import Question2 from './screens/question2';
import Question3 from './screens/question3';
import Question4 from './screens/question4';

import Home from './screens/Home';
import Log from './screens/Log';
import Insights from './screens/Insights';
import Share from './screens/Share';
import Settings from './screens/Settings';
import MainAppLayout from './components/MainAppLayout';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black-950">
        <div className="max-w-sm mx-auto bg-black-950 min-h-screen relative">
          <AnimatePresence mode="wait">
            <Routes>
              {/* Step 1: Onboarding */}
              <Route path="/" element={localStorage.getItem('hasVisited') ? <Navigate to="/login" /> : <Onboarding />} />
              <Route path="/onboarding2" element={<Onboarding2 />} />
              <Route path="/onboarding3" element={<Onboarding3 />} />

              {/* Step 2: Login / Signup */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Step 3: Questions */}
              <Route path="/question1" element={<Question1 />} />
              <Route path="/question2" element={<Question2 />} />
              <Route path="/question3" element={<Question3 />} />
              <Route path="/question4" element={<Question4 />} />

              {/* Step 4: Main App */}
              <Route element={<MainAppLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/log" element={<Log />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/share" element={<Share />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              {/* Default redirect */}
              <Route path="*" element={<Navigate to={localStorage.getItem('hasVisited') ? "/login" : "/"} />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;



