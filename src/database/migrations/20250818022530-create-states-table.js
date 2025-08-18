'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('states', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'State name',
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: 'State code (SP, RJ, CA, TX, etc)',
      },
      countryId: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: 'Reference to countries table',
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
        comment: 'Whether the state is active',
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
      comment: 'States/provinces table for geographic data',
      indexes: [
        {
          unique: true,
          fields: ['name', 'countryId'],
        },
        {
          unique: true,
          fields: ['code', 'countryId'],
        },
        {
          fields: ['countryId'],
        },
        {
          fields: ['isActive'],
        },
      ],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('states');
  }
};