'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // Default countries data
    const countries = [
      {
        id: uuidv4(),
        name: 'Brasil',
        code: 'BR',
        code3: 'BRA',
        numericCode: '076',
        phoneCode: '+55',
        flag: '🇧🇷',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'United States',
        code: 'US',
        code3: 'USA',
        numericCode: '840',
        phoneCode: '+1',
        flag: '🇺🇸',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'United Kingdom',
        code: 'UK',
        code3: 'GBR',
        numericCode: '826',
        phoneCode: '+44',
        flag: '🇬🇧',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      { 
        id: uuidv4(),
        name: 'France',
        code: 'FR',
        code3: 'FRA',
        numericCode: '250',
        phoneCode: '+33',
        flag: '🇫🇷',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      { 
        id: uuidv4(),
        name: 'Germany',
        code: 'DE',
        code3: 'DEU',
        numericCode: '276',
        phoneCode: '+49',
        flag: '🇩🇪',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Argentina',
        code: 'AR',
        code3: 'ARG',
        numericCode: '032',
        phoneCode: '+54',
        flag: '🇦🇷',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Canada',
        code: 'CA',
        code3: 'CAN',
        numericCode: '124',
        phoneCode: '+1',
        flag: '🇨🇦',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Portugal',
        code: 'PT',
        code3: 'PRT',
        numericCode: '620',
        phoneCode: '+351',
        flag: '🇵🇹',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ];

    // Insert countries
    await queryInterface.bulkInsert('countries', countries, {
      ignoreDuplicates: true,
    });

    console.log('✅ Default countries created successfully');
  },

  async down(queryInterface) {
    // Remove only the default countries
    await queryInterface.bulkDelete('countries', {
      code: ['BR', 'US', 'AR', 'CA', 'PT'],
    });

    console.log('✅ Default countries removed successfully');
  }
};