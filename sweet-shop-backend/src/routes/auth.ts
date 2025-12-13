import {Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../entities/User';

const router = Router();

router.post('/register', async (req, res) => {
  console.log('Register called', req.body);
  const {email, password, isAdmin} = req.body;
  if (!email || !password) return res.status(400).json({message: 'Email and password required'});
  const existing = await User.findOneBy({email});
  if (existing) return res.status(400).json({message: 'User already exists'});
  const hash = await bcrypt.hash(password, 10);
  const user = User.create({email, password: hash, isAdmin: !!isAdmin});
  await user.save();
  res.status(201).json({id: user.id, email: user.email});
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) return res.status(400).json({message: 'Email and password required'});
  const user = await User.findOneBy({email});
  if (!user) return res.status(400).json({message: 'Invalid credentials'});
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({message: 'Invalid credentials'});
  const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.JWT_SECRET || 'secret', {expiresIn: '1h'});
  res.json({token});
});

export default router;
