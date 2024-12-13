import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Importieren Sie das cors-Paket
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import dotenv from 'dotenv';
import gamificationRoutes from './routes/gamificationRoutes';


dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Aktivieren Sie CORS
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/gamification', gamificationRoutes);

// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

export default app;
