import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import gamificationRoutes from './routes/gamificationRoutes';
import calendarRoutes from './routes/calendarRoutes';
import messageRoutes from './routes/messageRoutes';
import sessionRoutes from './routes/sessionRoutes'; // Importieren Sie die Session-Routen

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Aktivieren Sie CORS
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
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
app.use('/api/sessions', sessionRoutes); // Fügen Sie die Session-Routen hinzu

// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export default app;