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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.test' });
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI, {});
    yield User_1.default.deleteMany({});
    yield Profile_1.default.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.deleteMany({});
    yield Profile_1.default.deleteMany({});
}));
describe('Profile Routes', () => {
    it('should create a new profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default({
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
        });
        yield user.save();
        const token = user.generateAuthToken();
        console.log('Generated token:', token);
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/profiles')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'Test User',
            skills: ['JavaScript', 'Node.js'],
            interests: ['Coding'],
        });
        console.log('Response:', res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name', 'Test User');
    }));
    it('should get a profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default({
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
        });
        yield user.save();
        const profile = new Profile_1.default({
            userId: user._id,
            name: 'Test User',
            skills: ['JavaScript', 'Node.js'],
            interests: ['Coding'],
        });
        yield profile.save();
        const token = user.generateAuthToken();
        console.log('Generated token:', token);
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/api/profiles')
            .set('Authorization', `Bearer ${token}`);
        console.log('Response:', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Test User');
    }));
    it('should update a profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default({
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
        });
        yield user.save();
        const profile = new Profile_1.default({
            userId: user._id,
            name: 'Test User',
            skills: ['JavaScript', 'Node.js'],
            interests: ['Coding'],
        });
        yield profile.save();
        const token = user.generateAuthToken();
        console.log('Generated token:', token);
        const res = yield (0, supertest_1.default)(app_1.default)
            .put('/api/profiles')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'Updated User',
            skills: ['Python'],
            interests: ['Machine Learning'],
        });
        console.log('Response:', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Updated User');
    }));
    it('should delete a profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default({
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
        });
        yield user.save();
        const profile = new Profile_1.default({
            userId: user._id,
            name: 'Test User',
            skills: ['JavaScript', 'Node.js'],
            interests: ['Coding'],
        });
        yield profile.save();
        const token = user.generateAuthToken();
        console.log('Generated token:', token);
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/api/profiles')
            .set('Authorization', `Bearer ${token}`);
        console.log('Response:', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Profile deleted');
    }));
    it('should validate skills and interests length', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default({
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
        });
        yield user.save();
        const token = user.generateAuthToken();
        console.log('Generated token:', token);
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/profiles')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'Test User',
            skills: ['a'.repeat(49)],
            interests: ['b'.repeat(49)],
        });
        console.log('Response:', res.body);
        expect(res.statusCode).toEqual(201);
    }));
    it('should search profiles by skills', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_1.default({
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
        });
        yield user.save();
        const profile = new Profile_1.default({
            userId: user._id,
            name: 'Test User',
            skills: ['JavaScript', 'Node.js'],
            interests: ['Coding'],
        });
        yield profile.save();
        const token = user.generateAuthToken();
        console.log('Generated token:', token);
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/api/profiles/search?skills=JavaScript')
            .set('Authorization', `Bearer ${token}`);
        console.log('Response:', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toHaveProperty('name', 'Test User');
    }));
});
