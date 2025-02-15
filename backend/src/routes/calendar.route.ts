import express from 'express';
import { importEvent } from '../controllers/calendar.controller';

const router = express.Router();


router.post('/import/:sessionId', importEvent);

export default router;