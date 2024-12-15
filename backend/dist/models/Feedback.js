"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FeedbackSchema = new mongoose_1.Schema({
    sessionId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Session', required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, required: true }, // Fügen Sie das rating-Feld hinzu
});
const Feedback = (0, mongoose_1.model)('Feedback', FeedbackSchema);
exports.default = Feedback;
