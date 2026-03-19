import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { setAuthToken } from './services/api';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Donors from './pages/Donors';
import Campaigns from './pages/Campaigns';
import Donations from './pages/Donations';
import Beneficiaries from './pages/Beneficiaries';
import AdminLogin from './pages/AdminLogin';
import './styles.css';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/admin-login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/donors" element={
            <ProtectedRoute>
              <Donors />
            </ProtectedRoute>
          } />
          <Route path="/campaigns" element={
            <ProtectedRoute>
              <Campaigns />
            </ProtectedRoute>
          } />
          <Route path="/donations" element={
            <ProtectedRoute>
              <Donations />
            </ProtectedRoute>
          } />
          <Route path="/beneficiaries" element={
            <ProtectedRoute>
              <Beneficiaries />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
