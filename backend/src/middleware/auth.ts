// Beispiel für Authentifizierungs-Middleware
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: any;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, 'IhrJWTGeheimnis');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid token' });
  }
};