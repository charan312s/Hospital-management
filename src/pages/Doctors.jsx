// src/frontend/other/Doctors.jsx
import React, { useState } from 'react';
import { Search, Clock, Star, MapPin } from 'lucide-react';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const doctors = useState([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.8,
      patients: 1500,
      education: "Harvard Medical School",
      availability: "Mon-Fri",
      location: "Main Branch",
      imageUrl: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg"
    },
    {
      id: 2,
      name: "Dr. James Mitchell",
      specialty: "Neurologist",
      experience: "12 years",
      rating: 4.7,
      patients: 1200,
      education: "Johns Hopkins University",
      availability: "Mon-Thu",
      location: "West Wing",
      imageUrl: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg"
    },
    {
      id: 3,
      name: "Dr. Emily Parker",
      specialty: "Pediatrician",
      experience: "10 years",
      rating: 4.9,
      patients: 2000,
      education: "Stanford Medical School",
      availability: "Mon-Sat",
      location: "Children's Wing",
      imageUrl: "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827775.jpg"
    },
    {
      id: 4,
      name: "Dr. Michael Chen",
      specialty: "Orthopedist",
      experience: "18 years",
      rating: 4.8,
      patients: 1800,
      education: "Yale Medical School",
      availability: "Tue-Sat",
      location: "East Wing",
      imageUrl: "https://img.freepik.com/free-photo/portrait-successful-male-doctor-with-stethoscope_171337-1532.jpg"
    }
  ]);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Medical Specialists</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our team of experienced and dedicated healthcare professionals committed to providing the best medical care.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className="h-16 w-16 rounded-full object-cover object-center border-2 border-blue-500"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 text-blue-500" />
                    <span>{doctor.experience} Experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    <span>{doctor.rating} Rating • {doctor.patients}+ Patients</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                    <span>{doctor.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Available: {doctor.availability}</span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Specialist Doctors", value: "50+" },
            { label: "Years of Experience", value: "25+" },
            { label: "Satisfied Patients", value: "10k+" },
            { label: "Medical Awards", value: "15+" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
