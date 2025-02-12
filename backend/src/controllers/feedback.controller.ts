import { Request, Response } from 'express';
import Feedback from '../models/Feedback';
import logger from '../utils/logger';

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

export const getFeedbackForSession = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  try {
    const feedback = await Feedback.find({ sessionId }).populate(
      'userId',
      'name'
    );
    res.json(feedback);
  } catch (error) {
    logger.error(`Error fetching feedback: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAverageRatingForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const feedback = await Feedback.find({ userId });
    const averageRating =
      feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length;
    res.json({ averageRating });
  } catch (error) {
    logger.error(`Error fetching average rating: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.find({ sessionId: req.params.sessionId });
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    const averageRating =
      feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length;
    res.status(200).json({ feedback, averageRating });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
