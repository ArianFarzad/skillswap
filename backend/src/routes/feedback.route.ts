import { Router } from 'express';
import {
  createFeedback,
  getFeedbacksInfoForSession,
} from '../controllers/feedback.controller';
import { verifyToken } from '../utils/jwt';

const router = Router();
// /api/feedbacks
router.post('/', verifyToken, createFeedback);
router.get('/:sessionId', verifyToken, getFeedbacksInfoForSession);

export default router;
