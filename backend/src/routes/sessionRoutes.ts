import { Router } from 'express';
import {
  createSession,
  getSessions,
  updateSession,
  deleteSession,
  checkSession,
} from '../controllers/sessionController';
import { verifyToken } from '../utils/jwt';
import { sendMessageInSession, getSessionMessages } from '../controllers/sessionController';


const router = Router();

router.post('/', verifyToken, createSession);
router.get('/', verifyToken, getSessions);
router.put('/:sessionId', verifyToken, updateSession);
router.delete('/:sessionId', verifyToken, deleteSession);
router.post('/:sessionId/messages', verifyToken, sendMessageInSession);
router.get('/:sessionId/messages', verifyToken, getSessionMessages);
router.get('/check', verifyToken, checkSession);

export default router;
