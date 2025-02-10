import { Request, Response } from 'express';
import Profile, { IProfile } from '../models/Profile';
import mongoose, { FilterQuery } from 'mongoose';
import logger from '../utils/logger';

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
    logger.info(`Creating profile for user: ${req.user?.userId}`);
    const profile = new Profile({
      userId: req.user!.userId,
      name,
      skills,
      interests,
    });
    await profile.save();
    logger.info(`Profile created successfully: ${profile}`);
    res.status(201).json(profile);
  } catch (error) {
    logger.error(`Error creating profile: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      logger.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    logger.info(`Fetching profile for user: ${req.user.userId}`);
    const profile = (await Profile.findOne({
      userId: req.user.userId,
    })) as IProfile;
    if (!profile) {
      logger.warn('Profile not found for user:', req.user.userId);
      return res.status(404).json({ error: 'Profile not found' });
    }
    logger.info(`Profile fetched successfully: ${profile.name}`);
    res.json(profile);
  } catch (error) {
    logger.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllProfiles = async (_req: Request, res: Response) => {
  try {
    logger.info('Fetching all profiles');
    const profiles = await Profile.find();
    logger.info('Profiles fetched successfully.');
    res.json(profiles);
  } catch (error) {
    logger.error('Error fetching all profiles:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, skills, interests, addSkill, removeSkill } = req.body;
  try {
    if (!req.user) {
      logger.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    logger.info('Updating profile for user:', req.user.userId);

    const updateFields: Partial<IProfile> & {
      $push?: { skills?: string };
      $pull?: { skills?: string };
    } = {};
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
      logger.warn('Profile not found for user:', req.user.userId);
      return res.status(404).json({ error: 'Profile not found' });
    }
    logger.info('Profile updated successfully:', profile);
    res.json(profile);
  } catch (error) {
    logger.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      logger.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    logger.info(`Deleting profile for user: ${req.user.userId}`);
    const profile = (await Profile.findOneAndDelete({
      userId: req.user.userId,
    }).lean()) as IProfile | null;

    if (!profile) {
      logger.warn(`Profile not found for user: ${req.user.userId}`);
      return res.status(404).json({ error: 'Profile not found' });
    }

    logger.info(`Profile deleted successfully: ${profile}`);
    res.json({ message: 'Profile deleted' });
  } catch (error) {
    logger.error(`Error deleting profile: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const searchProfiles = async (req: Request, res: Response) => {
  logger.info('searchProfiles function called');
  const { keyword, skills, interests, name, email, filter } = req.query;
  const userId = req.user?.userId;

  try {
    const query: FilterQuery<IProfile> = {};

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

    logger.info(`Profile search. ${profiles.length} profiles found.`);

    res.json(profiles);
  } catch (error) {
    logger.error('Error searching profiles:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  try {
    // Check if `profileId` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      logger.error('Invalid profileId format:', profileId);
      return res.status(400).json({ message: 'Invalid profileId format' });
    }

    // Convert profileId to ObjectId
    const objectId = new mongoose.Types.ObjectId(profileId);
    logger.info('Converted profileId to ObjectId:', objectId);

    // Find profile by profileId
    const profile = await Profile.findById(objectId);

    if (!profile) {
      logger.info('No profile found for profileId:', objectId);
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    logger.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addSkill = async (req: Request, res: Response) => {
  const { skill } = req.body;
  try {
    if (!req.user) {
      logger.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    logger.info(`Adding skill for user: ${req.user.userId}, Skill: ${skill}`);
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { skills: skill } },
      { new: true }
    );
    res.json(profile);
  } catch (error) {
    logger.error(`Error adding skill: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const removeSkill = async (req: Request, res: Response) => {
  const { skill } = req.body;
  try {
    if (!req.user) {
      logger.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    logger.info('Removing skill for user:', req.user.userId, 'Skill:', skill);
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { skills: skill } },
      { new: true }
    );
    logger.info('Skill removed successfully:', profile);
    res.json(profile);
  } catch (error) {
    logger.error('Error removing skill:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addInterest = async (req: Request, res: Response) => {
  const { interest } = req.body;
  try {
    if (!req.user) {
      logger.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    logger.info(
      `Adding interest for user: ${req.user.userId}, Interest: ${interest}`
    );
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { interests: interest } },
      { new: true }
    );
    logger.info(`Interest added successfully: ${profile}`);
    res.json(profile);
  } catch (error) {
    logger.error(`Error adding interest: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const removeInterest = async (req: Request, res: Response) => {
  const { interest } = req.body;
  try {
    if (!req.user) {
      logger.warn('Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    logger.info(
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
    logger.info('Interest removed successfully:', profile);
    res.json(profile);
  } catch (error) {
    logger.error('Error removing interest:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const searchProfilesBySkills = async (req: Request, res: Response) => {
  const { skills } = req.query;
  try {
    logger.info('Searching profiles with skills:', skills);
    const skillsArray = Array.isArray(skills) ? skills : [skills];
    const stringSkillsArray = skillsArray.filter(
      (skill) => typeof skill === 'string'
    ) as string[];
    const profiles = await Profile.find({
      skills: { $in: stringSkillsArray },
    });
    logger.info('Profiles found:', profiles);
    res.json(profiles);
  } catch (error) {
    logger.error('Error searching profiles by skills:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const searchProfilesByInterests = async (
  req: Request,
  res: Response
) => {
  const { interests } = req.query;
  try {
    logger.info('Searching profiles with interests:', interests);
    const interestsArray = Array.isArray(interests) ? interests : [interests];
    const stringInterestsArray = interestsArray.filter(
      (interest) => typeof interest === 'string'
    ) as string[];
    const profiles = await Profile.find({
      interests: { $in: stringInterestsArray },
    });
    logger.info('Profiles found:', profiles);
    res.json(profiles);
  } catch (error) {
    logger.error('Error searching profiles by interests:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
