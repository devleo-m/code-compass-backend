import jwt from 'jsonwebtoken';
import { UnauthorizedError } from './errors';

// Payload do JWT
interface JwtPayload {
  userId: string;
  email: string;
}

// Tokens de retorno
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

// Configurações JWT (usando variáveis de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export const generateTokens = (payload: JwtPayload): TokenResponse => {
  try {
    // Gerar access token
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    // Gerar refresh token
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      expiresIn: JWT_EXPIRES_IN,
    };
  } catch (error) {
    throw new Error('Erro ao gerar tokens JWT');
  }
};

export const verifyToken = (token: string, type: 'access' | 'refresh' = 'access'): JwtPayload => {
  try {
    const secret = type === 'access' ? JWT_SECRET : JWT_REFRESH_SECRET;
    
    const decoded = jwt.verify(token, secret) as any;
    
    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token expirado');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Token inválido');
    }
    throw new UnauthorizedError('Erro ao verificar token');
  }
};

export const extractTokenFromHeader = (authHeader: string | undefined): string => {
  if (!authHeader) {
    throw new UnauthorizedError('Token de autorização não fornecido');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Formato de token inválido. Use: Bearer <token>');
  }

  const token = authHeader.substring(7); // Remove "Bearer "
  
  if (!token) {
    throw new UnauthorizedError('Token não fornecido');
  }

  return token;
};
