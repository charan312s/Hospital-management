import React, { useState, useEffect } from 'react';
import { registerPatient } from '../../services/api';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    registrationTime: ''
  });

  useEffect(() => {
    const getISTDateTime = () => {
      const now = new Date();
      
      // Format datetime in the exact format expected by the backend
      const istDateTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);

      // Convert from MM/DD/YYYY, HH:MM:SS to YYYY-MM-DD HH:MM:SS
      const [date, time] = istDateTime.split(', ');
      const [month, day, year] = date.split('/');
      const formattedDateTime = `${year}-${month}-${day} ${time}`;

      setFormData(prevData => ({
        ...prevData,
        registrationTime: formattedDateTime
      }));
    };

    getISTDateTime();
    const interval = setInterval(getISTDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure age is sent as a number
      const submitData = {
        ...formData,
        age: Number(formData.age)
      };

      const response = await registerPatient(submitData);
      
      // More detailed error handling
      if (!response) {
        throw new Error('No response received from server');
      }
      
      if (!response._id) {
        throw new Error('Invalid response: missing patient ID');
      }

      localStorage.setItem('patientId', response._id);
      window.location.href = '/queue-status';
    } catch (error) {
      console.error('Registration failed:', error);
      // You might want to show this error to the user through a UI component
    }
  };

  // Rest of the component remains the same, but remove registrationDate field
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600">
            <h2 className="text-3xl font-bold text-center text-white">
              Patient Registration
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name Field */}
            <div className="group">
              <label className="block text-lg font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                required
              />
            </div>

            {/* Age and Gender Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age Field */}
              <div className="group">
                <label className="block text-lg font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                  required
                />
              </div>

              {/* Gender Field */}
              <div className="group">
                <label className="block text-lg font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Symptoms Field */}
            <div className="group">
              <label className="block text-lg font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Symptoms
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none resize-none h-32"
                required
              />
            </div>

            {/* Registration Time Display */}
            <div className="group">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Registration Time
              </label>
              <input
                type="text"
                name="registrationTime"
                value={formData.registrationTime}
                readOnly
                className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;