import winston from 'winston';
import { config } from './environment';

// Cria o logger
export const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'code-compass-backend' },
  transports: [
    // Console transport para desenvolvimento
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      ),
    }),
  ],
});

// Adiciona transport de arquivo apenas em produção
if (config.isProduction) {
  logger.add(
    new winston.transports.File({
      filename: config.logging.file,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  );
}

// Stream para o Morgan (middleware de logs HTTP)
export const loggerStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};
