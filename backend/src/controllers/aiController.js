const { GoogleGenerativeAI } = require('@google/generative-ai');
const DiagnosisLog = require('../models/DiagnosisLog');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const askGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    return null;
  }
};

// AI Feature 1 — Smart Symptom Checker
exports.symptomChecker = async (req, res) => {
  try {
    const { symptoms, age, gender, history, patientId } = req.body;

    const prompt = `You are a medical AI assistant. Based on the following patient information, provide a JSON response:

Patient Info:
- Symptoms: ${symptoms.join(', ')}
- Age: ${age}
- Gender: ${gender}
- Medical History: ${history || 'None'}

Respond ONLY in this JSON format (no markdown, no code blocks):
{
  "possibleConditions": ["condition1", "condition2", "condition3"],
  "riskLevel": "low/medium/high/critical",
  "suggestedTests": ["test1", "test2"],
  "recommendations": "brief recommendation text",
  "urgency": "routine/soon/immediate"
}`;

    const aiResponse = await askGemini(prompt);

    let parsed = null;
    if (aiResponse) {
      try {
        const cleaned = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsed = JSON.parse(cleaned);
      } catch (e) {
        parsed = null;
      }
    }

    // Save diagnosis log
    const log = await DiagnosisLog.create({
      patientId: patientId || null,
      doctorId: req.user._id,
      symptoms,
      age,
      gender,
      history,
      aiResponse: aiResponse || 'AI unavailable',
      possibleConditions: parsed?.possibleConditions || [],
      riskLevel: parsed?.riskLevel || 'low',
      suggestedTests: parsed?.suggestedTests || [],
    });

    if (parsed) {
      res.json({ success: true, data: parsed, logId: log._id });
    } else {
      res.json({
        success: false,
        message: 'AI is currently unavailable. Please diagnose manually.',
        fallback: true,
        logId: log._id,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// AI Feature 2 — Prescription Explanation
exports.prescriptionExplanation = async (req, res) => {
  try {
    const { medicines, diagnosis, language } = req.body;

    const langText = language === 'urdu' ? 'Respond in Roman Urdu.' : 'Respond in simple English.';

    const prompt = `You are a friendly medical assistant. Explain this prescription to a patient in simple terms.
${langText}

Diagnosis: ${diagnosis}
Medicines:
${medicines.map(m => `- ${m.name}: ${m.dosage}, ${m.frequency}, for ${m.duration}`).join('\n')}

Provide:
1. Simple explanation of the diagnosis
2. Why each medicine is prescribed
3. Lifestyle recommendations
4. Preventive advice

Keep it friendly and easy to understand.`;

    const aiResponse = await askGemini(prompt);

    if (aiResponse) {
      res.json({ success: true, explanation: aiResponse });
    } else {
      res.json({ success: false, message: 'AI unavailable. Please explain manually.', fallback: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// AI Feature 3 — Risk Flagging
exports.riskFlagging = async (req, res) => {
  try {
    const { patientId } = req.params;

    const logs = await DiagnosisLog.find({ patientId }).sort('-createdAt').limit(10);

    if (logs.length === 0) {
      return res.json({ success: true, risk: 'none', message: 'No diagnosis history found.' });
    }

    const allSymptoms = logs.flatMap(l => l.symptoms);
    const allConditions = logs.flatMap(l => l.possibleConditions);

    const prompt = `You are a medical AI. Analyze this patient's diagnosis history for risk patterns.

Past Symptoms: ${allSymptoms.join(', ')}
Past Conditions: ${allConditions.join(', ')}
Number of visits: ${logs.length}

Respond ONLY in JSON (no markdown, no code blocks):
{
  "riskLevel": "low/medium/high/critical",
  "patterns": ["pattern1", "pattern2"],
  "warnings": ["warning1"],
  "recommendation": "text"
}`;

    const aiResponse = await askGemini(prompt);

    let parsed = null;
    if (aiResponse) {
      try {
        const cleaned = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsed = JSON.parse(cleaned);
      } catch (e) {
        parsed = null;
      }
    }

    res.json({ success: !!parsed, data: parsed, fallback: !parsed });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// AI Feature 4 — Predictive Analytics
exports.predictiveAnalytics = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await DiagnosisLog.find({ createdAt: { $gte: thirtyDaysAgo } });

    const allConditions = logs.flatMap(l => l.possibleConditions);
    const allSymptoms = logs.flatMap(l => l.symptoms);

    const prompt = `You are a medical analytics AI. Based on clinic data from the past 30 days:

Total diagnoses: ${logs.length}
Conditions seen: ${allConditions.join(', ') || 'None'}
Symptoms reported: ${allSymptoms.join(', ') || 'None'}

Respond ONLY in JSON (no markdown):
{
  "mostCommonDisease": "disease name",
  "trendingSymptoms": ["symptom1", "symptom2"],
  "patientLoadForecast": "expected trend text",
  "recommendations": "text for clinic management"
}`;

    const aiResponse = await askGemini(prompt);

    let parsed = null;
    if (aiResponse) {
      try {
        const cleaned = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsed = JSON.parse(cleaned);
      } catch (e) {
        parsed = null;
      }
    }

    res.json({ success: !!parsed, data: parsed, totalDiagnoses: logs.length, fallback: !parsed });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};