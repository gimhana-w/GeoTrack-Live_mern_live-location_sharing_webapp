const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Get doctor location
router.get('/:id/location', async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).send('Doctor not found');

  res.json(doctor.location);
});

module.exports = router;
