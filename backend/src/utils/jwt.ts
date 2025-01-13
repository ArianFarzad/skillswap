import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

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
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;
    console.log('Token verified successfully');
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};
