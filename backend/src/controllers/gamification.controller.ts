import { Request, Response } from 'express';
import Profile from '../models/Profile';
import logger from '../utils/logger';

export const addPoints = async (req: Request, res: Response) => {
  const { userId, points } = req.body;
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $inc: { points } },
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ points: profile.points });
  } catch (error) {
    logger.error(`Error adding points: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPoints = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({ userId: req.user?.userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ points: profile.points });
  } catch (error) {
    logger.error(`Error fetching points: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};
