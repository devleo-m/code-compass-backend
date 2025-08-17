import type { Response } from 'express';
import dayjs from 'dayjs';

// Estrutura padrão das respostas
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
  code?: string;
  timestamp: string;
}

// Resposta de sucesso
export const successResponse = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: dayjs().format('YYYY-MM-DD HH:mm'),
  };

  return res.status(statusCode).json(response);
};

// Resposta de erro
export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  code?: string,
  errors?: any[]
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
    code,
    errors,
    timestamp: dayjs().format('YYYY-MM-DD HH:mm'),
  };

  return res.status(statusCode).json(response);
};
