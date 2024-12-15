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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.test' });
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI, {});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.deleteMany({});
}));
describe('Auth Routes', () => {
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = `test${Date.now()}@example.com`;
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email,
            password: 'password123',
            name: 'Test User',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    }), 10000); // Timeout von 10 Sekunden
    it('should not register a user with an existing email', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = `test${Date.now()}@example.com`;
        yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email,
            password: 'password123',
            name: 'Test User',
        });
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email,
            password: 'password123',
            name: 'Test User',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Email already exists');
    }), 10000); // Timeout von 10 Sekunden
    it('should login a user with correct credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = `test${Date.now()}@example.com`;
        yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email,
            password: 'password123',
            name: 'Test User',
        });
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
            email,
            password: 'password123',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    }), 10000); // Timeout von 10 Sekunden
    it('should not login a user with incorrect credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = `test${Date.now()}@example.com`;
        yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email,
            password: 'password123',
            name: 'Test User',
        });
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
            email,
            password: 'wrongpassword',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Invalid credentials');
    }), 10000); // Timeout von 10 Sekunden
});
