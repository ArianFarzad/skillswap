import { Request, Response } from 'express';
import Feedback from '../models/Feedback';
import logger from '../utils/logger';
import { getSessionFeedbackStats } from '../helpers/feedbackHelpers';

export const createFeedback = async (req: Request, res: Response) => {
  const { sessionId, userId, rating, feedback } = req.body;
  try {
    const newFeedback = new Feedback({ sessionId, userId, feedback, rating });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback created successfully' });
  } catch (error) {
    logger.error(`Error creating feedback: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFeedbacksInfoForSession = async (
  req: Request,
  res: Response
) => {
  const { sessionId } = req.params;
  // Assume req.user is populated by verifyToken middleware
  const loggedInUserId = req.user!.userId;
  try {
    const {
      givenFeedbacks,
      averageRatingGiven,
      receivedFeedbacks,
      averageRatingReceived,
    } = await getSessionFeedbackStats(sessionId, loggedInUserId);
    res.json({
      givenFeedbacks,
      averageRatingGiven,
      receivedFeedbacks,
      averageRatingReceived,
    });
  } catch (error) {
    logger.error(`Error fetching feedback for session ${sessionId}: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};
