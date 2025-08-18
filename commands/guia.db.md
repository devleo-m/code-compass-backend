# 🗄️ Database Guide - Code Compass Backend

## 📋 **Padrões e Convenções**

### **Estrutura de Pastas**
```
src/database/
├── interface/      # Types e interfaces TypeScript
├── migrations/     # Arquivos de migração (DDL)
├── models/         # Models do Sequelize (TypeScript)
└── seeders/        # Seeds para dados iniciais
```

### **Convenções de Nomenclatura**

#### **Tabelas**
- ✅ **snake_case**: `user_roles`, `learning_paths`
- ✅ **Plural**: `users`, `roles`, `quizzes`
- ✅ **Inglês**: Sempre em inglês

#### **Colunas**
- ✅ **camelCase**: `createdAt`, `isActive`, `userId` (no código TypeScript)
- ✅ **snake_case**: `created_at`, `is_active`, `user_id` (no banco físico)
- ✅ **Inglês**: Sempre em inglês
- ✅ **Descritivo**: `emailVerified` ao invés de `verified`

#### **PKs e FKs**
- ✅ **UUID**: Sempre usar UUID v4 como chave primária
- ✅ **FK naming**: `{table_name}_id` (ex: `user_id`, `role_id`)

#### **Arquivos**
- ✅ **Migrations**: `YYYYMMDDHHMMSS-action-table-name.js`
- ✅ **Models**: `entity.model.ts` (ex: `role.model.ts`, `user.model.ts`)
- ✅ **Types**: `entity.types.ts` (ex: `role.types.ts`, `user.types.ts`)
- ✅ **Seeds**: `YYYYMMDDHHMMSS-description.js`

---

## 🏗️ **Processo de Criação**

### **1. Migration (DDL)**
```bash
# Gerar migration
npx sequelize-cli migration:generate --name create-table-name

# Exemplo prático
npx sequelize-cli migration:generate --name create-roles-table
```

**Estrutura padrão da migration:**
```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('table_name', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // ... outras colunas (camelCase)
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    }, {
      comment: 'Descrição da tabela',
      indexes: [
        // Índices necessários
      ],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('table_name');
  }
};
```

### **2. Types/Interfaces**
```typescript
// src/database/interface/entity.types.ts
export enum EntityEnum {
  VALUE1 = 'value1',
  VALUE2 = 'value2',
}

export interface IEntity {
  id: string;
  // ... propriedades
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IEntityCreation {
  // Campos obrigatórios para criação (sem id, timestamps)
  name: string;
  isActive?: boolean;
}

export interface IEntityUpdate {
  // Campos opcionais para atualização
  name?: string;
  isActive?: boolean;
}
```

### **3. Model (ORM)**
```typescript
// src/database/models/entity.model.ts
import { DataTypes, Model } from 'sequelize';
import type { IEntity, IEntityCreation } from '../interface/entity.types';
import { sequelize } from '@/config/database';

class Entity extends Model<IEntity, IEntityCreation> implements IEntity {
  id!: string;
  // ... propriedades específicas
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}

Entity.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    // ... campos específicos
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active', // snake_case no banco
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at',
    },
  },
  {
    sequelize,
    modelName: 'Entity',
    tableName: 'entities',
    timestamps: true,
    paranoid: true, // Soft delete
    underscored: true, // snake_case no banco
    indexes: [
      // Índices necessários
    ],
  }
);

export { Entity };
```

### **4. Seed (Dados Iniciais)**
```bash
# Gerar seed
npx sequelize-cli seed:generate --name create-default-data

# Exemplo prático
npx sequelize-cli seed:generate --name create-default-roles
```

**Estrutura padrão do seed:**
```javascript
'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    
    const data = [
      {
        id: uuidv4(),
        // ... dados (camelCase)
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ];

    await queryInterface.bulkInsert('table_name', data, {
      ignoreDuplicates: true,
    });

    console.log('✅ Default data created successfully');
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('table_name', {
      // critérios para deletar
    });

    console.log('✅ Default data removed successfully');
  }
};
```

---

## ⚡ **Comandos Úteis**

### **Migrations**
```bash
# Executar migrations pendentes
npm run db:migrate

# Reverter última migration
npx sequelize-cli db:migrate:undo

# Reverter todas as migrations
npx sequelize-cli db:migrate:undo:all

# Status das migrations
npx sequelize-cli db:migrate:status
```

### **Seeds**
```bash
# Executar todos os seeds
npm run db:seed

# Executar seed específico
npx sequelize-cli db:seed --seed nome-do-seed

# Reverter todos os seeds
npx sequelize-cli db:seed:undo:all

# Reverter seed específico
npx sequelize-cli db:seed:undo --seed nome-do-seed
```

### **Database**
```bash
# Criar banco
npx sequelize-cli db:create

# Dropar banco
npx sequelize-cli db:drop

# Reset completo (drop + create + migrate + seed)
npm run db:reset
```

---

## 🔒 **Regras de Negócio**

