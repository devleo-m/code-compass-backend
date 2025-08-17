import { Sequelize } from 'sequelize';
import { config } from './environment';
import { logger } from './logger';

// Cria instância do Sequelize
export const sequelize = new Sequelize(config.database.url, {
  dialect: 'postgres',
  logging: config.isDevelopment ? (msg) => logger.debug(msg) : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
});

// Função para conectar ao banco
export async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info('🗄️  Conexão com PostgreSQL estabelecida com sucesso');
    
    // Sincroniza modelos apenas em desenvolvimento
    if (config.isDevelopment) {
      await sequelize.sync({ alter: true });
      logger.info('📋 Modelos sincronizados com o banco de dados');
    }
  } catch (error) {
    logger.error('❌ Erro ao conectar com o banco de dados:', error);
    throw error;
  }
}

// Função para desconectar do banco
export async function disconnectDatabase(): Promise<void> {
  try {
    await sequelize.close();
    logger.info('🔌 Conexão com PostgreSQL fechada');
  } catch (error) {
    logger.error('❌ Erro ao fechar conexão com o banco:', error);
    throw error;
  }
}
