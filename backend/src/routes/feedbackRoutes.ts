import { Router } from 'express';
import {
  createFeedback,
  getFeedbackForSession,
  getAverageRatingForUser,
} from '../controllers/feedbackController';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.post('/', verifyToken, createFeedback);
router.get('/session/:sessionId', verifyToken, getFeedbackForSession);
router.get(
  '/user/:userId/average-rating',
  verifyToken,
  getAverageRatingForUser
);

export default router;
