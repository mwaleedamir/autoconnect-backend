
import express from 'express';
import { chatWithAI, testAPIKey } from '../controllers/chatbot.js';


const router = express.Router();

router.post('/chat', chatWithAI);
router.get('/chat',testAPIKey)

export default router;
