import { Router } from 'express';
import Solution from '../models/Solution.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (_request, response, next) => {
  try {
    const solutions = await Solution.find().sort({ createdAt: -1 });
    return response.json(solutions);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const { titulo, categoria, descripcion } = request.body ?? {};
    if (
      typeof titulo !== 'string' || !titulo.trim() || titulo.trim().length > 100 ||
      typeof categoria !== 'string' || !categoria.trim() || categoria.trim().length > 60 ||
      typeof descripcion !== 'string' || !descripcion.trim() || descripcion.trim().length > 500
    ) {
      return response.status(400).json({ message: 'Completa título, categoría y descripción.' });
    }
    const solution = await Solution.create({
      titulo: titulo.trim(),
      categoria: categoria.trim(),
      descripcion: descripcion.trim(),
    });
    return response.status(201).json(solution);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (request, response, next) => {
  try {
    const deleted = await Solution.findByIdAndDelete(request.params.id);
    if (!deleted) return response.status(404).json({ message: 'No se encontró esa solución.' });
    return response.status(204).end();
  } catch (error) {
    if (error.name === 'CastError') {
      return response.status(400).json({ message: 'El identificador de la solución no es válido.' });
    }
    return next(error);
  }
});

export default router;
