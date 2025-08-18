'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('countries', {
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
        comment: 'Country name in English',
      },
      code: {
        type: DataTypes.STRING(2),
        allowNull: false,
        unique: true,
        comment: 'ISO 3166-1 alpha-2 country code (BR, US, etc)',
      },
      code3: {
        type: DataTypes.STRING(3),
        allowNull: true,
        unique: true,
        comment: 'ISO 3166-1 alpha-3 country code (BRA, USA, etc)',
      },
      language: {
        type: DataTypes.STRING(2),
        allowNull: true,
        comment: 'ISO 639-1 language code (pt, en, es, etc)',
      },
      numericCode: {
        type: DataTypes.STRING(3),
        allowNull: true,
        comment: 'ISO 3166-1 numeric country code',
      },
      phoneCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: 'International phone code (+55, +1, etc)',
      },
      flag: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'URL or emoji of country flag',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether the country is active',
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
      comment: 'Countries table for geographic data',
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('countries');
  }
};