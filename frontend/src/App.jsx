import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import screens
import Login from './screens/login';
import Signup from './screens/signup';
import Home from './screens/Home';
import Log from './screens/Log';
import Insights from './screens/Insights';
import Share from './screens/Share';
import Settings from './screens/Settings';
import Question1 from './screens/question1';
import Question2 from './screens/question2';
import Question3 from './screens/question3';
import Question4 from './screens/question4';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black-950 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Question routes (for profile setup) */}
        <Route path="/question1" element={<Question1 />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/question3" element={<Question3 />} />
        <Route path="/question4" element={<Question4 />} />
        
        {/* Protected routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/log" element={
          <ProtectedRoute>
            <Log />
          </ProtectedRoute>
        } />
        <Route path="/insights" element={
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        } />
        <Route path="/share" element={
          <ProtectedRoute>
            <Share />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        
        {/* Default redirect */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;



