import Redis from 'ioredis';
import { config } from './environment';
import { logger } from './logger';

// Cria instância do Redis
export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password || undefined,
  lazyConnect: true,
});

// Eventos do Redis
redis.on('connect', () => {
  logger.info('🔗 Conectando ao Redis...');
});

redis.on('ready', () => {
  logger.info('⚡ Redis conectado e pronto para uso');
});

redis.on('error', (error) => {
  logger.error('❌ Erro na conexão com Redis:', error);
});

redis.on('close', () => {
  logger.info('🔌 Conexão com Redis fechada');
});

redis.on('reconnecting', () => {
  logger.info('🔄 Tentando reconectar ao Redis...');
});

// Função para conectar ao Redis
export async function connectRedis(): Promise<void> {
  try {
    await redis.connect();
    await redis.ping();
    logger.info('📡 Conexão com Redis estabelecida com sucesso');
  } catch (error) {
    logger.error('❌ Erro ao conectar com Redis:', error);
    throw error;
  }
}

// Função para desconectar do Redis
export async function disconnectRedis(): Promise<void> {
  try {
    await redis.quit();
    logger.info('🔌 Conexão com Redis fechada');
  } catch (error) {
    logger.error('❌ Erro ao fechar conexão com Redis:', error);
    throw error;
  }
}

// Utilitários do Redis
export const redisUtils = {
  // Cache com TTL
  async set(key: string, value: any, ttl?: number): Promise<void> {
    const serializedValue = JSON.stringify(value);
    if (ttl) {
      await redis.setex(key, ttl, serializedValue);
    } else {
      await redis.set(key, serializedValue);
    }
  },

  // Buscar cache
  async get<T>(key: string): Promise<T | null> {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },

  // Deletar cache
  async del(key: string): Promise<void> {
    await redis.del(key);
  },

  // Deletar múltiplas chaves por pattern
  async delPattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },

  // Verificar se existe
  async exists(key: string): Promise<boolean> {
    const exists = await redis.exists(key);
    return exists === 1;
  },

  // TTL
  async ttl(key: string): Promise<number> {
    return await redis.ttl(key);
  },

  // Incrementar
  async incr(key: string): Promise<number> {
    return await redis.incr(key);
  },

  // Hash operations
  async hset(key: string, field: string, value: any): Promise<void> {
    await redis.hset(key, field, JSON.stringify(value));
  },

  async hget<T>(key: string, field: string): Promise<T | null> {
    const value = await redis.hget(key, field);
    return value ? JSON.parse(value) : null;
  },

  async hgetall<T>(key: string): Promise<Record<string, T>> {
    const hash = await redis.hgetall(key);
    const result: Record<string, T> = {};
    
    for (const [field, value] of Object.entries(hash)) {
      result[field] = JSON.parse(value);
    }
    
    return result;
  },

  async hdel(key: string, field: string): Promise<void> {
    await redis.hdel(key, field);
  },

  // List operations
  async lpush(key: string, value: any): Promise<void> {
    await redis.lpush(key, JSON.stringify(value));
  },

  async rpop<T>(key: string): Promise<T | null> {
    const value = await redis.rpop(key);
    return value ? JSON.parse(value) : null;
  },
};
