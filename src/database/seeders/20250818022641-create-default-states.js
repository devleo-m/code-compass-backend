'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // First, get country IDs (we need them for foreign keys)
    const countries = await queryInterface.sequelize.query(
      `SELECT id, code FROM countries WHERE code IN ('BR', 'US')`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const brazilId = countries.find(c => c.code === 'BR')?.id;
    const usaId = countries.find(c => c.code === 'US')?.id;

    if (!brazilId || !usaId) {
      throw new Error('Countries (BR, US) must exist before creating states');
    }

    // Default states data
    const states = [
      // Brazilian states
      {
        id: uuidv4(),
        name: 'Acre',
        code: 'AC',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Alagoas',
        code: 'AL',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Amapá',
        code: 'AP',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Amazonas',
        code: 'AM',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Bahia',
        code: 'BA',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Ceará',
        code: 'CE',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Distrito Federal',
        code: 'DF',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Espírito Santo',
        code: 'ES',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Goiás',
        code: 'GO',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Maranhão',
        code: 'MA',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Mato Grosso',
        code: 'MT',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Mato Grosso do Sul',
        code: 'MS',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Minas Gerais',
        code: 'MG',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Pará',
        code: 'PA',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Paraíba',
        code: 'PB',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Paraná',
        code: 'PR',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Pernambuco',
        code: 'PE',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Piauí',
        code: 'PI',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Rio Grande do Norte',
        code: 'RN',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Rio Grande do Sul',
        code: 'RS',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Rio de Janeiro',
        code: 'RJ',
        countryId: brazilId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },


      
      // US states
      {
        id: uuidv4(),
        name: 'California',
        code: 'CA',
        countryId: usaId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Texas',
        code: 'TX',
        countryId: usaId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'New York',
        code: 'NY',
        countryId: usaId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Florida',
        code: 'FL',
        countryId: usaId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ];

    // Insert states
    await queryInterface.bulkInsert('states', states, {
      ignoreDuplicates: true,
    });

    console.log('✅ Default states created successfully');
  },

  async down(queryInterface) {
    // Remove all Brazilian states + sample US states
    await queryInterface.bulkDelete('states', {
      code: [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
        'CA', 'TX', 'NY', 'FL'
      ],
    });

    console.log('✅ Default states removed successfully');
  }
};