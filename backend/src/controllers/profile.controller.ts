import { Request, Response } from 'express';
import Profile, { IProfile } from '../models/Profile';
import mongoose, { FilterQuery } from 'mongoose';
import logger from '../utils/logger';
import Session from '../models/Session';
import Feedback from '../models/Feedback';
import {
  hasDuplicates,
  isValidSkillOrInterest,
} from '../../../shared/validation';
import cloudinary from '../config/cloudinary';
import multer from 'multer';
import { isNotBlank } from '../utils/stringUtils';

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
    res.status(500).json({ error: 'error.server_error' });
  }
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    logger.info(`Fetching profile for user: ${req.user?.userId}`);
    const profile = await Profile.findOne({
      userId: req.user?.userId,
    });
    if (!profile) {
      logger.warn(`Profile not found for user: ${req.user?.userId}`);
      return res.status(404).json({ error: 'error.profile_not_found' });
    }
    res.json(profile);
  } catch (error) {
    logger.error(`Error fetching profile: ${error}`);
    res.status(500).json({ error: 'error.server_error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, skills, interests, addSkill, removeSkill } = req.body;
  try {
    logger.info(`Updating profile for user: ${req.user?.userId}`);

    const updateFields: Partial<IProfile> & {
      $push?: { skills?: string };
      $pull?: { skills?: string };
    } = {};
    if (name) {
      const existingProfile = await Profile.findOne({ name });
      if (existingProfile) {
        return res
          .status(400)
          .json({ error: 'Profile with this name already exists' });
      }
      updateFields.name = name;
    }
    if (skills) updateFields.skills = skills;
    if (interests) updateFields.interests = interests;
    if (addSkill) updateFields.$push = { skills: addSkill };
    if (removeSkill) updateFields.$pull = { skills: removeSkill };

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user?.userId },
      updateFields,
      { new: true }
    );
    if (!profile) {
      logger.warn('Profile not found for user:', req.user?.userId);
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    logger.error(`Error updating profile: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    logger.info(`Deleting profile for user: ${req.user?.userId}`);
    const profile = (await Profile.findOneAndDelete({
      userId: req.user?.userId,
    }).lean()) as IProfile | null;

    if (!profile) {
      logger.warn(`Profile not found for user: ${req.user?.userId}`);
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile deleted' });
  } catch (error) {
    logger.error(`Error deleting profile: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const searchProfiles = async (req: Request, res: Response) => {
  const { keyword, points } = req.query;
  const userId = req.user?.userId;

  try {
    const query: FilterQuery<IProfile> = {};

    if (isNotBlank(keyword as string)) {
      const keywordRegex = new RegExp(keyword as string, 'i');
      query.$or = [
        { name: { $regex: keywordRegex } },
        { skills: { $elemMatch: { $regex: keywordRegex } } },
        { interests: { $elemMatch: { $regex: keywordRegex } } },
        { email: { $regex: keywordRegex } },
      ];
    }

    if (points) {
      query.points = { $gte: points };
    }

    if (userId) {
      query.userId = { $ne: userId };
    }

    const profiles = await Profile.find(query);

    logger.info(`Profile search. ${profiles.length} profiles found.`);
    res.json(profiles);
  } catch (error) {
    logger.error(`Error searching profiles: ${error}`);
    res.status(500).json({ error: 'error.server_error' });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      logger.error(`Invalid profileId format: ${profileId}`);
      return res.status(400).json({ message: 'Invalid profileId format' });
    }

    const objectId = new mongoose.Types.ObjectId(profileId);
    logger.info('Converted profileId to ObjectId:', objectId);

    const profile = await Profile.findById(objectId);

    if (!profile) {
      logger.info(`No profile found for profileId: ${objectId}`);
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

  if (!isValidSkillOrInterest(skill)) {
    return res.status(400).json({ error: 'error.invalid_skill_format' });
  }

  logger.info(`adding skill to User: ${req.user?.userId}, Skill: ${skill}. `);

  try {
    const profile = await Profile.findOne({ userId: req.user?.userId });

    if (!profile) {
      logger.warn(`Profile not found for user: ${req.user?.userId}`);
      return res.status(404).json({ error: 'error.profile_not_found' });
    }

    if (hasDuplicates(profile.skills, skill)) {
      logger.warn(`Skill already exists: ${skill}`);
      return res.status(400).json({ error: 'error.skill_already_exists' });
    }

    profile.skills.push(skill);
    await profile.save();

    res.json(profile);
  } catch (error) {
    logger.error(`Error adding skill: ${error}`);
    res.status(500).json({ error: 'error.server_error' });
  }
};

export const removeSkill = async (req: Request, res: Response) => {
  const { skill } = req.body;
  try {
    logger.info(
      `Removing skill from User: ${req.user?.userId}, Skill: ${skill}`
    );
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user?.userId },
      { $pull: { skills: skill } },
      { new: true }
    );

    res.json(profile);
  } catch (error) {
    logger.error('Error removing skill:', error);
    res.status(500).json({ error: 'error.server_error' });
  }
};

export const addInterest = async (req: Request, res: Response) => {
  const { interest } = req.body;

  if (!isValidSkillOrInterest(interest)) {
    return res.status(400).json({ error: 'error.invalid_interest_format' });
  }

  try {
    logger.info(
      `Adding interest to User: ${req.user?.userId}, Interest: ${interest}`
    );

    const profile = await Profile.findOne({ userId: req.user?.userId });

    if (!profile) {
      logger.warn(`Profile not found for user: ${req.user?.userId}`);
      return res.status(404).json({ error: 'error.profile_not_found' });
    }

    if (hasDuplicates(profile.interests, interest)) {
      logger.warn(`Interest already exists: ${interest}`);
      return res.status(400).json({ error: 'error.interest_already_exists' });
    }

    profile.interests.push(interest);
    await profile.save();

    res.json(profile);
  } catch (error) {
    logger.error(`Error adding interest: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

export const removeInterest = async (req: Request, res: Response) => {
  const { interest } = req.body;
  try {
    logger.info(
      `Removing interest from User: ${req.user?.userId}, Interest: ${interest}`
    );
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user?.userId },
      { $pull: { interests: interest } },
      { new: true }
    );
    res.json(profile);
  } catch (error) {
    logger.error('Error removing interest:', error);
    res.status(500).json({ error: 'error.server_error' });
  }
};

export const getUserStatistics = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const sessionCount = await Session.countDocuments({
      $or: [{ tutor: userId }, { student: userId }],
    });

    const tutorSessionCount = await Session.countDocuments({ tutor: userId });
    const studentSessionCount = await Session.countDocuments({
      student: userId,
    });

    const feedbackCount = await Feedback.countDocuments({ userId });

    const feedbacks = await Feedback.find({ userId });
    const totalRating = feedbacks.reduce(
      (sum, feedback) => sum + feedback.rating,
      0
    );
    const averageRating = feedbacks.length ? totalRating / feedbacks.length : 0;

    const messageCount = await Session.aggregate([
      {
        $match: {
          $or: [
            { tutor: new mongoose.Types.ObjectId(userId) },
            { student: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      { $unwind: '$messages' },
      { $count: 'totalMessages' },
    ]);

    const sentMessagesCount = await Session.aggregate([
      { $match: { 'messages.sender': new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$messages' },
      { $match: { 'messages.sender': new mongoose.Types.ObjectId(userId) } },
      { $count: 'sentMessages' },
    ]);

    const receivedMessagesCount = await Session.aggregate([
      {
        $match: {
          $or: [
            { tutor: new mongoose.Types.ObjectId(userId) },
            { student: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      { $unwind: '$messages' },
      {
        $match: {
          'messages.sender': { $ne: new mongoose.Types.ObjectId(userId) },
        },
      },
      { $count: 'receivedMessages' },
    ]);

    res.status(200).json({
      sessionCount,
      tutorSessionCount,
      studentSessionCount,
      averageRating,
      feedbackCount,
      messageCount: messageCount[0]?.totalMessages || 0,
      sentMessagesCount: sentMessagesCount[0]?.sentMessages || 0,
      receivedMessagesCount: receivedMessagesCount[0]?.receivedMessages || 0,
    });
  } catch (error) {
    logger.error(`Error fetching user statistics: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};

const upload = multer({ dest: 'uploads/' });

export const uploadProfilePicture = [
  upload.single('profilePicture'), // Middleware to handle file uploads
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!req.file) {
        logger.warn('No profile picture uploaded');
        return res
          .status(400)
          .json({ error: 'error.profile_picture_required' });
      }

      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profile_pictures',
        transformation: [{ width: 200, height: 200, crop: 'fill' }],
      });

      // Update the profile with the new image URL
      const profile = await Profile.findOneAndUpdate(
        { userId },
        { profilePicture: uploadResponse.secure_url },
        { new: true }
      );

      if (!profile) {
        logger.warn(`Profile not found for user: ${userId}`);
        return res.status(404).json({ error: 'error.profile_not_found' });
      }

      res.status(200).json({ profilePicture: profile.profilePicture });
    } catch (error) {
      logger.error(`Error uploading profile picture: ${error}`);
      res.status(500).json({ error: 'error.server_error' });
    }
  },
];

export const deleteProfilePicture = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { profilePicture: '' },
      { new: true }
    );

    if (!profile) {
      logger.warn(`Profile not found for user: ${userId}`);
      return res.status(404).json({ error: 'error.profile_not_found' });
    }

    res.status(200).json({ message: 'Profile picture deleted' });
  } catch (error) {
    logger.error(`Error deleting profile picture: ${error}`);
    res.status(500).json({ error: 'error.server_error' });
  }
};
