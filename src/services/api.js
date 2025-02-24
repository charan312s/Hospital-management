// frontend/src/services/api.js
import axios from "axios";


const API_BASE_URL = 'http://localhost:5000/api';

export const registerPatient = async (patientData) => {
  const response = await fetch(`${API_BASE_URL}/patients/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientData),
  });
  return response.json();
};

export const getQueueStatus = async (patientId) => {
  const response = await fetch(`${API_BASE_URL}/patients/queue-status/${patientId}`);
  return response.json();
};

export const getQueue = async () => {
  const response = await fetch(`${API_BASE_URL}/doctors/queue`);
  return response.json();
};


export const updatePatientStatus = async (patientId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/update-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId, status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update patient status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating patient status:", error);
    throw error;
  }
};


export const closePatient = async (patientId, remarks) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/close-patient`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId, remarks }),
    });

    if (!response.ok) {
      throw new Error("Failed to close patient");
    }

    return await response.json();
  } catch (error) {
    console.error("Error closing patient:", error);
    throw error;
  }
};


export const getPatients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients/get-all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};


export const callNextPatient = async (doctorId) => {
  const response = await fetch(`${API_BASE_URL}/doctors/next-patient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ doctorId }),
  });
  return response.json();
};


// New function to download patient report
export const downloadPatientReport = async (patientId, patientName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients/report/${patientId}`, {
      responseType: "blob",
    });

    // Create a download link for the PDF
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${patientName}_report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading report:", error);
  }
};