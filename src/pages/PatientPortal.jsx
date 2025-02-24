// frontend/src/pages/PatientPortal.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PatientRegistration from '../components/patient/PatientRegistration';
import QueueStatus from '../components/patient/QueueStatus';

const PatientPortal = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={<PatientRegistration />} />
        <Route path="/queue-status" element={<QueueStatus />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default PatientPortal;