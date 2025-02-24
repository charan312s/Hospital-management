// frontend/src/components/patient/QueueStatus.js
import React, { useState, useEffect } from 'react';
import { getQueueStatus, updatePatientStatus } from '../../services/api';

const QueueStatus = () => {
  const [status, setStatus] = useState(null);
  const patientId = localStorage.getItem('patientId');
  
  useEffect(() => {
    const checkStatus = async () => {
      const response = await getQueueStatus(patientId);
      setStatus(response);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [patientId]);

  const handleEnterRoom = async () => {
    const confirmEntry = window.confirm("The doctor is ready to see you. Do you want to enter the consultation room?");
    if (confirmEntry) {
      try {
        await updatePatientStatus(patientId, 'In Consultation');
        setStatus((prevStatus) => ({ ...prevStatus, patient: { ...prevStatus.patient, status: 'In Consultation' } }));
      } catch (error) {
        console.error("Error updating patient status:", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Queue Status</h2>
      {status ? (
        <div>
          <p>Your Queue Number: {status.patient?.queueNumber ?? 'N/A'}</p>
          <p>Patients Ahead: {status.patientsAhead ?? 0}</p>
          <p>Status: {status.patient?.status ?? 'Unknown'}</p>

          {status.patient?.status === 'Waiting' && (
            <button
              onClick={handleEnterRoom}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Enter Consultation Room
            </button>
          )}
        </div>
      ) : (
        <p>Loading queue status...</p>
      )}
    </div>
  );
};

export default QueueStatus;
