import rateLimit from 'express-rate-limit';
import { config } from '../config/environment';
import { logger } from '../config/logger';

// Rate limiter global
export const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // 15 minutos por padrão
  max: config.rateLimit.maxRequests, // 100 requests por padrão
  message: {
    success: false,
    message: 'Muitas tentativas realizadas. Tente novamente em alguns minutos.',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: Math.ceil(config.rateLimit.windowMs / 1000),
  },
  standardHeaders: true, // Inclui headers `RateLimit-*`
  legacyHeaders: false, // Desabilita headers `X-RateLimit-*`
  handler: (req, res) => {
    logger.warn('Rate limit exceeded:', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.originalUrl,
      method: req.method,
    });

    res.status(429).json({
      success: false,
      message: 'Muitas tentativas realizadas. Tente novamente em alguns minutos.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(config.rateLimit.windowMs / 1000),
      timestamp: new Date().toISOString(),
    });
  },
});

// Rate limiter específico para login (mais restritivo)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas de login por IP
  message: {
    success: false,
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED',
    retryAfter: 900, // 15 minutos em segundos
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Não conta requests bem-sucedidos
  handler: (req, res) => {
    logger.warn('Auth rate limit exceeded:', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.originalUrl,
      method: req.method,
    });

    res.status(429).json({
      success: false,
      message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      retryAfter: 900,
      timestamp: new Date().toISOString(),
    });
  },
});

// Rate limiter para criação de usuários
export const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // 3 registros por IP por hora
  message: {
    success: false,
    message: 'Muitas tentativas de registro. Tente novamente em 1 hora.',
    code: 'REGISTER_RATE_LIMIT_EXCEEDED',
    retryAfter: 3600, // 1 hora em segundos
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Register rate limit exceeded:', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.originalUrl,
      method: req.method,
    });

    res.status(429).json({
      success: false,
      message: 'Muitas tentativas de registro. Tente novamente em 1 hora.',
      code: 'REGISTER_RATE_LIMIT_EXCEEDED',
      retryAfter: 3600,
      timestamp: new Date().toISOString(),
    });
  },
});
