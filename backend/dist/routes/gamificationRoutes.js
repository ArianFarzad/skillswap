"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamificationController_1 = require("../controllers/gamificationController");
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
router.put('/points', jwt_1.verifyToken, gamificationController_1.addPoints);
router.get('/points', jwt_1.verifyToken, gamificationController_1.getPoints);
exports.default = router;
