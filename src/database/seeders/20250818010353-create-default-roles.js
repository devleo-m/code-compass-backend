'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // Default roles data
    const roles = [
      {
        id: uuidv4(),
        name: 'admin',
        description: 'Administrator with full access to all features',
          isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'student',
        description: 'Student with limited access to learning features',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      }
    ];

    // Insert roles
    await queryInterface.bulkInsert('roles', roles, {
      ignoreDuplicates: true,
    });

    console.log('✅ Default roles created successfully');
  },

  async down(queryInterface) {
    // Remove only the default roles
    await queryInterface.bulkDelete('roles', {
      name: ['admin', 'student'],
    });

    console.log('✅ Default roles removed successfully');
  }
};