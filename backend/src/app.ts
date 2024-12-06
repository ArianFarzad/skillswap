import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import sessionRoutes from './routes/sessionRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/feedback', feedbackRoutes);

// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

export default app;