'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('cities', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'City name',
      },
      stateId: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: 'Reference to states table',
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
        comment: 'Reference to countries table (denormalized for performance)',
        references: {
          model: 'countries',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      zipCode: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Primary zip/postal code for the city',
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
        comment: 'Latitude coordinate',
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
        comment: 'Longitude coordinate',
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'City population (approximate)',
      },
      isCapital: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Whether the city is a state/province capital',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether the city is active',
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
      comment: 'Cities table for geographic data',
      indexes: [
        {
          unique: true,
          fields: ['name', 'stateId'],
        },
        {
          fields: ['stateId'],
        },
        {
          fields: ['countryId'],
        },
        {
          fields: ['zipCode'],
        },
        {
          fields: ['isCapital'],
        },
        {
          fields: ['isActive'],
        },
        {
          fields: ['latitude', 'longitude'],
        },
      ],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cities');
  }
};