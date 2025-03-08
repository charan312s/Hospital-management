import React, { useState, useEffect } from "react";
import {
  UserCircle,
  Users,
  AlertCircle,
  ChevronRight,
  LogOut,
  Activity,
} from "lucide-react";
import { getQueue, callNextPatient, closePatient, updatePatientStatus } from "../../services/api";

const DoctorDashboard = () => {
  const [currentPatient, setCurrentPatient] = useState(null);
  const [queue, setQueue] = useState([]);
  const [remarks, setRemarks] = useState("");
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    const fetchQueue = async () => {
      const response = await getQueue();
      setQueue(response);
    };
    fetchQueue();
    const interval = setInterval(fetchQueue, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNextPatient = async () => {
    try {
      const response = await callNextPatient(doctorId);
      if (response && response._id) {
        await updatePatientStatus(response._id, "in-consultation");
        setCurrentPatient(response);
        setRemarks("");
        
        const updatedQueue = await getQueue();
        setQueue(updatedQueue);
      }
    } catch (error) {
      console.error("Failed to call next patient:", error);
    }
  };

  const handleClosePatient = async () => {
    if (!currentPatient) {
      alert("No patient to close.");
      return;
    }

    try {
      await updatePatientStatus(currentPatient._id, "Completed");
      await closePatient(currentPatient._id, remarks);

      const updatedQueue = await getQueue();
      setQueue(updatedQueue);

      if (updatedQueue.length > 0) {
        const nextPatient = updatedQueue[0];
        setCurrentPatient(nextPatient);
        await updatePatientStatus(nextPatient._id, "in-consultation");
      } else {
        setCurrentPatient(null);
      }
      setRemarks("");
    } catch (error) {
      console.error("Error closing patient:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/doctor/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10 backdrop-blur-sm bg-white/60 p-6 rounded-2xl shadow-lg">
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Doctor Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Patient Management System
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-red-600 hover:to-red-700"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-xl border-l-4 border-blue-500 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-6">
              <UserCircle className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Current Patient</h2>
            </div>

            {currentPatient ? (
              <div className="space-y-4 animate-fade-in">
                <div className="p-6 bg-blue-50/50 rounded-xl backdrop-blur-sm">
                  <p className="text-xl font-semibold text-gray-700 mb-3">
                    {currentPatient.name}
                  </p>
                  <p className="text-gray-600 text-lg">Age: {currentPatient.age}</p>
                  <div className="mt-4">
                    <p className="font-semibold text-gray-700 mb-2">Symptoms:</p>
                    <p className="text-gray-600 italic bg-white/50 p-4 rounded-lg">
                      {currentPatient.symptoms}
                    </p>
                  </div>
                </div>
                <textarea
                  className="w-full p-4 border rounded-lg bg-gray-100"
                  placeholder="Enter remarks..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
                <button
                  onClick={handleClosePatient}
                  className="mt-4 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
                >
                  Close Patient
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 bg-gray-50/50 rounded-xl backdrop-blur-sm">
                <p className="text-gray-500 flex items-center text-lg">
                  <AlertCircle className="w-6 h-6 mr-2" />
                  No patient in consultation
                </p>
              </div>
            )}
            <button
              onClick={handleNextPatient}
              className="mt-8 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-green-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6 mr-2" />
              Call Next Patient
            </button>
          </div>

          <div className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-xl border-l-4 border-green-500 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Waiting Queue</h2>
            </div>
            <ul className="space-y-4">
              {queue.map((patient, index) => (
                <li key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                  {patient.name} - {patient.age} years old
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
