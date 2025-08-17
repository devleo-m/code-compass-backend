import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Importa utilitários
import { successResponse } from './utils/response';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Importa rotas
import { healthRoutes } from './http/routers';

// Carrega variáveis de ambiente
dotenv.config();

// Cria a aplicação Express
const app = express();

// ===== MIDDLEWARES BÁSICOS =====
app.use(helmet()); // Segurança
app.use(cors()); // CORS
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL encoded

// ===== ROTAS =====

// Rota principal
app.get('/', (req, res) => {
  successResponse(res, 'Code Compass Backend está funcionando!', {
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Health routes
app.use('/app', healthRoutes);

// ===== TRATAMENTO DE ERROS =====
app.use(notFoundHandler); // 404
app.use(errorHandler); // Outros erros

export { app };
