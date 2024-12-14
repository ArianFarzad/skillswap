"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
});
userSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
