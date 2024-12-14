"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({
    tutor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    datetime: { type: Date, required: true },
    status: { type: String, required: true },
});
const Session = (0, mongoose_1.model)('Session', SessionSchema);
exports.default = Session;
