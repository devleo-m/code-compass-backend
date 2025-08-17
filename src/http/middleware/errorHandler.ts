import type { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../../utils/errors';
import { errorResponse } from '../../utils/response';

// Middleware para tratar erros
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Erro capturado:', error);

  // Se for um erro da nossa aplicação
  if (error instanceof AppError) {
    // Se for erro de validação, inclui os detalhes
    if (error instanceof ValidationError) {
      errorResponse(res, error.message, error.statusCode, error.code, error.errors);
      return;
    }

    // Outros erros da aplicação
    errorResponse(res, error.message, error.statusCode, error.code);
    return;
  }

  // Erro não tratado - erro interno
  errorResponse(res, 'Erro interno do servidor', 500, 'INTERNAL_SERVER_ERROR');
};

// Middleware para rota não encontrada
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  errorResponse(
    res,
    `Rota ${req.method} ${req.originalUrl} não encontrada`,
    404,
    'ROUTE_NOT_FOUND'
  );
};