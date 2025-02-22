import { Router } from 'express';
import { uploadAttachments } from '../controllers/message.controller';

const router = Router();

router.post('/uploads', uploadAttachments);

export default router;
