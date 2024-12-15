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
exports.getPoints = exports.addPoints = void 0;
const Profile_1 = __importDefault(require("../models/Profile"));
const addPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, points } = req.body;
    try {
        const profile = yield Profile_1.default.findOneAndUpdate({ userId }, { $inc: { points } }, { new: true });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json({ points: profile.points });
    }
    catch (error) {
        console.error('Error adding points:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.addPoints = addPoints;
const getPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const profile = yield Profile_1.default.findOne({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json({ points: profile.points });
    }
    catch (error) {
        console.error('Error fetching points:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getPoints = getPoints;
