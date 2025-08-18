'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'User first name',
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'User last name',
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        comment: 'User email address (unique)',
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Hashed password',
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'User phone number',
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'User birth date',
      },
      avatar: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'URL to user avatar image',
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: 'Reference to roles table',
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
        comment: 'Reference to countries table',
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
        comment: 'Reference to states table',
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
        comment: 'Reference to cities table',
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
        comment: 'Whether the email has been verified',
      },
      emailVerifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'When the email was verified',
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Last login timestamp',
      },
      preferences: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
        comment: 'User preferences (theme, language, etc)',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether the user account is active',
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
      comment: 'Users table for authentication and profile data',
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
        {
          fields: ['roleId'],
        },
        {
          fields: ['countryId'],
        },
        {
          fields: ['stateId'],
        },
        {
          fields: ['cityId'],
        },
        {
          fields: ['isActive'],
        },
        {
          fields: ['emailVerified'],
        },
        {
          fields: ['createdAt'],
        },
      ],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};