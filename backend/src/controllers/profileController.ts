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
    console.log('Creating profile for user:', req.user!.userId);
    const profile = new Profile({ userId: req.user!.userId, name, skills, interests });
    await profile.save();
    console.log('Profile created successfully:', profile);
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      console.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log('Fetching profile for user:', req.user.userId);
    const profile = await Profile.findOne({ userId: req.user.userId });
    if (!profile) {
      console.warn('Profile not found for user:', req.user.userId);
      return res.status(404).json({ error: 'Profile not found' });
    }
    console.log('Profile fetched successfully:', profile);
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching all profiles:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, skills, interests } = req.body;
  try {
    if (!req.user) {
      console.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log('Updating profile for user:', req.user.userId);
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { name, skills, interests },
      { new: true }
    );
    if (!profile) {
      console.warn('Profile not found for user:', req.user.userId);
      return res.status(404).json({ error: 'Profile not found' });
    }
    console.log('Profile updated successfully:', profile);
    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      console.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log('Deleting profile for user:', req.user.userId);
    const profile = await Profile.findOneAndDelete({ userId: req.user.userId });
    if (!profile) {
      console.warn('Profile not found for user:', req.user.userId);
      return res.status(404).json({ error: 'Profile not found' });
    }
    console.log('Profile deleted successfully:', profile);
    res.json({ message: 'Profile deleted' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const searchProfiles = async (req: Request, res: Response) => {
  const { skills } = req.query;
  try {
    console.log('Searching profiles with skills:', skills);
    const skillsArray = Array.isArray(skills) ? skills : [skills];
    const stringSkillsArray = skillsArray.filter(skill => typeof skill === 'string') as string[];
    const profiles = await Profile.find({
      skills: { $in: stringSkillsArray }
    });
    console.log('Profiles found:', profiles);
    res.json(profiles);
  } catch (error) {
    console.error('Error searching profiles:', error);
    res.status(500).json({ error: 'Server error' });
  }
};