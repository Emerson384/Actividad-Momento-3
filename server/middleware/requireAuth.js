import jwt from 'jsonwebtoken';

export default function requireAuth(request, response, next) {
  const authorization = request.get('authorization');
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;

  if (!token) {
    return response.status(401).json({ message: 'Inicia sesión para continuar.' });
  }

  try {
    request.userId = jwt.verify(token, process.env.JWT_SECRET).sub;
    return next();
  } catch {
    return response.status(401).json({ message: 'La sesión expiró. Inicia sesión de nuevo.' });
  }
}
