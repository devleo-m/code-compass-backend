import { Sequelize } from 'sequelize';

// Configuração do banco
const DB_HOST = process.env.DATABASE_HOST || 'localhost';
const DB_PORT = Number(process.env.DATABASE_PORT) || 5432;
const DB_NAME = process.env.DATABASE_NAME || 'code_compass_dev';
const DB_USER = process.env.DATABASE_USER || 'root';
const DB_PASSWORD = process.env.DATABASE_PASSWORD || 'root';

// Criar instância do Sequelize
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
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

// Função para conectar
export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conectado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar PostgreSQL:', error);
    throw error;
  }
};

// Função para desconectar
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await sequelize.close();
    console.log('🔌 PostgreSQL desconectado');
  } catch (error) {
    console.error('❌ Erro ao desconectar PostgreSQL:', error);
    throw error;
  }
};