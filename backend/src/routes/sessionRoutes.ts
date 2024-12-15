import { Router } from 'express';
import {
  createSession,
  getSessions,
  updateSession,
  deleteSession,
} from '../controllers/sessionController';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.post('/', verifyToken, createSession);
router.get('/', verifyToken, getSessions);
router.put('/:id', verifyToken, updateSession);
router.delete('/:id', verifyToken, deleteSession);

export default router;
