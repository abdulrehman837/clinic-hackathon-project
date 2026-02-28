const express = require('express');
const router = express.Router();
const { createPrescription, getPrescriptions, getPrescription, downloadPrescriptionPDF } = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getPrescriptions)
  .post(authorize('doctor'), createPrescription);

router.route('/:id').get(getPrescription);
router.get('/:id/pdf', downloadPrescriptionPDF);

module.exports = router;