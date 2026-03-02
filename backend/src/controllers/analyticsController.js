const User = require('../models/User');
const Patient = require('../models/Patient')
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const DiagnosisLog = require('../models/DiagnosisLog');

exports.getAdminAnalytics = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [totalPatients, totalDoctors, totalReceptionists, monthlyAppointments, totalPrescriptions, recentDiagnoses] = await Promise.all([
      Patient.countDocuments(),
      User.countDocuments({ role: 'doctor' }),
      User.countDocuments({ role: 'receptionist' }),
      Appointment.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Prescription.countDocuments(),
      DiagnosisLog.find({ createdAt: { $gte: thirtyDaysAgo } }),
    ]);

    // Most common diagnosis
    const allConditions = recentDiagnoses.flatMap(d => d.possibleConditions);
    const conditionCount = {};
    allConditions.forEach(c => { conditionCount[c] = (conditionCount[c] || 0) + 1; });
    const sortedConditions = Object.entries(conditionCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Appointment status breakdown
    const statusBreakdown = await Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Monthly revenue simulation
    const revenue = monthlyAppointments * 500;

    res.json({
      totalPatients,
      totalDoctors,
      totalReceptionists,
      monthlyAppointments,
      totalPrescriptions,
      revenue,
      topConditions: sortedConditions.map(([name, count]) => ({ name, count })),
      statusBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDoctorAnalytics = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [dailyAppointments, monthlyAppointments, prescriptionCount, totalPatientsSeen] = await Promise.all([
      Appointment.countDocuments({ doctorId, date: { $gte: today, $lt: tomorrow } }),
      Appointment.countDocuments({ doctorId, createdAt: { $gte: thirtyDaysAgo } }),
      Prescription.countDocuments({ doctorId }),
      Appointment.distinct('patientId', { doctorId }),
    ]);

    res.json({
      dailyAppointments,
      monthlyAppointments,
      prescriptionCount,
      totalPatientsSeen: totalPatientsSeen.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};