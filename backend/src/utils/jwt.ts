import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { env } from '../config/config';

interface CustomJwtPayload extends jwt.JwtPayload {
  userId: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    console.warn('No token provided');
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  try {
    req.user = jwt.verify(token, env.JWT_SECRET!) as CustomJwtPayload;
    console.log('Token verified successfully');
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error('Token has expired');
      return res.status(401).json({ error: 'Token has expired' });
    }
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};
