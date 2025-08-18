import type { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../../utils/jwt';
import { UnauthorizedError } from '../../utils/errors';

// Extende o Request para incluir dados do usuário
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        email: string
        role?: string
      }
    }
  }
}

// Middleware para verificar se usuário está autenticado
export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    // Extrair token do header Authorization
    const token = extractTokenFromHeader(req.headers.authorization);
    
    // Verificar e decodificar o token
    const decoded = verifyToken(token, 'access');
    
    // Adicionar dados do usuário ao request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware opcional - não falha se não tiver token
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    // Se não tem header, continua sem user
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }
    
    // Se tem header, tenta validar
    const token = extractTokenFromHeader(authHeader);
    const decoded = verifyToken(token, 'access');
    
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    
    next();
  } catch (error) {
    // Se der erro no token opcional, continua sem user
    // (não bloqueia a requisição)
    next();
  }
};

// Middleware para verificar se é admin
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  // Primeiro verifica se está autenticado
  requireAuth(req, res, (error) => {
    if (error) {
      return next(error);
    }
    
    // TODO: Verificar no banco se o usuário é admin
    // Por enquanto, simula verificação
    const isAdmin = req.user?.email?.includes('admin');
    
    if (!isAdmin) {
      return next(new UnauthorizedError('Acesso restrito a administradores'));
    }
    
    next();
  });
};
