const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const DiagnosisLog = require('../models/DiagnosisLog');

exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('createdBy', 'name role').sort('-createdAt');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('createdBy', 'name role');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPatientHistory = async (req, res) => {
  try {
    const [appointments, prescriptions, diagnoses] = await Promise.all([
      Appointment.find({ patientId: req.params.id }).populate('doctorId', 'name').sort('-date'),
      Prescription.find({ patientId: req.params.id }).populate('doctorId', 'name').sort('-createdAt'),
      DiagnosisLog.find({ patientId: req.params.id }).sort('-createdAt'),
    ]);
    res.json({ appointments, prescriptions, diagnoses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};