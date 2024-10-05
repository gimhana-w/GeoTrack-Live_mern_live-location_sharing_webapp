const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  status: { type: String, enum: ['Arrived', 'On the way'], default: 'On the way' }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
