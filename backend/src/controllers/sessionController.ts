import { Request, Response } from 'express';
import Session from '../models/Session';
import nodemailer from 'nodemailer';
import Profile from '../models/Profile';
import { env } from '../config/config';

interface PopulatedSession {
  tutor: {
    email: string;
  };
  student: {
    email: string;
  };
  date: Date;
  status: string;
}

export const createSession = async (req: Request, res: Response) => {
  const { tutor, student, date } = req.body;
  try {
    const session = new Session({ tutor, student, date });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
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
    console.error('Error fetching sessions:', error);
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
    console.error('Error updating session:', error);
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
    console.error('Error deleting session:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const sendReminderEmails = async () => {
  try {
    const sessions = await Session.find({
      date: {
        $gte: new Date(Date.now() + 24 * 60 * 60 * 1000),
        $lt: new Date(Date.now() + 25 * 60 * 60 * 1000),
      },
      status: 'confirmed',
    })
      .populate('tutor', 'email')
      .populate('student', 'email');

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });

    for (const session of sessions as unknown as PopulatedSession[]) {
      const mailOptions = {
        from: env.EMAIL_USER,
        to: [session.tutor.email, session.student.email],
        subject: 'Session Reminder',
        text: `Reminder: You have a session scheduled on ${session.date}`,
      };

      await transporter.sendMail(mailOptions);
    }
  } catch (error) {
    console.error('Error sending reminder emails:', error);
  }
};

export const completeSession = async (req: Request, res: Response) => {
  const { id } = req.params; // ID der Sitzung
  try {
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Aktualisieren des Sitzungsstatus
    session.status = 'completed';
    await session.save();

    // Punkte zum Profil hinzufügen
    const profile = await Profile.findOne({ userId: session.student });
    if (profile) {
      profile.points += 10; // Beispiel: 10 Punkte pro abgeschlossene Sitzung
      await profile.save();
    }

    res.json({ message: 'Session completed and points added' });
  } catch (error) {
    console.error('Error completing session:', error);
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
    console.error('Error fetching session messages:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const checkSession = async (req: Request, res: Response) => {
  const { user1, user2 } = req.query;
  try {
    const session = await Session.findOne({
      $or: [
        { tutor: user1, student: user2 },
        { tutor: user2, student: user1 },
      ],
    });

    if (session) {
      console.log('Session found:', session);
      res.json({ sessionId: session._id });
    } else {
      console.log('No session found');
      res.json({ sessionId: null });
    }
  } catch (error) {
    console.error('Error checking session:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
