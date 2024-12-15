import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/User';
import Profile from '../models/Profile';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!, {

  });
  await User.deleteMany({});
  await Profile.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
  await Profile.deleteMany({});
});

describe('Profile Routes', () => {
  it('should create a new profile', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
    await user.save();

    const token = user.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
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
  });

  it('should get a profile', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
    await user.save();

    const profile = new Profile({
      userId: user._id,
      name: 'Test User',
      skills: ['JavaScript', 'Node.js'],
      interests: ['Coding'],
    });
    await profile.save();

    const token = user.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .get('/api/profiles')
      .set('Authorization', `Bearer ${token}`);

    console.log('Response:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test User');
  });

  it('should update a profile', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
    await user.save();

    const profile = new Profile({
      userId: user._id,
      name: 'Test User',
      skills: ['JavaScript', 'Node.js'],
      interests: ['Coding'],
    });
    await profile.save();

    const token = user.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
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
  });

  it('should delete a profile', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
    await user.save();

    const profile = new Profile({
      userId: user._id,
      name: 'Test User',
      skills: ['JavaScript', 'Node.js'],
      interests: ['Coding'],
    });
    await profile.save();

    const token = user.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .delete('/api/profiles')
      .set('Authorization', `Bearer ${token}`);

    console.log('Response:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Profile deleted');
  });

  it('should validate skills and interests length', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
    await user.save();

    const token = user.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .post('/api/profiles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test User',
        skills: ['a'.repeat(49)],
        interests: ['b'.repeat(49)],
      });

    console.log('Response:', res.body);
    expect(res.statusCode).toEqual(201);
  });

  it('should search profiles by skills', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
    await user.save();

    const profile = new Profile({
      userId: user._id,
      name: 'Test User',
      skills: ['JavaScript', 'Node.js'],
      interests: ['Coding'],
    });
    await profile.save();

    const token = user.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .get('/api/profiles/search/skills?skills=JavaScript')
      .set('Authorization', `Bearer ${token}`);

    console.log('Response:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('name', 'Test User');
  });
});
