import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Importieren Sie das cors-Paket
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import dotenv from 'dotenv';
import gamificationRoutes from './routes/gamificationRoutes';
import calendarRoutes from './routes/calendarRoutes';


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
app.use('/api', calendarRoutes);

// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

export default app;
