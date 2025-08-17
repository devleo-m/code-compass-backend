import type { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { config } from '../config/environment';

// Interface para erros customizados
export interface CustomError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
  field?: string;
  value?: any;
}

// Classe base para erros da aplicação
export class AppError extends Error implements CustomError {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code?: string;
  public readonly field?: string;
  public readonly value?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    code?: string,
    field?: string,
    value?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.field = field;
    this.value = value;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Função para determinar se o erro é operacional
const isOperationalError = (error: CustomError): boolean => {
  return error.isOperational || false;
};

// Função para formatar erros de validação do Sequelize
const handleSequelizeValidationError = (error: any): AppError => {
  const errors = error.errors?.map((err: any) => ({
    field: err.path,
    message: err.message,
    value: err.value,
  }));

  return new AppError(
    'Dados de entrada inválidos',
    400,
    true,
    'VALIDATION_ERROR',
    undefined,
    errors
  );
};

// Função para formatar erros de chave única do Sequelize
const handleSequelizeUniqueConstraintError = (error: any): AppError => {
  const field = error.errors?.[0]?.path || 'field';
  const value = error.errors?.[0]?.value;
  
  return new AppError(
    `${field} já está em uso`,
    409,
    true,
    'UNIQUE_CONSTRAINT_ERROR',
    field,
    value
  );
};

// Função para formatar erros de chave estrangeira do Sequelize
const handleSequelizeForeignKeyConstraintError = (error: any): AppError => {
  return new AppError(
    'Referência inválida a registro relacionado',
    400,
    true,
    'FOREIGN_KEY_CONSTRAINT_ERROR'
  );
};

// Função para formatar erros JWT
const handleJWTError = (): AppError => {
  return new AppError(
    'Token de autenticação inválido',
    401,
    true,
    'INVALID_JWT_TOKEN'
  );
};

// Função para formatar erros de JWT expirado
const handleJWTExpiredError = (): AppError => {
  return new AppError(
    'Token de autenticação expirado',
    401,
    true,
    'EXPIRED_JWT_TOKEN'
  );
};

// Função para formatar erros de validação do Zod
const handleZodError = (error: any): AppError => {
  const errors = error.issues?.map((issue: any) => ({
    field: issue.path.join('.'),
    message: issue.message,
    value: issue.received,
  }));

  return new AppError(
    'Dados de entrada inválidos',
    400,
    true,
    'VALIDATION_ERROR',
    undefined,
    errors
  );
};

// Função principal para formatar erros
const formatError = (error: CustomError): CustomError => {
  let formattedError = error;

  // Erros do Sequelize
  if (error.name === 'SequelizeValidationError') {
    formattedError = handleSequelizeValidationError(error);
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    formattedError = handleSequelizeUniqueConstraintError(error);
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    formattedError = handleSequelizeForeignKeyConstraintError(error);
  }
  // Erros JWT
  else if (error.name === 'JsonWebTokenError') {
    formattedError = handleJWTError();
  } else if (error.name === 'TokenExpiredError') {
    formattedError = handleJWTExpiredError();
  }
  // Erros Zod
  else if (error.name === 'ZodError') {
    formattedError = handleZodError(error);
  }

  return formattedError;
};

// Função para enviar resposta de erro
const sendErrorResponse = (
  error: CustomError,
  req: Request,
  res: Response
): void => {
  const { statusCode = 500, message, code, field, value } = error;

  // Estrutura base da resposta
  const errorResponse: any = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
  };

  // Adiciona código do erro se disponível
  if (code) {
    errorResponse.code = code;
  }

  // Adiciona detalhes específicos do campo se disponível
  if (field) {
    errorResponse.field = field;
  }

  // Adiciona erros de validação se disponível
  if (value && Array.isArray(value)) {
    errorResponse.errors = value;
  }

  // Em desenvolvimento, inclui stack trace
  if (config.isDevelopment && error.stack) {
    errorResponse.stack = error.stack;
  }

  res.status(statusCode).json(errorResponse);
};

// Middleware principal de tratamento de erros
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Formata o erro
  const formattedError = formatError(error);

  // Log do erro
  if (isOperationalError(formattedError)) {
    logger.warn('Erro operacional:', {
      message: formattedError.message,
      statusCode: formattedError.statusCode,
      code: formattedError.code,
      path: req.originalUrl,
      method: req.method,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
    });
  } else {
    logger.error('Erro não operacional:', {
      message: formattedError.message,
      stack: formattedError.stack,
      path: req.originalUrl,
      method: req.method,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
    });
  }

  // Envia resposta de erro
  sendErrorResponse(formattedError, req, res);
};

// Middleware para capturar erros assíncronos
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};
