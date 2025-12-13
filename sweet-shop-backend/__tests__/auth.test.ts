import request from 'supertest';
import app, {AppDataSource} from '../src/index';
import {User} from '../src/entities/User';

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Auth', () => {
  test('register and login', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const r = await request(app).post('/api/auth/register').send({email, password});
    expect(r.status).toBe(201);
    const l = await request(app).post('/api/auth/login').send({email, password});
    expect(l.status).toBe(200);
    expect(l.body.token).toBeDefined();
  });
});
