const Prescription = require('../models/Prescription');
const PDFDocument = require('pdfkit');

exports.createPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.create({
      ...req.body,
      doctorId: req.user._id,
    });
    const populated = await Prescription.findById(prescription._id)
      .populate('patientId', 'name age gender')
      .populate('doctorId', 'name specialization');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPrescriptions = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'doctor') filter.doctorId = req.user._id;
    if (req.query.patientId) filter.patientId = req.query.patientId;

    const prescriptions = await Prescription.find(filter)
      .populate('patientId', 'name age gender')
      .populate('doctorId', 'name specialization')
      .sort('-createdAt');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patientId', 'name age gender contact')
      .populate('doctorId', 'name specialization phone');
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.downloadPrescriptionPDF = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patientId', 'name age gender contact bloodGroup')
      .populate('doctorId', 'name specialization phone');

    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=prescription-${prescription._id}.pdf`);
    doc.pipe(res);

    // Header
    doc.fontSize(22).font('Helvetica-Bold').text('AI Clinic Management', { align: 'center' });
    doc.fontSize(10).font('Helvetica').text('Smart Diagnosis SaaS Platform', { align: 'center' });
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Doctor Info
    doc.fontSize(14).font('Helvetica-Bold').text('Doctor Information');
    doc.fontSize(11).font('Helvetica');
    doc.text(`Dr. ${prescription.doctorId?.name || 'N/A'}`);
    doc.text(`Specialization: ${prescription.doctorId?.specialization || 'General'}`);
    doc.text(`Phone: ${prescription.doctorId?.phone || 'N/A'}`);
    doc.moveDown();

    // Patient Info
    doc.fontSize(14).font('Helvetica-Bold').text('Patient Information');
    doc.fontSize(11).font('Helvetica');
    doc.text(`Name: ${prescription.patientId?.name || 'N/A'}`);
    doc.text(`Age: ${prescription.patientId?.age || 'N/A'} | Gender: ${prescription.patientId?.gender || 'N/A'}`);
    doc.text(`Contact: ${prescription.patientId?.contact || 'N/A'}`);
    doc.text(`Blood Group: ${prescription.patientId?.bloodGroup || 'N/A'}`);
    doc.moveDown();

    // Diagnosis
    if (prescription.diagnosis) {
      doc.fontSize(14).font('Helvetica-Bold').text('Diagnosis');
      doc.fontSize(11).font('Helvetica').text(prescription.diagnosis);
      doc.moveDown();
    }

    // Medicines Table
    doc.fontSize(14).font('Helvetica-Bold').text('Prescribed Medicines');
    doc.moveDown(0.5);

    // Table Header
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('Medicine', 50, doc.y, { width: 130, continued: false });
    const tableY = doc.y - 12;
    doc.text('Dosage', 180, tableY, { width: 100 });
    doc.text('Frequency', 290, tableY, { width: 120 });
    doc.text('Duration', 420, tableY, { width: 100 });
    doc.moveTo(50, doc.y + 2).lineTo(550, doc.y + 2).stroke();
    doc.moveDown(0.5);

    // Table Rows
    doc.font('Helvetica').fontSize(10);
    prescription.medicines.forEach((med, i) => {
      const rowY = doc.y;
      doc.text(med.name, 50, rowY, { width: 130 });
      doc.text(med.dosage, 180, rowY, { width: 100 });
      doc.text(med.frequency, 290, rowY, { width: 120 });
      doc.text(med.duration, 420, rowY, { width: 100 });
      doc.moveDown(0.3);
    });
    doc.moveDown();

    // Instructions
    if (prescription.instructions) {
      doc.fontSize(14).font('Helvetica-Bold').text('Instructions');
      doc.fontSize(11).font('Helvetica').text(prescription.instructions);
      doc.moveDown();
    }

    // AI Explanation
    if (prescription.aiExplanation) {
      doc.fontSize(14).font('Helvetica-Bold').text('AI Health Insights');
      doc.fontSize(11).font('Helvetica').text(prescription.aiExplanation);
      doc.moveDown();
    }

    // Footer
    doc.moveDown(2);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);
    doc.fontSize(9).font('Helvetica').text(`Date: ${new Date(prescription.createdAt).toLocaleDateString()}`, { align: 'left' });
    doc.text('Generated by AI Clinic Management System', { align: 'center' });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};