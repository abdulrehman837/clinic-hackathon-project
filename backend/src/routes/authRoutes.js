const express = require('express');
const router = express.Router();
const { signup, login, getMe, getAllDoctors, getAllUsers, updateUser, deleteUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/doctors', protect, getAllDoctors);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.put('/users/:id', protect, authorize('admin'), updateUser);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

module.exports = router;