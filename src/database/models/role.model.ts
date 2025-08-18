import { DataTypes, Model } from 'sequelize';
import type { IRole, IRoleCreation, RoleName } from '../interface/role.types';
import { sequelize } from '@/config/database';

class Role extends Model<IRole, IRoleCreation> implements IRole {
  id!: string;
  name!: RoleName;
  description?: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}

Role.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          validate: {
            isIn: [['admin', 'student']],
            notEmpty: true,
          },
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          field: 'is_active',
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
        modelName: 'Role',
        tableName: 'roles',
        timestamps: true,
        paranoid: true,
        underscored: true,
        indexes: [
          {
            unique: true,
            fields: ['name'],
          },
          {
            fields: ['is_active'],
          },
        ],
      }
    )

export { Role }
