const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, getAppointment, updateAppointment, cancelAppointment, getDoctorSchedule } = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getAppointments)
  .post(authorize('admin', 'receptionist', 'patient'), createAppointment);

router.route('/:id')
  .get(getAppointment)
  .put(authorize('admin', 'receptionist', 'doctor'), updateAppointment);

router.put('/:id/cancel', protect, cancelAppointment);
router.get('/doctor/:doctorId/schedule', getDoctorSchedule);

module.exports = router;