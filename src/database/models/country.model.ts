import { DataTypes, Model } from 'sequelize';
import type { ICountry, ICountryCreation } from '../interface/country.types';
import { sequelize } from '@/config/database';

class Country extends Model<ICountry, ICountryCreation> implements ICountry {
  id!: string;
  name!: string;
  code!: string;
  code3?: string;
  language?: string;
  numericCode?: string;
  phoneCode?: string;
  flag?: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}

Country.init(
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
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    code: {
      type: DataTypes.STRING(2),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 2],
        isAlpha: true,
        isUppercase: true,
      },
    },
    code3: {
      type: DataTypes.STRING(3),
      allowNull: true,
      unique: true,
      validate: {
        len: [3, 3],
        isAlpha: true,
        isUppercase: true,
      },
    },
    numericCode: {
      type: DataTypes.STRING(3),
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [1, 3],
      },
    },
    language: {
      type: DataTypes.STRING(2),
      allowNull: true,
      validate: {
        len: [2, 2],
      },
    },
    phoneCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        len: [1, 10],
      },
    },
    flag: {
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
    modelName: 'Country',
    tableName: 'countries',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['name'],
      },
      {
        unique: true,
        fields: ['code'],
      }
    ],
  }
);

export { Country };
