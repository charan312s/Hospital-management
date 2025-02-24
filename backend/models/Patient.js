const mongoose = require('mongoose');
const moment = require('moment-timezone');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  symptoms: { type: String, required: true },
  queueNumber: { type: Number },
  status: {
    type: String,
    enum: ['waiting', 'in-consultation', 'completed'],
    default: 'waiting'
  },
  
  // Store registration time as IST instead of UTC
  registrationTime: {
    type: String, 
    default: () => moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
  },

  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  remarks: { type: String, default: "" },
});

module.exports = mongoose.model('Patient', patientSchema);
