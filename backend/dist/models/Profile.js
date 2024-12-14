"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    skills: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.every((skill) => skill.length <= 50);
            },
            message: (props) => `${props.value} exceeds the maximum allowed length (50)`,
        },
    },
    interests: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.every((interest) => interest.length <= 50);
            },
            message: (props) => `${props.value} exceeds the maximum allowed length (50)`,
        },
    },
    points: { type: Number, default: 0 }, // Neues Feld für Punkte
});
const Profile = (0, mongoose_1.model)('Profile', profileSchema);
exports.default = Profile;
