import express from 'express';
import { createSummary, sendEmail, updateSummary } from '../controllers/summaryController.js';

const router = express.Router();

router.post('/generate', createSummary);
router.post('/send', sendEmail);
router.put('/:id', updateSummary);

export default router;
