import Summary from '../models/Summary.js';
import { generateSummary } from '../services/groqService.js';
import { sendSummaryEmail } from '../services/mailService.js';

export const createSummary = async (req, res) => {
  const { originalText, customPrompt } = req.body;

  try {
    const summary = await generateSummary(originalText, customPrompt);
    const saved = await Summary.create({ originalText, customPrompt, summary });
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendEmail = async (req, res) => {
  const { summary, recipients } = req.body;

  try {
    await sendSummaryEmail(recipients, summary);
    res.status(200).json({ message: '✅ Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
