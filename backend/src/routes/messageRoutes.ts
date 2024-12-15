// Datei: backend/src/routes/messageRoutes.ts
import express from 'express';
import { auth } from '../middleware/auth';
import Message from '../models/Message';

const router = express.Router();

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

router.get('/:receiverId', auth, async (req, res) => {
  const senderId = req.user?.userId;
  const { receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).send({ message: 'error_fetching_messages' });
  }
});

export default router;