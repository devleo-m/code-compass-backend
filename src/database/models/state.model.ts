import { DataTypes, Model } from 'sequelize';
import type { IState, IStateCreation } from '../interface/state.types';
import { sequelize } from '@/config/database';

class State extends Model<IState, IStateCreation> implements IState {
  id!: string;
  name!: string;
  code!: string;
  countryId!: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}

State.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 10],
      },
    },
    countryId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'country_id',
      references: {
        model: 'countries',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
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
    modelName: 'State',
    tableName: 'states',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['name', 'country_id'],
      },
      {
        unique: true,
        fields: ['code', 'country_id'],
      },
      {
        fields: ['country_id'],
      },
      {
        fields: ['is_active'],
      },
    ],
  }
);

export { State };
