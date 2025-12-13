import {Router} from 'express';
import {Sweet} from '../entities/Sweet';
import {authenticate, requireAdmin, AuthRequest} from '../middleware/auth';

const router = Router();

router.post('/', authenticate, async (req: AuthRequest, res) => {
  const {name, category, price, quantity, image} = req.body;
  if (!name || !category || price == null || quantity == null) return res.status(400).json({message: 'Missing fields'});
  const existing = await Sweet.findOneBy({name});
  if (existing) return res.status(400).json({message: 'Sweet already exists'});
  const sweet = Sweet.create({name, category, price, quantity, image});
  await sweet.save();
  res.status(201).json(sweet);
});

router.get('/', authenticate, async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
});

router.get('/search', authenticate, async (req, res) => {
  const {name, category, minPrice, maxPrice} = req.query as any;
  const qb = Sweet.createQueryBuilder('sweet');
  if (name) qb.andWhere('sweet.name LIKE :name', {name: `%${name}%`});
  if (category) qb.andWhere('sweet.category = :category', {category});
  if (minPrice) qb.andWhere('sweet.price >= :min', {min: Number(minPrice)});
  if (maxPrice) qb.andWhere('sweet.price <= :max', {max: Number(maxPrice)});
  const results = await qb.getMany();
  res.json(results);
});

router.get('/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const sweet = await Sweet.findOneBy({id});
  if (!sweet) return res.status(404).json({message: 'Not found'});
  res.json(sweet);
});

router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  const id = req.params.id;
  const sweet = await Sweet.findOneBy({id});
  if (!sweet) return res.status(404).json({message: 'Not found'});
  const {name, category, price, quantity, image} = req.body;
  if (name) sweet.name = name;
  if (category) sweet.category = category;
  if (price != null) sweet.price = price;
  if (quantity != null) sweet.quantity = quantity;
  if (image) sweet.image = image;
  await sweet.save();
  res.json(sweet);
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  const id = req.params.id;
  const sweet = await Sweet.findOneBy({id});
  if (!sweet) return res.status(404).json({message: 'Not found'});
  await sweet.remove();
  res.json({message: 'Deleted'});
});

router.post('/:id/purchase', authenticate, async (req: AuthRequest, res) => {
  const id = req.params.id;
  const sweet = await Sweet.findOneBy({id});
  if (!sweet) return res.status(404).json({message: 'Not found'});
  if (sweet.quantity <= 0) return res.status(400).json({message: 'Out of stock'});
  sweet.quantity -= 1;
  await sweet.save();
  res.json(sweet);
});

router.post('/:id/restock', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  const id = req.params.id;
  const {amount} = req.body;
  const sweet = await Sweet.findOneBy({id});
  if (!sweet) return res.status(404).json({message: 'Not found'});
  if (!amount || amount <= 0) return res.status(400).json({message: 'Invalid amount'});
  sweet.quantity += Number(amount);
  await sweet.save();
  res.json(sweet);
});

export default router;
