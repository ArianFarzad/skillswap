import { Request, Response } from 'express';
import Profile from '../models/Profile';
import mongoose from 'mongoose';

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
    const profile = new Profile({
      userId: req.user!.userId,
      name,
      skills,
      interests,
    });
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
    console.log('Fetching all profiles');
    const profiles = await Profile.find();
    console.log('Profiles fetched successfully:', profiles);
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching all profiles:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, skills, interests, addSkill, removeSkill } = req.body;
  try {
    if (!req.user) {
      console.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log('Updating profile for user:', req.user.userId);

    const updateFields: any = {};
    if (name) updateFields.name = name;
    if (skills) updateFields.skills = skills;
    if (interests) updateFields.interests = interests;
    if (addSkill) updateFields.$push = { skills: addSkill };
    if (removeSkill) updateFields.$pull = { skills: removeSkill };

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      updateFields,
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
  console.log('searchProfiles function called');
  const { keyword, skills, interests, name, email, filter } = req.query;
  const userId = req.user?.userId;

  console.log('searchProfiles query:', req.query);

  try {
    const query: any = {};

    if (keyword) {
      const keywordRegex = new RegExp(keyword as string, 'i');
      query.$or = [
        { name: { $regex: keywordRegex } },
        { skills: { $regex: keywordRegex } },
        { interests: { $regex: keywordRegex } },
        { email: { $regex: keywordRegex } },
      ];
    }

    if (skills) {
      const skillsArray = Array.isArray(skills) ? skills : [skills as string];
      query.skills = { $all: skillsArray };
    }

    if (interests) {
      const interestsArray = Array.isArray(interests)
        ? interests
        : [interests as string];
      query.interests = { $all: interestsArray };
    }

    if (name) {
      query.name = { $regex: name as string, $options: 'i' };
    }

    if (email) {
      query.email = { $regex: email as string, $options: 'i' };
    }

    if (filter) {
      query.points = { $gte: filter };
    }

    if (userId) {
      query.userId = { $ne: userId };
    }

    const profiles = await Profile.find(query);

    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No profiles found' });
    }
    console.log('Profiles found. Count:', profiles.length);

    res.json(profiles);
  } catch (error) {
    console.error('Error searching profiles:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  try {
    // Check if `profileId` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      console.error('Invalid profileId format:', profileId);
      return res.status(400).json({ message: 'Invalid profileId format' });
    }

    // Convert profileId to ObjectId
    const objectId = new mongoose.Types.ObjectId(profileId);
    console.log('Converted profileId to ObjectId:', objectId);

    // Find profile by profileId
    const profile = await Profile.findById(objectId);

    if (!profile) {
      console.log('No profile found for profileId:', objectId);
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addSkill = async (req: Request, res: Response) => {
  const { skill } = req.body;
  try {
    if (!req.user) {
      console.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log('Adding skill for user:', req.user.userId, 'Skill:', skill);
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { skills: skill } },
      { new: true }
    );
    console.log('Skill added successfully:', profile);
    res.json(profile);
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const removeSkill = async (req: Request, res: Response) => {
  const { skill } = req.body;
  try {
    if (!req.user) {
      console.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log('Removing skill for user:', req.user.userId, 'Skill:', skill);
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { skills: skill } },
      { new: true }
    );
    console.log('Skill removed successfully:', profile);
    res.json(profile);
  } catch (error) {
    console.error('Error removing skill:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addInterest = async (req: Request, res: Response) => {
  const { interest } = req.body;
  try {
    if (!req.user) {
      console.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log(
      'Adding interest for user:',
      req.user.userId,
      'Interest:',
      interest
    );
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { interests: interest } },
      { new: true }
    );
    console.log('Interest added successfully:', profile);
    res.json(profile);
  } catch (error) {
    console.error('Error adding interest:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const removeInterest = async (req: Request, res: Response) => {
  const { interest } = req.body;
  try {
    if (!req.user) {
      console.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log(
      'Removing interest for user:',
      req.user.userId,
      'Interest:',
      interest
    );
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { interests: interest } },
      { new: true }
    );
    console.log('Interest removed successfully:', profile);
    res.json(profile);
  } catch (error) {
    console.error('Error removing interest:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const searchProfilesBySkills = async (req: Request, res: Response) => {
  const { skills } = req.query;
  try {
    console.log('Searching profiles with skills:', skills);
    const skillsArray = Array.isArray(skills) ? skills : [skills];
    const stringSkillsArray = skillsArray.filter(
      (skill) => typeof skill === 'string'
    ) as string[];
    const profiles = await Profile.find({
      skills: { $in: stringSkillsArray },
    });
    console.log('Profiles found:', profiles);
    res.json(profiles);
  } catch (error) {
    console.error('Error searching profiles by skills:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const searchProfilesByInterests = async (
  req: Request,
  res: Response
) => {
  const { interests } = req.query;
  try {
    console.log('Searching profiles with interests:', interests);
    const interestsArray = Array.isArray(interests) ? interests : [interests];
    const stringInterestsArray = interestsArray.filter(
      (interest) => typeof interest === 'string'
    ) as string[];
    const profiles = await Profile.find({
      interests: { $in: stringInterestsArray },
    });
    console.log('Profiles found:', profiles);
    res.json(profiles);
  } catch (error) {
    console.error('Error searching profiles by interests:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
