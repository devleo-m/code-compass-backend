import { DataTypes, Model } from 'sequelize';
import type { ICity, ICityCreation } from '../interface/city.types';
import { sequelize } from '@/config/database';

class City extends Model<ICity, ICityCreation> implements ICity {
  id!: string;
  name!: string;
  stateId!: string;
  countryId!: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  population?: number;
  isCapital!: boolean;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}

City.init(
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
        len: [1, 100],
      },
    },
    stateId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'state_id',
      references: {
        model: 'states',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
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
    zipCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'zip_code',
      validate: {
        len: [1, 20],
      },
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
      validate: {
        min: -180,
        max: 180,
      },
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    isCapital: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_capital',
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
    modelName: 'City',
    tableName: 'cities',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['name', 'state_id'],
      },
      {
        fields: ['state_id'],
      },
      {
        fields: ['country_id'],
      },
      {
        fields: ['zip_code'],
      },
      {
        fields: ['is_capital'],
      },
      {
        fields: ['is_active'],
      },
      {
        fields: ['latitude', 'longitude'],
      },
    ],
  }
);

export { City };
