# 🗄️ Database Guide - Code Compass Backend

## 📋 **Padrões e Convenções**

### **Estrutura de Pastas**
```
src/database/
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
- ✅ **snake_case**: `created_at`, `is_active`, `user_id`
- ✅ **Inglês**: Sempre em inglês
- ✅ **Descritivo**: `email_verified` ao invés de `verified`

#### **PKs e FKs**
- ✅ **UUID**: Sempre usar UUID v4 como chave primária
- ✅ **FK naming**: `{table_name}_id` (ex: `user_id`, `role_id`)

#### **Arquivos**
- ✅ **Migrations**: `YYYYMMDDHHMMSS-action-table-name.js`
- ✅ **Models**: `PascalCase.ts` (ex: `Role.ts`, `User.ts`)
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

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('table_name', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // ... outras colunas
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      comment: 'Descrição da tabela',
      indexes: [
        // Índices necessários
      ],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('table_name');
  }
};
```

### **2. Types/Interfaces**
```typescript
// src/types/entity.types.ts
export interface IEntity {
  id: string;
  // ... propriedades
  createdAt: Date;
  updatedAt: Date;
}

export enum EntityEnum {
  VALUE1 = 'value1',
  VALUE2 = 'value2',
}
```

### **3. Model (ORM)**
```typescript
// src/database/models/Entity.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import type { IEntity } from '../../types/entity.types';

interface EntityAttributes {
  id: string;
  // ... propriedades
  createdAt: Date;
  updatedAt: Date;
}

interface EntityCreationAttributes {
  // Campos obrigatórios para criação
}

export class Entity extends Model<EntityAttributes, EntityCreationAttributes> implements IEntity {
  public id!: string;
  // ... propriedades

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Entity {
    Entity.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // ... definições de campos
    }, {
      sequelize,
      modelName: 'Entity',
      tableName: 'entities',
      timestamps: true,
      underscored: true,
    });

    return Entity;
  }

  // Métodos personalizados
}
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

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    const data = [
      {
        id: uuidv4(),
        // ... dados
        created_at: now,
        updated_at: now,
      },
    ];

    await queryInterface.bulkInsert('table_name', data, {
      ignoreDuplicates: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('table_name', {
      // critérios para deletar
    });
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
- ✅ **created_at**: Timestamp automático
- ✅ **updated_at**: Timestamp automático

### **Campos Opcionais Comuns**
- 🔄 **is_active**: Boolean (padrão: true)
- 🔄 **deleted_at**: Soft delete timestamp
- 🔄 **version**: Controle de versão

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