### **Campos Obrigatórios**
- ✅ **id**: UUID v4 (sempre)
- ✅ **isActive**: Boolean (padrão: true)
- ✅ **createdAt**: Timestamp automático
- ✅ **updatedAt**: Timestamp automático
- ✅ **deletedAt**: Soft delete timestamp (null por padrão)

### **Validações**
- ✅ **Unique constraints**: Para campos únicos
- ✅ **Not null**: Para campos obrigatórios
- ✅ **Foreign keys**: Para relacionamentos
- ✅ **Check constraints**: Para validações específicas

### **Índices**
- ✅ **Primary key**: Automático no id
- ✅ **Unique**: Para campos únicos
- ✅ **Foreign keys**: Para otimizar joins
- ✅ **Busca**: Para campos consultados frequentemente

---

## 🚀 **Exemplo Completo: Role**

### **1. Migration**
```javascript
// 20250818010237-create-roles-table.js
await queryInterface.createTable('roles', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  // ... outros campos
});
```

### **2. Types**
```typescript
// src/types/role.types.ts
export interface IRole {
  id: string;
  name: RoleName;
  permissions: Permission[];
}

export enum RoleName {
  ADMIN = 'admin',
  STUDENT = 'student',
}
```

### **3. Model**
```typescript
// src/database/models/Role.ts
export class Role extends Model<RoleAttributes> implements IRole {
  static initModel(sequelize: Sequelize): typeof Role {
    // ... configuração
  }
}
```

### **4. Seed**
```javascript
// 20250818010353-create-default-roles.js
const roles = [
  { id: uuidv4(), name: 'admin', ... },
  { id: uuidv4(), name: 'student', ... },
];
await queryInterface.bulkInsert('roles', roles);
```

---

## 📝 **Checklist de Qualidade**

### **Antes de criar uma migration:**
- [ ] Nome descritivo e data/hora corretos
- [ ] UUID como chave primária
- [ ] Campos created_at e updated_at
- [ ] Comentários nas tabelas e colunas importantes
- [ ] Índices necessários definidos
- [ ] Função down() implementada

### **Antes de criar um model:**
- [ ] Interface TypeScript definida
- [ ] Atributos e Creation attributes corretos
- [ ] Validações necessárias
- [ ] Métodos helper se necessário
- [ ] Relacionamentos definidos (se aplicável)

### **Antes de criar um seed:**
- [ ] Dados realistas e úteis
- [ ] UUIDs únicos gerados
- [ ] Função down() para reverter
- [ ] Proteção contra duplicatas

---

## 🎯 **Boas Práticas**

### **Performance**
- ✅ Criar índices para colunas consultadas frequentemente
- ✅ Usar paginação em consultas grandes
- ✅ Evitar N+1 queries com includes
- ✅ Usar transactions para operações relacionadas

### **Segurança**
- ✅ Validar dados de entrada sempre
- ✅ Usar prepared statements (Sequelize faz automaticamente)
- ✅ Não expor dados sensíveis em logs
- ✅ Implementar soft delete quando necessário

### **Manutenibilidade**
- ✅ Documentar mudanças complexas
- ✅ Manter migrations pequenas e focadas
- ✅ Testar rollbacks das migrations
- ✅ Versionar seeds críticos

---

**Este guia deve ser seguido religiosamente para manter consistência e qualidade no banco de dados!** 🎯

---

## 📊 **Estrutura Atual do Banco**

### **Tabelas Implementadas**
- ✅ **roles** - Papéis dos usuários (admin, student)
- ✅ **countries** - Países (Brasil, EUA, Reino Unido, França, Alemanha, Argentina, Canadá, Portugal)
- ✅ **states** - Estados/Províncias (todos os 27 estados brasileiros + alguns americanos)
- ✅ **cities** - Cidades (principais cidades brasileiras + algumas americanas)
- ✅ **users** - Usuários do sistema (com relacionamentos completos)

### **Relacionamentos**
```
users -> roles (n:1, obrigatório)
users -> countries (n:1, opcional)
users -> states (n:1, opcional)  
users -> cities (n:1, opcional)
states -> countries (n:1, obrigatório)
cities -> states (n:1, obrigatório)
cities -> countries (n:1, denormalizado para performance)
```

### **Usuários Padrão Criados**
- **Admin**: admin@codecompass.com.br / Admin@123456
- **Estudante 1**: joao.silva@example.com / Student@123456
- **Estudante 2**: maria.santos@example.com / Student@123456  
- **Demo (inativo)**: pedro.demo@example.com / Student@123456

### **Dados Geográficos**
- **8 países** cadastrados
- **27 estados brasileiros** + 4 estados americanos
- **Mais de 80 cidades** brasileiras (3 por estado) + cidades americanas

### **Funcionalidades dos Models**
- **Soft delete** em todas as tabelas (paranoid: true)
- **Timestamps** automáticos (createdAt, updatedAt, deletedAt)
- **UUIDs** como chaves primárias
- **Validações** nos campos (email, telefone, URLs, etc)
- **Métodos auxiliares** (fullName, toPublicJSON, etc)
- **Campos JSON** para preferências do usuário
