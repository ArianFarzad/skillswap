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
exports.searchProfilesByInterests = exports.searchProfilesBySkills = exports.removeInterest = exports.addInterest = exports.removeSkill = exports.addSkill = exports.getProfileById = exports.searchProfiles = exports.deleteProfile = exports.updateProfile = exports.getAllProfiles = exports.getMyProfile = exports.createProfile = void 0;
const Profile_1 = __importDefault(require("../models/Profile"));
const mongoose_1 = __importDefault(require("mongoose"));
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, skills, interests } = req.body;
    try {
        console.log('Creating profile for user:', req.user.userId);
        const profile = new Profile_1.default({
            userId: req.user.userId,
            name,
            skills,
            interests,
        });
        yield profile.save();
        console.log('Profile created successfully:', profile);
        res.status(201).json(profile);
    }
    catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.createProfile = createProfile;
const getMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            console.warn('Unauthorized access attempt');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('Fetching profile for user:', req.user.userId);
        const profile = yield Profile_1.default.findOne({ userId: req.user.userId });
        if (!profile) {
            console.warn('Profile not found for user:', req.user.userId);
            return res.status(404).json({ error: 'Profile not found' });
        }
        console.log('Profile fetched successfully:', profile);
        res.json(profile);
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getMyProfile = getMyProfile;
const getAllProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching all profiles');
        const profiles = yield Profile_1.default.find();
        console.log('Profiles fetched successfully:', profiles);
        res.json(profiles);
    }
    catch (error) {
        console.error('Error fetching all profiles:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getAllProfiles = getAllProfiles;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, skills, interests, addSkill, removeSkill } = req.body;
    try {
        if (!req.user) {
            console.warn('Unauthorized access attempt');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('Updating profile for user:', req.user.userId);
        const updateFields = {};
        if (name)
            updateFields.name = name;
        if (skills)
            updateFields.skills = skills;
        if (interests)
            updateFields.interests = interests;
        if (addSkill)
            updateFields.$push = { skills: addSkill };
        if (removeSkill)
            updateFields.$pull = { skills: removeSkill };
        const profile = yield Profile_1.default.findOneAndUpdate({ userId: req.user.userId }, updateFields, { new: true });
        if (!profile) {
            console.warn('Profile not found for user:', req.user.userId);
            return res.status(404).json({ error: 'Profile not found' });
        }
        console.log('Profile updated successfully:', profile);
        res.json(profile);
    }
    catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            console.warn('Unauthorized access attempt');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('Deleting profile for user:', req.user.userId);
        const profile = yield Profile_1.default.findOneAndDelete({ userId: req.user.userId });
        if (!profile) {
            console.warn('Profile not found for user:', req.user.userId);
            return res.status(404).json({ error: 'Profile not found' });
        }
        console.log('Profile deleted successfully:', profile);
        res.json({ message: 'Profile deleted' });
    }
    catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.deleteProfile = deleteProfile;
const searchProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skills } = req.query;
    try {
        console.log('Searching profiles with skills:', skills);
        const skillsArray = Array.isArray(skills) ? skills : [skills];
        const stringSkillsArray = skillsArray.filter((skill) => typeof skill === 'string');
        const profiles = yield Profile_1.default.find({
            skills: { $in: stringSkillsArray },
        });
        console.log('Profiles found:', profiles);
        res.json(profiles);
    }
    catch (error) {
        console.error('Error searching profiles:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.searchProfiles = searchProfiles;
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    console.log('Eingehende Anfrage für Profil mit userId:', userId);
    try {
        // Überprüfen, ob die userId ein gültiges ObjectId-Format hat
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            console.warn('Ungültiges userId-Format:', userId);
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        // Konvertieren der userId in ein ObjectId
        const objectId = new mongoose_1.default.Types.ObjectId(userId);
        console.log('Konvertierte userId zu ObjectId:', objectId);
        // Suchen des Profils
        const profile = yield Profile_1.default.findOne({ userId: objectId });
        if (!profile) {
            console.warn('Kein Profil gefunden für userId:', userId);
            return res.status(404).json({ error: 'Profile not found' });
        }
        console.log('Profil gefunden:', profile);
        // Optional: Feedback zum Profil abrufen
        // const feedback = await Feedback.find({ userId: objectId });
        // console.log('Feedback gefunden:', feedback);
        res.json({ profile, feedback: [] });
    }
    catch (error) {
        console.error('Fehler beim Abrufen des Profils für userId:', userId, error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getProfileById = getProfileById;
const addSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skill } = req.body;
    try {
        if (!req.user) {
            console.warn('Unauthorized access attempt');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('Adding skill for user:', req.user.userId, 'Skill:', skill);
        const profile = yield Profile_1.default.findOneAndUpdate({ userId: req.user.userId }, { $push: { skills: skill } }, { new: true });
        console.log('Skill added successfully:', profile);
        res.json(profile);
    }
    catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.addSkill = addSkill;
const removeSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skill } = req.body;
    try {
        if (!req.user) {
            console.warn('Unauthorized access attempt');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('Removing skill for user:', req.user.userId, 'Skill:', skill);
        const profile = yield Profile_1.default.findOneAndUpdate({ userId: req.user.userId }, { $pull: { skills: skill } }, { new: true });
        console.log('Skill removed successfully:', profile);
        res.json(profile);
    }
    catch (error) {
        console.error('Error removing skill:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.removeSkill = removeSkill;
const addInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { interest } = req.body;
    try {
        if (!req.user) {
            console.warn('Unauthorized access attempt');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('Adding interest for user:', req.user.userId, 'Interest:', interest);
        const profile = yield Profile_1.default.findOneAndUpdate({ userId: req.user.userId }, { $push: { interests: interest } }, { new: true });
        console.log('Interest added successfully:', profile);
        res.json(profile);
    }
    catch (error) {
        console.error('Error adding interest:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.addInterest = addInterest;
const removeInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { interest } = req.body;
    try {
        if (!req.user) {
            console.warn('Unauthorized access attempt');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('Removing interest for user:', req.user.userId, 'Interest:', interest);
        const profile = yield Profile_1.default.findOneAndUpdate({ userId: req.user.userId }, { $pull: { interests: interest } }, { new: true });
        console.log('Interest removed successfully:', profile);
        res.json(profile);
    }
    catch (error) {
        console.error('Error removing interest:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.removeInterest = removeInterest;
const searchProfilesBySkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skills } = req.query;
    try {
        console.log('Searching profiles with skills:', skills);
        const skillsArray = Array.isArray(skills) ? skills : [skills];
        const stringSkillsArray = skillsArray.filter((skill) => typeof skill === 'string');
        const profiles = yield Profile_1.default.find({
            skills: { $in: stringSkillsArray },
        });
        console.log('Profiles found:', profiles);
        res.json(profiles);
    }
    catch (error) {
        console.error('Error searching profiles by skills:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.searchProfilesBySkills = searchProfilesBySkills;
const searchProfilesByInterests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { interests } = req.query;
    try {
        console.log('Searching profiles with interests:', interests);
        const interestsArray = Array.isArray(interests) ? interests : [interests];
        const stringInterestsArray = interestsArray.filter((interest) => typeof interest === 'string');
        const profiles = yield Profile_1.default.find({
            interests: { $in: stringInterestsArray },
        });
        console.log('Profiles found:', profiles);
        res.json(profiles);
    }
    catch (error) {
        console.error('Error searching profiles by interests:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.searchProfilesByInterests = searchProfilesByInterests;
