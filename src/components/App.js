import React from 'react';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Login from './Login';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Custom PrivateRoute component
function PrivateRoute({ element }) {
  const { currentUser } = useAuth();

  return currentUser ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Use PrivateRoute for the Dashboard route */}
            <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
