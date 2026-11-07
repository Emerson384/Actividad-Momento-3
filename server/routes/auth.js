import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

function createSession(user) {
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
}

router.post('/register', async (request, response, next) => {
  try {
    const { name, email, password } = request.body ?? {};
    if (
      typeof name !== 'string' || !name.trim() || name.trim().length > 80 ||
      typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof password !== 'string' || password.length < 8 || password.length > 72
    ) {
      return response.status(400).json({ message: 'Completa nombre, correo y una contraseña de al menos 8 caracteres.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return response.status(409).json({ message: 'Ya existe una cuenta con ese correo.' });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(password, 12),
    });
    return response.status(201).json(createSession(user));
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).json({ message: 'Ya existe una cuenta con ese correo.' });
    }
    return next(error);
  }
});

router.post('/login', async (request, response, next) => {
  try {
    const { email, password } = request.body ?? {};
    if (typeof email !== 'string' || typeof password !== 'string') {
      return response.status(400).json({ message: 'Ingresa un correo y una contraseña válidos.' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return response.status(401).json({ message: 'Correo o contraseña incorrectos.' });
    }
    return response.json(createSession(user));
  } catch (error) {
    return next(error);
  }
});

export default router;
