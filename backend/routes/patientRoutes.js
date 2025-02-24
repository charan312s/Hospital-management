const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
// const Doctor = require('../models/Doctor');
const generateReport = require("../utils/generateReport"); // Import PDF generator


router.post('/register', async (req, res) => {
  try {
    const lastPatient = await Patient.findOne({}, {}, { sort: { queueNumber: -1 } });
    const newQueueNumber = lastPatient ? lastPatient.queueNumber + 1 : 1;

    const patient = new Patient({
      ...req.body,
      queueNumber: newQueueNumber,
      status: 'waiting' // ✅ Ensure status is set
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/queue-status/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) { 
      return res.status(404).json({ message: 'Patient not found' }); // ✅ Handle invalid patient ID
    }

    const patientsAhead = await Patient.countDocuments({
      queueNumber: { $lt: patient.queueNumber },
      status: 'waiting' // ✅ Ensure patients ahead have a defined status
    });

    res.json({ patient, patientsAhead });
  } catch (error) {
    res.status(500).json({ message: error.message }); // ✅ Change status code to 500 for unexpected errors
  }
});


router.post('/close-patient', async (req, res) => {
  try {
    const { patientId, remarks } = req.body;

    if (!patientId) {
      return res.status(400).json({ message: 'Patient ID is required' });
    }

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { status: 'Completed', remarks: remarks || '' },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient closed successfully', patient });
  } catch (error) {
    console.error('Error closing patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/update-status', async (req, res) => {
  try {
    const { patientId, status } = req.body;
    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { status },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', patient });
  } catch (error) {
    console.error("Error updating patient status:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to fetch all patients
router.get("/get-all", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// router.get('/close-patient', (req, res) => {
//   res.json({ message: "Route is working!" });
// });


// ✅ New API: Generate Patient Report as PDF
router.get("/report/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const pdfBuffer = await generateReport(patient); // Generate the PDF report
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${patient.name}_report.pdf"`,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Error generating report" });
  }
});

module.exports = router;
