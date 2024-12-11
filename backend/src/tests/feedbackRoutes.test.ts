import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/User';
import Session from '../models/Session';
import Feedback from '../models/Feedback';
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
  await Session.deleteMany({});
  await Feedback.deleteMany({});
});

describe('Feedback Routes', () => {
  it('should create feedback for a session', async () => {
    const emailTutor = `tutor${Date.now()}@example.com`;
    const emailStudent = `student${Date.now()}@example.com`;

    const tutor = new User({
      email: emailTutor,
      password: 'password123',
      name: 'Tutor',
    });
    await tutor.save();

    const student = new User({
      email: emailStudent,
      password: 'password123',
      name: 'Student',
    });
    await student.save();

    const session = new Session({
      tutor: tutor._id,
      student: student._id,
      date: new Date(),
    });
    await session.save();

    const token = student.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .post('/api/feedback')
      .set('Authorization', `Bearer ${token}`)
      .send({
        sessionId: session._id,
        userId: student._id,
        rating: 5,
        comment: 'Great session!',
      });

    console.log('Response:', res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('rating', 5);
    expect(res.body).toHaveProperty('comment', 'Great session!');
  });

  it('should get feedback for a session', async () => {
    const emailTutor = `tutor${Date.now()}@example.com`;
    const emailStudent = `student${Date.now()}@example.com`;

    const tutor = new User({
      email: emailTutor,
      password: 'password123',
      name: 'Tutor',
    });
    await tutor.save();

    const student = new User({
      email: emailStudent,
      password: 'password123',
      name: 'Student',
    });
    await student.save();

    const session = new Session({
      tutor: tutor._id,
      student: student._id,
      date: new Date(),
    });
    await session.save();

    const feedback = new Feedback({
      sessionId: session._id,
      userId: student._id,
      rating: 5,
      comment: 'Great session!',
    });
    await feedback.save();

    const token = student.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .get(`/api/feedback/session/${session._id}`)
      .set('Authorization', `Bearer ${token}`);

    console.log('Response:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('rating', 5);
    expect(res.body[0]).toHaveProperty('comment', 'Great session!');
  });

  it('should get average rating for a user', async () => {
    const emailTutor = `tutor${Date.now()}@example.com`;
    const emailStudent = `student${Date.now()}@example.com`;

    const tutor = new User({
      email: emailTutor,
      password: 'password123',
      name: 'Tutor',
    });
    await tutor.save();

    const student = new User({
      email: emailStudent,
      password: 'password123',
      name: 'Student',
    });
    await student.save();

    const session1 = new Session({
      tutor: tutor._id,
      student: student._id,
      date: new Date(),
    });
    await session1.save();

    const session2 = new Session({
      tutor: tutor._id,
      student: student._id,
      date: new Date(),
    });
    await session2.save();

    const feedback1 = new Feedback({
      sessionId: session1._id,
      userId: student._id,
      rating: 5,
      comment: 'Great session!',
    });
    await feedback1.save();

    const feedback2 = new Feedback({
      sessionId: session2._id,
      userId: student._id,
      rating: 4,
      comment: 'Good session!',
    });
    await feedback2.save();

    const token = student.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .get(`/api/feedback/user/${student._id}/average-rating`)
      .set('Authorization', `Bearer ${token}`);

    console.log('Response:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('averageRating', 4.5);
  });
});
