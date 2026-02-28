const express = require('express');
const router = express.Router();
const { getAdminAnalytics, getDoctorAnalytics } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/admin', authorize('admin'), getAdminAnalytics);
router.get('/doctor', authorize('doctor'), getDoctorAnalytics);

module.exports = router;