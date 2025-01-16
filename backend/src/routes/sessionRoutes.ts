import { Router } from 'express';
import {
  checkSession,
  createSession,
  deleteSession,
  getSessionDetails,
  getSessions,
  sendMessageInSession,
  updateSession,
} from '../controllers/sessionController';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.post('/', verifyToken, createSession);
router.get('/', verifyToken, getSessions);
router.get('/check', verifyToken, checkSession);
router.put('/:sessionId', verifyToken, updateSession);
router.delete('/:sessionId', verifyToken, deleteSession);
router.post('/:sessionId/messages', verifyToken, sendMessageInSession);
router.get('/:sessionId', verifyToken, getSessionDetails);

export default router;
