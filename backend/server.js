const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const seedAdmin = require('./utils/seed');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://clinic-hackathon-project-abdulrehman837s-projects.vercel.app',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/patients', require('./src/routes/patient'));
app.use('/api/appointments', require('./src/routes/appointment'));
app.use('/api/prescriptions', require('./src/routes/prescription'));
app.use('/api/ai', require('./src/routes/ai'));
app.use('/api/analytics', require('./src/routes/analytics'));
app.use('/api/users', require('./routes/userRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'AI Clinic Management API is running' });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/clinic-management';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    seedAdmin();
  })
  .catch(err => console.log('MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));