import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/patient", label: "Patient Portal" },
    { path: "/doctor", label: "Doctor Portal" },
    { path: "/doctors", label: "Doctors" },
    { path: "/appointments", label: "Appointments" }
  ];

  return (
    <nav className="bg-white shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Brand Name */}
        <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-wide">
          Hospital Management System
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-4 py-2 text-base font-semibold transition-all duration-300 ${
                location.pathname.startsWith(link.path)
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.label}
              {/* Animated Underline */}
              <span
                className={`absolute left-0 bottom-0 w-full h-1 bg-blue-500 transition-all duration-300 scale-x-0 origin-center ${
                  location.pathname.startsWith(link.path) ? "scale-x-100" : "hover:scale-x-100"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button (Placeholder for Future) */}
        <div className="md:hidden">
          <button className="text-blue-600 focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
