import { Request, Response } from 'express';
import Profile from '../models/Profile';

declare module 'express' {

  export interface Request {

    user?: {

      userId: string;

    };

  }

}


export const createProfile = async (req: Request, res: Response) => {
  const { name, skills, interests } = req.body;
  try {
    const profile = new Profile({ userId: req.user!.userId, name, skills, interests });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const profile = await Profile.findOne({ userId: req.user.userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, skills, interests } = req.body;
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { name, skills, interests },
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const profile = await Profile.findOneAndDelete({ userId: req.user.userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};