import express from 'express';
import { importEvent, getEvents, createEvent, downloadEventAsICS } from '../controllers/calendar.controller';
import { verifyToken } from '../utils/jwt';

const router = express.Router();

router.post('/import/:sessionId', verifyToken, importEvent);
router.post('/create/:sessionId', verifyToken, createEvent);
router.get('/download/event/:eventId', verifyToken, downloadEventAsICS);
router.get('/:sessionId', verifyToken, getEvents);

export default router;
