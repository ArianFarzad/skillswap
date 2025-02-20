import request from 'supertest';
import app from '../app';
import User, { IUser } from '../models/User';
import Profile, { IProfile } from '../models/Profile';
import { env } from '../config/config';
import { setupTestDB } from './testSetup';

setupTestDB('.env.test');

describe('Profile Routes', () => {
  it('should create a new profile', async () => {
    const { token } = await createTestUserWithProfile({}, {});

    const res = await request(app)
      .post('/api/profiles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test User',
        skills: ['JavaScript', 'Node.js'],
        interests: ['Coding'],
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test User');
  });

  it('should get a profile', async () => {
    const { token } = await createTestUserWithProfile({}, {});

    const res = await request(app)
      .get('/api/profiles')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test User');
  });

  it('should update a profile', async () => {
    const { token } = await createTestUserWithProfile({}, {});

    const res = await request(app)
      .put('/api/profiles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated User',
        skills: ['Python'],
        interests: ['Machine Learning'],
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated User');
  });

  it('should delete a profile', async () => {
    const { token } = await createTestUserWithProfile({}, {});

    const res = await request(app)
      .delete('/api/profiles')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Profile deleted');
  });

  it('should validate skills and interests length', async () => {
    const { token } = await createTestUserWithProfile({}, {});

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
    const { token } = await createTestUserWithProfile({}, {});

    // need a second user because the own user is excluded from search results
    const additionalProfile = await createTestUserWithProfile(
      { email: 'another@example.com', name: 'Another User' },
      { skills: ['JavaScript', 'React'], interests: ['Coding'] }
    );

    const skillToFilter = additionalProfile?.profile?.skills[1];

    const res = await request(app)
      .get(`/api/profiles/search?keyword=${skillToFilter}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('name', 'Another User');
  });
});

export const createTestUserWithProfile = async (
  userData: Partial<IUser>,
  profileData: Partial<IProfile>
) => {
  const user = new User({
    email: userData.email || 'test@example.com',
    password: userData.password || 'password123',
    name: userData.name || 'Test User',
  });
  await user.save();

  const token = user.generateAuthToken(env.JWT_SECRET);

  let profile;
  if (profileData) {
    profile = new Profile({
      userId: user._id,
      name: profileData.name || user.name,
      skills: profileData.skills || ['JavaScript', 'Node.js'],
      interests: profileData.interests || ['Coding'],
    });
    await profile.save();
  }

  return { user, token, profile };
};
