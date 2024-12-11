import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const email = `test${Date.now()}@example.com`;
    const res = await request(app).post('/api/auth/register').send({
      email,
      password: 'password123',
      name: 'Test User',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  }, 10000); // Timeout von 10 Sekunden

  it('should not register a user with an existing email', async () => {
    const email = `test${Date.now()}@example.com`;
    await request(app).post('/api/auth/register').send({
      email,
      password: 'password123',
      name: 'Test User',
    });

    const res = await request(app).post('/api/auth/register').send({
      email,
      password: 'password123',
      name: 'Test User',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Email already exists');
  }, 10000); // Timeout von 10 Sekunden

  it('should login a user with correct credentials', async () => {
    const email = `test${Date.now()}@example.com`;
    await request(app).post('/api/auth/register').send({
      email,
      password: 'password123',
      name: 'Test User',
    });

    const res = await request(app).post('/api/auth/login').send({
      email,
      password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  }, 10000); // Timeout von 10 Sekunden

  it('should not login a user with incorrect credentials', async () => {
    const email = `test${Date.now()}@example.com`;
    await request(app).post('/api/auth/register').send({
      email,
      password: 'password123',
      name: 'Test User',
    });

    const res = await request(app).post('/api/auth/login').send({
      email,
      password: 'wrongpassword',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  }, 10000); // Timeout von 10 Sekunden
});
