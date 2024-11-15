import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/Context/AuthContext';
import ProtectedRoute from '@/Routers/ProtectedRoute';

// Page components
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/landingpage"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />

          {/* Default Route Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch all redirect for undefined routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
