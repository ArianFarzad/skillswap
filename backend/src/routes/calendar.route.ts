import express from 'express';
import { importEvent, getEvents } from '../controllers/calendar.controller';
import { verifyToken } from '../utils/jwt';

const router = express.Router();

router.post('/import/:sessionId', verifyToken, importEvent);
router.get('/:sessionId', verifyToken, getEvents);

export default router;
