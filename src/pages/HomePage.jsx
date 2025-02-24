import React from "react";
import { Link } from "react-router-dom";
import { Hospital, Stethoscope, CalendarCheck, HeartPulse } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 py-20 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center text-white">
            <Hospital className="mr-4" size={48} />
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-blue-100/90">
          Because Your Well-being Matters
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-white/20">
            <Stethoscope className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-2xl font-semibold mb-4 text-blue-900">
              Expert Doctors
            </h3>
            <p className="text-gray-700">
              World-class specialists across all fields of medicine.
            </p>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-white/20">
            <CalendarCheck className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-2xl font-semibold mb-4 text-blue-900">
              Appointments
            </h3>
            <p className="text-gray-700">
              Book consultations with top doctors online.
            </p>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-white/20">
            <HeartPulse className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-2xl font-semibold mb-4 text-blue-900">
              24/7 Emergency
            </h3>
            <p className="text-gray-700">
              Immediate medical attention anytime, anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 py-16 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Get Started with Apollo Hospitals
          </h2>
          <div className="flex justify-center gap-6">
            <Link
              to="/patient"
              className="bg-white/30 backdrop-blur-md text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-white/40 transition-colors duration-300 border border-white/20"
            >
              Visit Patient Portal
            </Link>
            <Link
              to="/doctor"
              className="bg-white/30 backdrop-blur-md text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-white/40 transition-colors duration-300 border border-white/20"
            >
              Doctor's Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 py-6 text-center backdrop-blur-sm">
        <p className="text-sm text-white/90">
          Apollo Hospitals © 2025. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default HomePage;