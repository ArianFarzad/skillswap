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
exports.completeSession = exports.sendReminderEmails = exports.deleteSession = exports.updateSession = exports.getSessions = exports.createSession = void 0;
const Session_1 = __importDefault(require("../models/Session"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const Profile_1 = __importDefault(require("../models/Profile"));
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutor, student, date } = req.body;
    try {
        const session = new Session_1.default({ tutor, student, date });
        yield session.save();
        res.status(201).json(session);
    }
    catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.createSession = createSession;
const getSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessions = yield Session_1.default.find()
            .populate('tutor', 'email name')
            .populate('student', 'email name');
        res.json(sessions);
    }
    catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getSessions = getSessions;
const updateSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { date, status } = req.body;
    try {
        const session = yield Session_1.default.findByIdAndUpdate(id, { date, status }, { new: true })
            .populate('tutor', 'email name')
            .populate('student', 'email name');
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    }
    catch (error) {
        console.error('Error updating session:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.updateSession = updateSession;
const deleteSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const session = yield Session_1.default.findByIdAndDelete(id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json({ message: 'Session deleted' });
    }
    catch (error) {
        console.error('Error deleting session:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.deleteSession = deleteSession;
const sendReminderEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessions = yield Session_1.default.find({
            date: {
                $gte: new Date(Date.now() + 24 * 60 * 60 * 1000),
                $lt: new Date(Date.now() + 25 * 60 * 60 * 1000),
            },
            status: 'confirmed',
        })
            .populate('tutor', 'email')
            .populate('student', 'email');
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        for (const session of sessions) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: [session.tutor.email, session.student.email],
                subject: 'Session Reminder',
                text: `Reminder: You have a session scheduled on ${session.date}`,
            };
            yield transporter.sendMail(mailOptions);
        }
    }
    catch (error) {
        console.error('Error sending reminder emails:', error);
    }
});
exports.sendReminderEmails = sendReminderEmails;
const completeSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // ID der Sitzung
    try {
        const session = yield Session_1.default.findById(id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        // Aktualisieren des Sitzungsstatus
        session.status = 'completed';
        yield session.save();
        // Punkte zum Profil hinzufügen
        const profile = yield Profile_1.default.findOne({ userId: session.student });
        if (profile) {
            profile.points += 10; // Beispiel: 10 Punkte pro abgeschlossene Sitzung
            yield profile.save();
        }
        res.json({ message: 'Session completed and points added' });
    }
    catch (error) {
        console.error('Error completing session:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.completeSession = completeSession;
