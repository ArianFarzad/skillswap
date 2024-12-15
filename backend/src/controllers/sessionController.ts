import { Request, Response } from 'express';
import Session from '../models/Session';
import nodemailer from 'nodemailer';
import Profile from '../models/Profile';


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

export const getSessions = async (req: Request, res: Response) => {
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
  const { id } = req.params;
  const { date, status } = req.body;
  try {
    const session = await Session.findByIdAndUpdate(
      id,
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
  const { id } = req.params;
  try {
    const session = await Session.findByIdAndDelete(id);
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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const session of sessions as unknown as PopulatedSession[]) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
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