"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors")); // Importieren Sie das cors-Paket
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const gamificationRoutes_1 = __importDefault(require("./routes/gamificationRoutes"));
const calendarRoutes_1 = __importDefault(require("./routes/calendarRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)()); // Aktivieren Sie CORS
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';");
    next();
});
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/profiles', profileRoutes_1.default);
app.use('/api/gamification', gamificationRoutes_1.default);
app.use('/api', calendarRoutes_1.default);
// MongoDB-Verbindung
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});
exports.default = app;
