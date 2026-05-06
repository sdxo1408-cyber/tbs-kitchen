const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const db = require('./db');

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/auth/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number required' });
  try {
    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: `+91${phone}`, channel: 'sms' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ error: 'Phone and code required' });
  try {
    const result = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: `+91${phone}`, code });
    if (result.status !== 'approved') {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    const user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone);
    res.json({ success: true, isNewUser: !user, user: user || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

app.post('/api/auth/user', (req, res) => {
  const { phone, name, goal, diet, allergies } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone required' });
  try {
    db.prepare(`
      INSERT INTO users (phone, name, goal, diet, allergies)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(phone) DO UPDATE SET
        name = excluded.name,
        goal = excluded.goal,
        diet = excluded.diet,
        allergies = excluded.allergies
    `).run(phone, name, goal, diet, allergies);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`TBS backend running on port ${PORT}`);
});
