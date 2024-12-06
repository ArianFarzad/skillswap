import { Request, Response } from 'express';
import Feedback from '../models/Feedback';
import Session from '../models/Session';
import User from '../models/User';

export const createFeedback = async (req: Request, res: Response) => {
  const { sessionId, userId, rating, comment } = req.body;
  try {
    const feedback = new Feedback({ sessionId, userId, rating, comment });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFeedbackForSession = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  try {
    const feedback = await Feedback.find({ sessionId }).populate('userId', 'name');
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAverageRatingForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const feedback = await Feedback.find({ userId });
    const averageRating = feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length;
    res.json({ averageRating });
  } catch (error) {
    console.error('Error fetching average rating:', error);
    res.status(500).json({ error: 'Server error' });
  }
};