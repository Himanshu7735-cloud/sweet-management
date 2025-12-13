import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import {DataSource} from 'typeorm';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import sweetsRouter from './routes/sweets';
import {User} from './entities/User';
import {Sweet} from './entities/Sweet';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  logging: false,
  entities: [User, Sweet]
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/sweets', sweetsRouter);

const port = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(async () => {
    // Seed initial data
    const sweetRepo = AppDataSource.getRepository(Sweet);
    const existing = await sweetRepo.find();
    if (existing.length === 0) {
      const sweets = [
        { name: 'Chocolate Cake', category: 'Cake', price: 15.99, quantity: 10, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
        { name: 'Vanilla Ice Cream', category: 'Ice Cream', price: 5.99, quantity: 20, image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400' },
        { name: 'Strawberry Cheesecake', category: 'Cake', price: 12.99, quantity: 8, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400' },
        { name: 'Mint Chocolate Chip', category: 'Ice Cream', price: 6.99, quantity: 15, image: 'https://images.unsplash.com/photo-1563805042-6e9e0f7e0c3d?w=400' },
        { name: 'Blueberry Muffins', category: 'Pastry', price: 4.99, quantity: 25, image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400' },
        { name: 'Caramel Popcorn', category: 'Snack', price: 3.99, quantity: 30, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
      ];
      for (const s of sweets) {
        const sweet = Sweet.create(s);
        await sweet.save();
      }
      console.log('Seeded initial sweets');
    }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error('Error during Data Source initialization', err));

export default app;
