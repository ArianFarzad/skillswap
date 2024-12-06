import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    console.log('Registering user with email:', email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    console.log('User registered successfully:', user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if ((error as any).code === 11000) {
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
    if (!user) {
      console.warn('Invalid credentials for email:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn('Invalid credentials for email:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    console.log('User logged in successfully:', user);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};