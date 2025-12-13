import request from 'supertest';
import app, {AppDataSource} from '../src/index';

let token: string;

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);
  await request(app).post('/api/auth/register').send({email: 'admin@a.com', password: 'pass', isAdmin: true});
  const res = await request(app).post('/api/auth/login').send({email: 'admin@a.com', password: 'pass'});
  token = res.body.token;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Sweets', () => {
  test('create, get, search, purchase, restock, update, delete', async () => {
    const create = await request(app).post('/api/sweets').set('Authorization', `Bearer ${token}`).send({name: 'Candy', category: 'Chocolates', price: 1.5, quantity: 10});
    expect(create.status).toBe(201);
    const list = await request(app).get('/api/sweets').set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    const search = await request(app).get('/api/sweets/search').query({name: 'Can'}).set('Authorization', `Bearer ${token}`);
    expect(search.body.length).toBeGreaterThan(0);
    const id = create.body.id;
    const purchase = await request(app).post(`/api/sweets/${id}/purchase`).set('Authorization', `Bearer ${token}`);
    expect(purchase.status).toBe(200);
    const restock = await request(app).post(`/api/sweets/${id}/restock`).set('Authorization', `Bearer ${token}`).send({amount: 5});
    expect(restock.status).toBe(200);
    const update = await request(app).put(`/api/sweets/${id}`).set('Authorization', `Bearer ${token}`).send({price: 2});
    expect(update.status).toBe(200);
    const del = await request(app).delete(`/api/sweets/${id}`).set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(200);
  });
});
