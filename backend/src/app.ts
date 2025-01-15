import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import gamificationRoutes from './routes/gamificationRoutes';
import calendarRoutes from './routes/calendarRoutes';
import messageRoutes from './routes/messageRoutes';
import sessionRoutes from './routes/sessionRoutes';
import feedbackRoutes from './routes/feedbackRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // activate CORS
app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/feedback', feedbackRoutes);

// MongoDB-Verbindung
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export default app;
