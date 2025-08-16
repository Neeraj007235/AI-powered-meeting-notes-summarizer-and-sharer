import express from 'express';
import { createSummary, sendEmail } from '../controllers/summaryController.js';

const router = express.Router();

router.post('/generate', createSummary);
router.post('/send', sendEmail);

export default router;
