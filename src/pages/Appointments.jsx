import React, { useState, useEffect } from "react";
import { getPatients, downloadPatientReport } from "../services/api";
import { FaFilePdf } from "react-icons/fa"; // Import PDF icon

const Appointments = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Appointments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2">Patient Name</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Symptoms</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Appointment Time</th>
                <th className="border border-gray-300 px-4 py-2">Report</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{patient.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{patient.age}</td>
                    <td className="border border-gray-300 px-4 py-2">{patient.symptoms}</td>
                    <td className="border border-gray-300 px-4 py-2">{patient.status}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.registrationDateIST} {patient.registrationTimeIST}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-red-700"
                        onClick={() => downloadPatientReport(patient._id, patient.name)}
                      >
                        <FaFilePdf /> Download
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border border-gray-300 px-4 py-2 text-gray-500">
                    No Appointments Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
