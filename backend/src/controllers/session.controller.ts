import { Request, Response } from 'express';
import Session from '../models/Session';
import Profile from '../models/Profile';
import logger from '../utils/logger';

export const createSession = async (req: Request, res: Response) => {
  const { tutor, student, date } = req.body;
  try {
    const session = new Session({ tutor, student, date });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    logger.error('Error creating session:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getSessions = async (_req: Request, res: Response) => {
  try {
    const sessions = await Session.find()
      .populate('tutor', 'email name')
      .populate('student', 'email name');
    res.json(sessions);
  } catch (error) {
    logger.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { date, status } = req.body;
  try {
    const session = await Session.findByIdAndUpdate(
      sessionId,
      { date, status },
      { new: true }
    )
      .populate('tutor', 'email name')
      .populate('student', 'email name');
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    logger.error('Error updating session:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  try {
    const session = await Session.findByIdAndDelete(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ message: 'Session deleted' });
  } catch (error) {
    logger.error('Error deleting session:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const completeSession = async (req: Request, res: Response) => {
  const { id } = req.params; // ID der Sitzung
  try {
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.status = 'completed';
    await session.save();

    const profile = await Profile.findOne({ userId: session.student });
    if (profile) {
      profile.points += 10; // Beispiel: 10 Punkte pro abgeschlossene Sitzung
      await profile.save();
    }

    res.json({ message: 'Session completed and points added' });
  } catch (error) {
    logger.error('Error completing session:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
export const getSessionDetails = async (req: Request, res: Response) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findById(sessionId)
      .populate('messages.sender', 'name')
      .populate('tutor', 'name')
      .populate('student', 'name');

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const response = {
      messages: session.messages,
      tutor: session.tutor,
      student: session.student,
    };
    res.json(response);
  } catch (error) {
    logger.error('Error fetching session messages:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const checkSession = async (req: Request, res: Response) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    logger.error('Invalid session check request: Missing user IDs.');
    return res.status(400).json({ error: 'error.invalid_userId' });
  }

  try {
    const session = await Session.findOne({
      $or: [
        { tutor: user1, student: user2 },
        { tutor: user2, student: user1 },
      ],
    });

    if (session) {
      logger.info(`Session found: ${session._id}`);
      res.json({ sessionId: session._id });
    } else {
      logger.info('No session found');
      res.json({ sessionId: null });
    }
  } catch (error) {
    logger.error('Error checking session:', error);
    res.status(500).json({ error: 'error.server_error' });
  }
};

export const getSessionsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const sessions = await Session.find({
      $or: [{ tutor: userId }, { student: userId }],
    })
      .populate('tutor', 'name')
      .populate('student', 'name')
      .lean()
      .exec();

    const userIds = sessions.flatMap((session) => [
      session.tutor._id.toString(),
      session.student._id.toString(),
    ]);

    const profiles = await Profile.find({
      userId: { $in: userIds },
    })
      .lean()
      .exec();

    const profileMap = new Map(
      profiles.map((profile) => [
        profile.userId.toString(),
        profile.profilePicture || '',
      ])
    );

    const sessionsWithProfilePictures = sessions.map((session) => ({
      ...session,
      tutor: {
        ...session.tutor,
        profilePicture: profileMap.get(session.tutor._id.toString()) || '',
      },
      student: {
        ...session.student,
        profilePicture: profileMap.get(session.student._id.toString()) || '',
      },
    }));

    res.status(200).json(sessionsWithProfilePictures);
  } catch (error) {
    logger.error(`Error fetching sessions for user ${userId}: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
};
