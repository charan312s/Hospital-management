import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Mail, Lock, AlertCircle } from "lucide-react";

const DoctorLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/doctors/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("doctorToken", data.token);
        localStorage.setItem("doctorId", data.doctorId);
        onLogin();
        navigate("/doctor");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center transform transition-all duration-500 hover:scale-110">
          <div className="rounded-full bg-gradient-to-r from-blue-100 to-blue-200 p-4 shadow-xl">
            <Stethoscope className="h-14 w-14 text-blue-600 animate-pulse" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Medical Center
        </h2>
        <p className="mt-3 text-center text-lg text-gray-600">
          Doctor Portal Access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="backdrop-blur-sm bg-white/80 py-8 px-4 shadow-2xl rounded-2xl sm:px-10 border border-gray-100
                      transform transition-all duration-300 hover:shadow-xl">
          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-700
                          animate-fade-in transform transition-all duration-300">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  className="pl-10 block w-full border-2 border-gray-200 rounded-xl py-3 text-md
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           bg-white/50 backdrop-blur-sm transition-all duration-300"
                  required
                  placeholder="doctor@medical-center.com"
                />
              </div>
            </div>

            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-500" />
                </div>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="pl-10 block w-full border-2 border-gray-200 rounded-xl py-3 text-md
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           bg-white/50 backdrop-blur-sm transition-all duration-300"
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl
                       text-lg font-semibold text-white shadow-lg
                       bg-gradient-to-r from-blue-500 to-blue-600
                       hover:from-blue-600 hover:to-blue-700
                       transform transition-all duration-300 hover:scale-[1.02]
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in to Dashboard
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500 text-md backdrop-blur-sm">
                  Secure Medical Access
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;