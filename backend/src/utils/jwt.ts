import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { env } from '../config/config';
import logger from './logger';

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
    logger.warn('No token provided');
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  try {
    req.user = jwt.verify(token, env.JWT_SECRET!) as CustomJwtPayload;
    logger.info(
      `Token verified successfully for user: ${JSON.stringify(req.user.userId, null, 2)}`
    );
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      logger.error('Token has expired');
      return res.status(401).json({ error: 'error.session_expired' });
    }
    logger.error('Token verification failed:', error);
    res.status(401).json({ error: 'error.invalid_token' });
  }
};
