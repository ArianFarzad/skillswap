import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/User';
import Session from '../models/Session';
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
});

describe('Session Routes', () => {
  it('should create a new session', async () => {
    const emailTutor = `tutor${Date.now()}@example.com`;
    const emailStudent = `student${Date.now()}@example.com`;

    const tutor = new User({ email: emailTutor, password: 'password123', name: 'Tutor' });
    await tutor.save();

    const student = new User({ email: emailStudent, password: 'password123', name: 'Student' });
    await student.save();

    const token = tutor.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .post('/api/sessions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tutor: tutor._id,
        student: student._id,
        date: new Date()
      });

    console.log('Response:', res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('tutor', tutor._id.toString());
    expect(res.body).toHaveProperty('student', student._id.toString());
  });

  it('should get all sessions', async () => {
    const emailTutor = `tutor${Date.now()}@example.com`;
    const emailStudent = `student${Date.now()}@example.com`;

    const tutor = new User({ email: emailTutor, password: 'password123', name: 'Tutor' });
    await tutor.save();

    const student = new User({ email: emailStudent, password: 'password123', name: 'Student' });
    await student.save();

    const session1 = new Session({ tutor: tutor._id, student: student._id, date: new Date() });
    await session1.save();

    const session2 = new Session({ tutor: tutor._id, student: student._id, date: new Date() });
    await session2.save();

    const token = tutor.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .get('/api/sessions')
      .set('Authorization', `Bearer ${token}`);

    console.log('Response:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
    
    expect(res.body[0].student).not.toBeNull();
  });

  it('should update a session', async () => {
    const emailTutor = `tutor${Date.now()}@example.com`;
    const emailStudent = `student${Date.now()}@example.com`;

    const tutor = new User({ email: emailTutor, password: 'password123', name: 'Tutor' });
    await tutor.save();

    const student = new User({ email: emailStudent, password: 'password123', name: 'Student' });
    await student.save();

    const session = new Session({ tutor: tutor._id, student: student._id, date: new Date() });
    await session.save();

    const token = tutor.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .put(`/api/sessions/${session._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'confirmed'
      });

    console.log('Response:', res.body);
    
   
  });

  it('should delete a session', async () => {
    const emailTutor = `tutor${Date.now()}@example.com`;
    const emailStudent = `student${Date.now()}@example.com`;

    const tutor = new User({ email: emailTutor, password: 'password123', name: 'Tutor' });
    await tutor.save();

    const student = new User({ email: emailStudent, password: 'password123', name: 'Student' });
    await student.save();

    const session = new Session({ tutor: tutor._id, student: student._id, date: new Date() });
    await session.save();

    const token = tutor.generateAuthToken();
    console.log('Generated token:', token);

    const res = await request(app)
      .delete(`/api/sessions/${session._id}`)
      .set('Authorization', `Bearer ${token}`);

    console.log('Response:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Session deleted');
  });
});