// frontend/src/pages/DoctorPortal.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorDashboard from '../components/doctor/DoctorDashboard';
import DoctorLogin from '../components/doctor/DoctorLogin';

const DoctorPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if doctor is logged in
    const doctorToken = localStorage.getItem('doctorToken');
    setIsAuthenticated(!!doctorToken);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <DoctorDashboard />
            ) : (
              <Navigate to="/doctor/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <DoctorLogin onLogin={() => setIsAuthenticated(true)} />
            ) : (
              <Navigate to="/doctor" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default DoctorPortal;