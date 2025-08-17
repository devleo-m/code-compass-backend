// Classe base para erros da aplicação
export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'AppError';
  }
}

// Erros específicos mais comuns
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Invalid data') {
    super(message, 400, 'BAD_REQUEST');
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Data conflict') {
    super(message, 409, 'CONFLICT');
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
  }
}

export class ValidationError extends AppError {
  public errors: any[];

  constructor(message: string = 'Invalid input data', errors: any[] = []) {
    super(message, 400, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}
