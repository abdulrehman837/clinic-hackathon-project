const mongoose = require('mongoose');

const diagnosisLogSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symptoms: [String],
  age: Number,
  gender: String,
  history: String,
  aiResponse: { type: String },
  possibleConditions: [String],
  riskLevel: { type: String, enum: ['low', 'medium', 'high', 'critical'] },
  suggestedTests: [String],
}, { timestamps: true });

module.exports = mongoose.model('DiagnosisLog', diagnosisLogSchema);