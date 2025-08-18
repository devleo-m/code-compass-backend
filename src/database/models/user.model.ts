import { DataTypes, Model } from 'sequelize';
import type { IUser, IUserCreation } from '../interface/user.types';
import { sequelize } from '@/config/database';

class User extends Model<IUser, IUserCreation> implements IUser {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  phone?: string;
  birthDate?: Date;
  avatar?: string;
  roleId!: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  emailVerified!: boolean;
  emailVerifiedAt?: Date;
  lastLoginAt?: Date;
  preferences?: Record<string, any>;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;

  // Helper method to get full name
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Helper method to get public data (without password)
  public toPublicJSON() {
    const { password, ...publicData } = this.toJSON();
    return publicData;
  }

  // Static method to find user by email
  static async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: { email, isActive: true },
    });
  }

  // Static method to find active users
  static async findActiveUsers(): Promise<User[]> {
    return await User.findAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']],
    });
  }

  // Instance method to verify email
  public async verifyEmail(): Promise<void> {
    this.emailVerified = true;
    this.emailVerifiedAt = new Date();
    await this.save();
  }

  // Instance method to update last login
  public async updateLastLogin(): Promise<void> {
    this.lastLoginAt = new Date();
    await this.save();
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'first_name',
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'last_name',
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 255],
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        len: [8, 20],
      },
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'birth_date',
      validate: {
        isDate: true,
        isBefore: new Date().toISOString(),
      },
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'role_id',
      references: {
        model: 'roles',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    countryId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'country_id',
      references: {
        model: 'countries',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    stateId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'state_id',
      references: {
        model: 'states',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    cityId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'city_id',
      references: {
        model: 'cities',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'email_verified',
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'email_verified_at',
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login_at',
    },
    preferences: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
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
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
      {
        fields: ['role_id'],
      },
      {
        fields: ['country_id'],
      },
      {
        fields: ['state_id'],
      },
      {
        fields: ['city_id'],
      },
      {
        fields: ['is_active'],
      },
      {
        fields: ['email_verified'],
      },
      {
        fields: ['created_at'],
      },
    ],
  }
);

export { User };
