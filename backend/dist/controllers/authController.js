"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
// authController.ts
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        console.log('Registering user with email:', email);
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ email, password: hashedPassword, name });
        yield user.save();
        console.log('User registered successfully:', user);
        // Profil mit userId und name erstellen
        const profile = new Profile_1.default({
            userId: user._id,
            name: user.name,
            email: user.email,
            skills: [],
            interests: [],
        });
        yield profile.save();
        console.log('Profile created successfully:', profile);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        if (error instanceof Error && error.code === 11000) {
            console.error('Error registering user: Duplicate email');
            return res.status(400).json({ error: 'Email already exists' });
        }
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        console.log('Logging in user with email:', email);
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            console.warn('Invalid credentials for email:', email);
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            console.warn('Invalid credentials for email:', email);
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log('User logged in successfully:', user);
        res.json({ token });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.login = login;
