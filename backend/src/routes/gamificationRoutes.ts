import { Router } from 'express';
import { addPoints, getPoints } from '../controllers/gamificationController';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.put('/points', verifyToken, addPoints);
router.get('/points', verifyToken, getPoints);

export default router;