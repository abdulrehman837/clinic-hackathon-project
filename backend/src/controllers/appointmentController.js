const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    const populated = await Appointment.findById(appointment._id)
      .populate('patientId', 'name age gender')
      .populate('doctorId', 'name specialization');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'doctor') filter.doctorId = req.user._id;
    
    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name age gender contact')
      .populate('doctorId', 'name specialization')
      .sort('-date');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'name age gender contact')
      .populate('doctorId', 'name specialization');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('patientId', 'name age gender')
      .populate('doctorId', 'name specialization');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDoctorSchedule = async (req, res) => {
  try {
    let filter = { doctorId: req.params.doctorId };
    if (req.query.date) {
      const start = new Date(req.query.date);
      const end = new Date(req.query.date);
      end.setDate(end.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }
    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name age gender')
      .sort('date timeSlot');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};