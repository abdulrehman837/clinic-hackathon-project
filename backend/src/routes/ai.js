const express = require('express');
const router = express.Router();
const { symptomChecker, prescriptionExplanation, riskFlagging, predictiveAnalytics } = require('../controllers/aiController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.post('/symptom-checker', authorize('doctor'), symptomChecker);
router.post('/prescription-explanation', authorize('doctor'), prescriptionExplanation);
router.get('/risk-flagging/:patientId', authorize('doctor'), riskFlagging);
router.get('/predictive-analytics', authorize('admin', 'doctor'), predictiveAnalytics);

module.exports = router;