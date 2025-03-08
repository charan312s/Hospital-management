import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientPortal from './pages/PatientPortal';
import DoctorPortal from './pages/DoctorPortal';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import HomePage from './pages/HomePage';
import Navbar from './components/common/Navbar';
import QueueStatus from './components/patient/QueueStatus';
import { Hospital } from 'lucide-react';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-8 right-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
        </div>

        <div className="relative">
          <Navbar />
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-8 mb-6">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-center space-x-4 transform transition-all duration-300 hover:scale-105">
                <Hospital className="w-12 h-12 animate-pulse" />
                <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                  Welcome to Apollo Hospitals
                </h1>
              </div>
              <p className="text-center text-blue-100 mt-4 text-lg">
                Dedicated to Excellence in Healthcare
              </p>
            </div>
          </div>

          {/* Main Content */}
          <main className="container mx-auto px-6 pb-12">
            <div className="backdrop-blur-xl bg-white/40 shadow-2xl rounded-3xl border border-white/50 overflow-hidden
                          transform transition-all duration-300 hover:shadow-xl">
              {/* Content Container */}
              <div className="min-h-[60vh] p-8">
                {/* Routes Container */}
                <div className="h-full animate-fade-in">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/patient/*" element={<PatientPortal />} />
                    <Route path="/doctor/*" element={<DoctorPortal />} />
                    <Route path="/queue-status" element={<QueueStatus />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/appointments" element={<Appointments />} />
                  </Routes>
                </div>
              </div>

              {/* Enhanced Footer Section */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl"></div>
                <div className="relative bg-white/30 backdrop-blur-md p-8 border-t border-white/50">
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Apollo Hospitals
                    </h3>
                    <p className="text-gray-600">
                      Providing World-Class Healthcare Services Since 1983
                    </p>
                    <div className="flex justify-center space-x-6 text-gray-600">
                      <span>24/7 Emergency</span>
                      <span>•</span>
                      <span>Expert Doctors</span>
                      <span>•</span>
                      <span>Advanced Care</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;