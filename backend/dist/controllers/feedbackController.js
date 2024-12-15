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
exports.getAverageRatingForUser = exports.getFeedbackForSession = exports.createFeedback = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback"));
const createFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId, userId, rating, comment } = req.body;
    try {
        const feedback = new Feedback_1.default({ sessionId, userId, rating, comment });
        yield feedback.save();
        res.status(201).json(feedback);
    }
    catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.createFeedback = createFeedback;
const getFeedbackForSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.params;
    try {
        const feedback = yield Feedback_1.default.find({ sessionId }).populate('userId', 'name');
        res.json(feedback);
    }
    catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getFeedbackForSession = getFeedbackForSession;
const getAverageRatingForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const feedback = yield Feedback_1.default.find({ userId });
        const averageRating = feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length;
        res.json({ averageRating });
    }
    catch (error) {
        console.error('Error fetching average rating:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getAverageRatingForUser = getAverageRatingForUser;
