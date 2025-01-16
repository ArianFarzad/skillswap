import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Profile from '../models/Profile';
import { env } from '../config/config';

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    console.log('Registering user with email:', email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    console.log('User registered successfully:', user);

    // Profil mit userId und name erstellen
    const profile = new Profile({
      userId: user._id,
      name: user.name,
      email: user.email,
      skills: [],
      interests: [],
    });
    await profile.save();
    console.log('Profile created successfully:', profile);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: unknown) {
    if (error instanceof Error && (error as { code?: number }).code === 11000) {
      console.error('Error registering user: Duplicate email');
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    console.log('Logging in user with email:', email);
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.warn('Invalid credentials.', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.warn('Invalid credentials.', email);
      return res.status(400).json({ error: 'Invalid credentials' });
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
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    console.log('Refreshing token');
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' });
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

    return res.json({ token: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Invalid refresh token' });
  }
};
