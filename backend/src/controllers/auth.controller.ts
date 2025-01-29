import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Profile from '../models/Profile';
import { env } from '../config/config';
import logger from '../utils/logger';

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    logger.info(`Registering user with email: ${email}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    logger.info(`Registered user with email: ${email}`);

    // Profil mit userId und name erstellen
    const profile = new Profile({
      userId: user._id,
      name: user.name,
      email: user.email,
      skills: [],
      interests: [],
    });
    await profile.save();
    logger.info(`Profile created successfully: ${profile}`);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: unknown) {
    if (error instanceof Error && (error as { code?: number }).code === 11000) {
      logger.error('Error registering user: Duplicate email');
      return res.status(400).json({ error: 'error.email_exists' });
    }
    logger.error(`Error registering user: ${error}`);
    res.status(500).json({ error: 'error.server_error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    logger.info(`Logging in user with email: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn(`Invalid Email: ${email}`);
      return res.status(400).json({ error: 'error.invalid_credentials' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      logger.warn(`Invalid password for Email: ${email}`);
      return res.status(400).json({ error: 'error.invalid_credentials' });
    }

    const token = jwt.sign({ userId: user._id }, env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      env.JWT_REFRESH_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    res.json({ token, userId: user._id });
  } catch (error: unknown) {
    logger.error(`Error logging in user: ${error}`);
    res.status(500).json({ error: 'error.server_error' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    logger.info('Refreshing token...');
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: 'error.no_token' });
    }

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET!) as {
      userId: string;
    };

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      env.JWT_SECRET!,
      {
        expiresIn: '1h',
      }
    );

    return res.json({ token: newAccessToken, userId: decoded.userId });
  } catch (error) {
    logger.error(`Error refreshing token: ${error}`);
    res.status(500).json({ error: 'error.invalid_token' });
  }
};
