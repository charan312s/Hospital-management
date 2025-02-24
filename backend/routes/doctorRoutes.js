// backend/routes/doctorRoutes.js
const bcrypt = require('bcrypt'); // For bcrypt
// // OR
// const bcrypt = require('bcryptjs'); // If using bcryptjs
const jwt = require('jsonwebtoken');


const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

router.get('/queue', async (req, res) => {
  try {
    const patients = await Patient.find({ status: 'waiting' })
      .sort('queueNumber');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register a new doctor (This should be used only by an admin)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    const doctor = new Doctor({ name, email, password });
    await doctor.save();

    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Retrieve all doctors
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (password !== doctor.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
  }
  

    const token = jwt.sign({ doctorId: doctor._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token, doctorId: doctor._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/next-patient', async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await Doctor.findById(doctorId);
    
    if (doctor.currentPatient) {
      await Patient.findByIdAndUpdate(doctor.currentPatient, {
        status: 'completed'
      });
    }

    const nextPatient = await Patient.findOne({ status: 'waiting' })
      .sort('queueNumber');
    
    if (nextPatient) {
      nextPatient.status = 'in-consultation';
      await nextPatient.save();
      
      doctor.currentPatient = nextPatient._id;
      await doctor.save();
      
      res.json(nextPatient);
    } else {
      res.json({ message: 'No patients in queue' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
