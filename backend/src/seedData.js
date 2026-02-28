const mongoose = require('mongoose');
const User = require('./models/User');
const Patient = require('./models/patient');
const Appointment = require('./models/Appointment');
const Prescription = require('./models/Prescription');
const DiagnosisLog = require('./models/DiagnosisLog');

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hackathon-db';

const seedAll = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    await Promise.all([
      Patient.deleteMany({}),
      Appointment.deleteMany({}),
      Prescription.deleteMany({}),
      DiagnosisLog.deleteMany({}),
      User.deleteMany({ role: { $ne: 'admin' } }),
    ]);
    console.log('Old data cleared');

    const doctors = await User.create([
      { name: 'Dr. Ahmed Khan', email: 'ahmed@medai.com', password: 'doctor123', role: 'doctor', subscriptionPlan: 'pro', specialization: 'General Physician', phone: '0301-1234567' },
      { name: 'Dr. Fatima Noor', email: 'fatima@medai.com', password: 'doctor123', role: 'doctor', subscriptionPlan: 'pro', specialization: 'Cardiologist', phone: '0312-9876543' },
      { name: 'Dr. Usman Ali', email: 'usman@medai.com', password: 'doctor123', role: 'doctor', subscriptionPlan: 'free', specialization: 'Dermatologist', phone: '0333-4567890' },
      { name: 'Dr. Ayesha Malik', email: 'ayesha@medai.com', password: 'doctor123', role: 'doctor', subscriptionPlan: 'pro', specialization: 'Pediatrician', phone: '0345-6781234' },
    ]);
    console.log(doctors.length + ' Doctors created');

    const receptionists = await User.create([
      { name: 'Bilal Receptionist', email: 'bilal@medai.com', password: 'reception123', role: 'receptionist', phone: '0300-1112233' },
      { name: 'Sara Receptionist', email: 'sara@medai.com', password: 'reception123', role: 'receptionist', phone: '0311-4445566' },
    ]);
    console.log(receptionists.length + ' Receptionists created');

    const patientData = [
      { name: 'Muhammad Zain', age: 28, gender: 'male', contact: '0300-1111111', email: 'zain@gmail.com', address: 'Gulberg, Lahore', bloodGroup: 'A+', allergies: ['Penicillin'] },
      { name: 'Hira Farooq', age: 34, gender: 'female', contact: '0311-2222222', email: 'hira@gmail.com', address: 'DHA Phase 5, Karachi', bloodGroup: 'B+', allergies: [] },
      { name: 'Ali Raza', age: 45, gender: 'male', contact: '0322-3333333', email: 'aliraza@gmail.com', address: 'Blue Area, Islamabad', bloodGroup: 'O+', allergies: ['Sulfa drugs'] },
      { name: 'Sana Sheikh', age: 22, gender: 'female', contact: '0333-4444444', email: 'sana@gmail.com', address: 'Saddar, Rawalpindi', bloodGroup: 'AB+', allergies: [] },
      { name: 'Hassan Butt', age: 55, gender: 'male', contact: '0344-5555555', email: 'hassan@gmail.com', address: 'Model Town, Lahore', bloodGroup: 'A-', allergies: ['Aspirin', 'Ibuprofen'] },
      { name: 'Nadia Iqbal', age: 30, gender: 'female', contact: '0355-6666666', email: 'nadia@gmail.com', address: 'Clifton, Karachi', bloodGroup: 'B-', allergies: [] },
      { name: 'Tariq Mehmood', age: 60, gender: 'male', contact: '0301-7777777', email: 'tariq@gmail.com', address: 'Cantt, Peshawar', bloodGroup: 'O-', allergies: ['Codeine'] },
      { name: 'Amna Bibi', age: 40, gender: 'female', contact: '0312-8888888', email: 'amna@gmail.com', address: 'Satellite Town, Multan', bloodGroup: 'A+', allergies: [] },
      { name: 'Fahad Hussain', age: 18, gender: 'male', contact: '0323-9999999', email: 'fahad@gmail.com', address: 'Johar Town, Lahore', bloodGroup: 'B+', allergies: ['Dust', 'Pollen'] },
      { name: 'Kiran Aslam', age: 26, gender: 'female', contact: '0334-1010101', email: 'kiran@gmail.com', address: 'F-8, Islamabad', bloodGroup: 'AB-', allergies: [] },
      { name: 'Waqar Ahmed', age: 50, gender: 'male', contact: '0345-2020202', email: 'waqar@gmail.com', address: 'Hayatabad, Peshawar', bloodGroup: 'O+', allergies: ['Latex'] },
      { name: 'Rabia Qureshi', age: 35, gender: 'female', contact: '0300-3030303', email: 'rabia@gmail.com', address: 'Gulshan, Karachi', bloodGroup: 'A+', allergies: [] },
      { name: 'Imran Siddiqui', age: 42, gender: 'male', contact: '0311-4040404', email: 'imran@gmail.com', address: 'Garden Town, Lahore', bloodGroup: 'B-', allergies: ['Erythromycin'] },
      { name: 'Zara Batool', age: 29, gender: 'female', contact: '0322-5050505', email: 'zara@gmail.com', address: 'G-9, Islamabad', bloodGroup: 'O+', allergies: [] },
      { name: 'Kamran Shah', age: 65, gender: 'male', contact: '0333-6060606', email: 'kamran@gmail.com', address: 'University Road, Faisalabad', bloodGroup: 'AB+', allergies: ['Metformin'] },
      { name: 'Mehwish Hayat', age: 31, gender: 'female', contact: '0344-7070707', email: 'mehwish@gmail.com', address: 'Mall Road, Lahore', bloodGroup: 'A-', allergies: [] },
      { name: 'Saad Rafiq', age: 38, gender: 'male', contact: '0355-8080808', email: 'saad@gmail.com', address: 'Bahria Town, Islamabad', bloodGroup: 'B+', allergies: ['NSAIDs'] },
      { name: 'Uzma Perveen', age: 48, gender: 'female', contact: '0301-9090909', email: 'uzma@gmail.com', address: 'Wapda Town, Lahore', bloodGroup: 'O-', allergies: [] },
    ];

    const patients = await Patient.create(
      patientData.map((p, i) => ({ ...p, createdBy: doctors[i % doctors.length]._id }))
    );
    console.log(patients.length + ' Patients created');

    const timeSlots = ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM'];
    const reasons = ['Fever and headache','Chest pain','Skin rash','Routine checkup','Cough and cold','Back pain','Stomach ache','Follow-up visit','Blood pressure check','Diabetes consultation','Joint pain','Breathing difficulty','Ear infection','Vaccination','Eye irritation'];

    const appointmentData = [];
    const now = new Date();

    for (let i = 0; i < 25; i++) {
      const d = new Date(now); d.setDate(d.getDate() - Math.floor(Math.random() * 30) - 1); d.setHours(0,0,0,0);
      const status = Math.random() > 0.15 ? 'completed' : 'cancelled';
      appointmentData.push({ patientId: patients[i % patients.length]._id, doctorId: doctors[i % doctors.length]._id, date: d, timeSlot: timeSlots[i % timeSlots.length], status, reason: reasons[i % reasons.length], notes: status === 'completed' ? 'Patient examined and treated.' : 'Patient cancelled.' });
    }

    const todayStatuses = ['confirmed','confirmed','pending','completed','confirmed','pending'];
    for (let i = 0; i < 6; i++) {
      const t = new Date(now); t.setHours(0,0,0,0);
      appointmentData.push({ patientId: patients[i+2]._id, doctorId: doctors[i % doctors.length]._id, date: t, timeSlot: timeSlots[i+2], status: todayStatuses[i], reason: reasons[i+3], notes: todayStatuses[i] === 'completed' ? 'Treated successfully.' : '' });
    }

    for (let i = 0; i < 10; i++) {
      const f = new Date(now); f.setDate(f.getDate() + Math.floor(Math.random() * 7) + 1); f.setHours(0,0,0,0);
      appointmentData.push({ patientId: patients[(i+5) % patients.length]._id, doctorId: doctors[i % doctors.length]._id, date: f, timeSlot: timeSlots[(i+4) % timeSlots.length], status: Math.random() > 0.4 ? 'confirmed' : 'pending', reason: reasons[(i+5) % reasons.length], notes: '' });
    }

    const appointments = await Appointment.create(appointmentData);
    console.log(appointments.length + ' Appointments created');

    const completedAppts = appointments.filter(a => a.status === 'completed');
    const medicineBank = [
      { name: 'Panadol 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days' },
      { name: 'Augmentin 625mg', dosage: '1 tablet', frequency: 'Three times daily', duration: '7 days' },
      { name: 'Omeprazole 20mg', dosage: '1 capsule', frequency: 'Once daily before breakfast', duration: '14 days' },
      { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'Once daily at night', duration: '10 days' },
      { name: 'Metformin 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '30 days' },
      { name: 'Amlodipine 5mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' },
      { name: 'Ibuprofen 400mg', dosage: '1 tablet', frequency: 'Twice daily after meals', duration: '5 days' },
      { name: 'Amoxicillin 500mg', dosage: '1 capsule', frequency: 'Three times daily', duration: '7 days' },
      { name: 'Montelukast 10mg', dosage: '1 tablet', frequency: 'Once daily at night', duration: '14 days' },
      { name: 'Losartan 50mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' },
      { name: 'Flagyl 400mg', dosage: '1 tablet', frequency: 'Three times daily', duration: '5 days' },
      { name: 'Vitamin D 50000IU', dosage: '1 tablet', frequency: 'Once weekly', duration: '8 weeks' },
    ];
    const diagnosisList = ['Viral Fever with URTI','Hypertension Stage 1','Allergic Dermatitis','Type 2 Diabetes','Acute Gastritis','Lumbar Back Pain','Bronchitis','Urinary Tract Infection','Migraine','Iron Deficiency Anemia'];

    const prescriptionData = completedAppts.map((appt, i) => {
      const numMeds = Math.floor(Math.random() * 3) + 1;
      const meds = [];
      const used = new Set();
      for (let j = 0; j < numMeds; j++) {
        let idx = (i + j * 3) % medicineBank.length;
        while (used.has(idx)) idx = (idx + 1) % medicineBank.length;
        used.add(idx);
        meds.push(medicineBank[idx]);
      }
      return { patientId: appt.patientId, doctorId: appt.doctorId, appointmentId: appt._id, medicines: meds, diagnosis: diagnosisList[i % diagnosisList.length], instructions: 'Take medicines as prescribed. Drink plenty of water. Rest well.', aiExplanation: '' };
    });

    const prescriptions = await Prescription.create(prescriptionData);
    console.log(prescriptions.length + ' Prescriptions created');

    const symptomBank = [
      ['fever','headache','body aches','fatigue'],
      ['chest pain','shortness of breath','dizziness'],
      ['skin rash','itching','redness','swelling'],
      ['frequent urination','thirst','weight loss'],
      ['stomach pain','nausea','vomiting','bloating'],
      ['back pain','stiffness','difficulty walking'],
      ['cough','sore throat','runny nose','sneezing'],
      ['painful urination','frequent urination','lower abdominal pain'],
      ['severe headache','nausea','light sensitivity'],
      ['fatigue','pale skin','weakness','dizziness'],
      ['joint pain','swelling','morning stiffness'],
      ['wheezing','shortness of breath','chest tightness'],
    ];
    const conditionBank = [
      ['Viral Fever','Influenza','Dengue Fever'],
      ['Angina Pectoris','Hypertension','Costochondritis'],
      ['Eczema','Contact Dermatitis','Psoriasis'],
      ['Type 2 Diabetes','Pre-diabetes','Thyroid Disorder'],
      ['Gastritis','Peptic Ulcer','GERD'],
      ['Lumbar Strain','Herniated Disc','Sciatica'],
      ['Common Cold','Bronchitis','Sinusitis'],
      ['UTI','Kidney Stones','Bladder Infection'],
      ['Migraine','Tension Headache','Cluster Headache'],
      ['Iron Deficiency Anemia','B12 Deficiency','Thalassemia Minor'],
      ['Rheumatoid Arthritis','Osteoarthritis','Gout'],
      ['Asthma','COPD','Allergic Bronchitis'],
    ];
    const testBank = [
      ['CBC','Dengue NS1','Blood Culture'],
      ['ECG','Troponin Test','Chest X-Ray'],
      ['Skin Biopsy','Allergy Panel','IgE Levels'],
      ['HbA1c','Fasting Blood Sugar','Lipid Profile'],
      ['H.Pylori Test','Endoscopy','Stool Test'],
      ['Lumbar X-Ray','MRI Spine','ESR'],
      ['Throat Culture','Chest X-Ray','Sputum Test'],
      ['Urine Culture','KFT','Ultrasound KUB'],
      ['CT Brain','MRI Brain','Eye Exam'],
      ['Serum Ferritin','Iron Studies','Vitamin B12'],
      ['RF Factor','Anti-CCP','Uric Acid'],
      ['Spirometry','Peak Flow','Chest X-Ray'],
    ];
    const riskLevels = ['low','low','medium','medium','high','low','low','medium','medium','low','medium','medium'];

    const diagnosisLogData = [];
    for (let i = 0; i < 30; i++) {
      const pIdx = i % patients.length;
      const sIdx = i % symptomBank.length;
      const cr = new Date(now); cr.setDate(cr.getDate() - Math.floor(Math.random() * 30));
      diagnosisLogData.push({
        patientId: patients[pIdx]._id, doctorId: doctors[i % doctors.length]._id,
        symptoms: symptomBank[sIdx], age: patients[pIdx].age, gender: patients[pIdx].gender,
        history: patients[pIdx].allergies.length > 0 ? 'Allergies: ' + patients[pIdx].allergies.join(', ') : 'No significant history',
        aiResponse: JSON.stringify({ possibleConditions: conditionBank[sIdx], riskLevel: riskLevels[sIdx], suggestedTests: testBank[sIdx], recommendations: 'Follow up if symptoms worsen.', urgency: riskLevels[sIdx] === 'high' ? 'immediate' : 'routine' }),
        possibleConditions: conditionBank[sIdx], riskLevel: riskLevels[sIdx], suggestedTests: testBank[sIdx], createdAt: cr,
      });
    }

    const diagnosisLogs = await DiagnosisLog.create(diagnosisLogData);
    console.log(diagnosisLogs.length + ' Diagnosis Logs created');

    console.log('\n===== SEEDING COMPLETE =====');
    console.log('Doctors: ' + doctors.length);
    console.log('Receptionists: ' + receptionists.length);
    console.log('Patients: ' + patients.length);
    console.log('Appointments: ' + appointments.length);
    console.log('Prescriptions: ' + prescriptions.length);
    console.log('Diagnosis Logs: ' + diagnosisLogs.length);
    console.log('\nLOGIN CREDENTIALS:');
    console.log('Admin:        admin@medai.com / admin123');
    console.log('Doctor 1:     ahmed@medai.com / doctor123');
    console.log('Doctor 2:     fatima@medai.com / doctor123');
    console.log('Doctor 3:     usman@medai.com / doctor123');
    console.log('Doctor 4:     ayesha@medai.com / doctor123');
    console.log('Receptionist: bilal@medai.com / reception123');
    console.log('Receptionist: sara@medai.com / reception123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedAll();
