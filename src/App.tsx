import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import ProfileUpdate from './pages/ProfileUpdate';
import ProfileView from './pages/ProfileView';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/profile" element={<ProfileUpdate />} />
            <Route path="/profile/:id" element={<ProfileView />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;