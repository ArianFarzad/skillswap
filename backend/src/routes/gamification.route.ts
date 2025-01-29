import { Router } from 'express';
import { addPoints, getPoints } from '../controllers/gamification.controller';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.put('/points', verifyToken, addPoints);
router.get('/points', verifyToken, getPoints);

export default router;
