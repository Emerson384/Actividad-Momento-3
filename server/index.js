import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import solutionRoutes from './routes/solutions.js';
import Solution from './models/Solution.js';

const app = express();
const port = Number(process.env.PORT) || 3001;
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',');

app.use(cors({ origin: allowedOrigins.map((origin) => origin.trim()) }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/solutions', solutionRoutes);

app.use((error, _request, response, _next) => {
  const status = error.status >= 400 && error.status < 500 ? error.status : 500;
  if (status === 500) console.error(error);
  return response.status(status).json({
    message: status === 500 ? 'Error interno del servidor.' : 'La solicitud no tiene un formato válido.',
  });
});

const initialSolutions = [
  { titulo: 'Visibilidad Total', categoria: 'Monitoreo', descripcion: 'Centraliza procesos, prioridades y métricas para que cada equipo comprenda el estado real del negocio.' },
  { titulo: 'Automatización con Propósito', categoria: 'Automatización', descripcion: 'Reduce tareas repetitivas con reglas inteligentes que mantienen la ejecución constante.' },
  { titulo: 'Análisis Accionable', categoria: 'Analítica', descripcion: 'Transforma indicadores en decisiones claras con reportes visuales diseñados para líderes.' },
  { titulo: 'Integración de Datos', categoria: 'Infraestructura', descripcion: 'Conecta tus herramientas actuales sin fricción en una sola plataforma unificada.' },
];

async function startServer() {
  if (!process.env.MONGODB_URI) throw new Error('Configura MONGODB_URI antes de iniciar el servidor.');
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('Configura JWT_SECRET con al menos 32 caracteres antes de iniciar el servidor.');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  if (await Solution.countDocuments() === 0) {
    await Solution.insertMany(initialSolutions);
  }
  app.listen(port, () => console.log(`API lista en http://localhost:${port}`));
}

startServer().catch((error) => {
  console.error('No se pudo iniciar la API:', error.message);
  process.exitCode = 1;
});
