'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // Get states and countries IDs
    const states = await queryInterface.sequelize.query(
      `SELECT s.id, s.code as state_code, c.code as country_code 
       FROM states s 
       JOIN countries c ON s."countryId" = c.id`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const countries = await queryInterface.sequelize.query(
      `SELECT id, code FROM countries WHERE code IN ('BR', 'US')`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const brazilId = countries.find(c => c.code === 'BR')?.id;
    const usaId = countries.find(c => c.code === 'US')?.id;

    if (!brazilId || !usaId) {
      throw new Error('Countries (BR, US) must exist before creating cities');
    }

    // Helper function to get state ID
    const getStateId = (code) => states.find(s => s.state_code === code && s.country_code === 'BR')?.id;
    const getUSStateId = (code) => states.find(s => s.state_code === code && s.country_code === 'US')?.id;

    // Create cities for main Brazilian states and US states
    const cities = [];

    // SÃO PAULO (SP) - 3 principais cidades
    const spStateId = getStateId('SP');
    if (spStateId) {
      cities.push(
        { id: uuidv4(), name: 'São Paulo', stateId: spStateId, countryId: brazilId, isCapital: true, population: 12396372, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Guarulhos', stateId: spStateId, countryId: brazilId, isCapital: false, population: 1392121, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Campinas', stateId: spStateId, countryId: brazilId, isCapital: false, population: 1213792, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // RIO DE JANEIRO (RJ) - 3 principais cidades
    const rjStateId = getStateId('RJ');
    if (rjStateId) {
      cities.push(
        { id: uuidv4(), name: 'Rio de Janeiro', stateId: rjStateId, countryId: brazilId, isCapital: true, population: 6775561, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'São Gonçalo', stateId: rjStateId, countryId: brazilId, isCapital: false, population: 1091737, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Duque de Caxias', stateId: rjStateId, countryId: brazilId, isCapital: false, population: 924624, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // MINAS GERAIS (MG) - 3 principais cidades
    const mgStateId = getStateId('MG');
    if (mgStateId) {
      cities.push(
        { id: uuidv4(), name: 'Belo Horizonte', stateId: mgStateId, countryId: brazilId, isCapital: true, population: 2521564, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Uberlândia', stateId: mgStateId, countryId: brazilId, isCapital: false, population: 699097, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Contagem', stateId: mgStateId, countryId: brazilId, isCapital: false, population: 663855, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // BAHIA (BA) - 3 principais cidades
    const baStateId = getStateId('BA');
    if (baStateId) {
      cities.push(
        { id: uuidv4(), name: 'Salvador', stateId: baStateId, countryId: brazilId, isCapital: true, population: 2886698, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Feira de Santana', stateId: baStateId, countryId: brazilId, isCapital: false, population: 619609, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Vitória da Conquista', stateId: baStateId, countryId: brazilId, isCapital: false, population: 341597, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // PARANÁ (PR) - 3 principais cidades
    const prStateId = getStateId('PR');
    if (prStateId) {
      cities.push(
        { id: uuidv4(), name: 'Curitiba', stateId: prStateId, countryId: brazilId, isCapital: true, population: 1963726, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Londrina', stateId: prStateId, countryId: brazilId, isCapital: false, population: 575377, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Maringá', stateId: prStateId, countryId: brazilId, isCapital: false, population: 430157, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // CEARÁ (CE) - 3 principais cidades
    const ceStateId = getStateId('CE');
    if (ceStateId) {
      cities.push(
        { id: uuidv4(), name: 'Fortaleza', stateId: ceStateId, countryId: brazilId, isCapital: true, population: 2703391, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Caucaia', stateId: ceStateId, countryId: brazilId, isCapital: false, population: 368328, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Juazeiro do Norte', stateId: ceStateId, countryId: brazilId, isCapital: false, population: 276264, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // PERNAMBUCO (PE) - 3 principais cidades
    const peStateId = getStateId('PE');
    if (peStateId) {
      cities.push(
        { id: uuidv4(), name: 'Recife', stateId: peStateId, countryId: brazilId, isCapital: true, population: 1653461, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Jaboatão dos Guararapes', stateId: peStateId, countryId: brazilId, isCapital: false, population: 706867, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Olinda', stateId: peStateId, countryId: brazilId, isCapital: false, population: 393115, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // RIO GRANDE DO SUL (RS) - 3 principais cidades
    const rsStateId = getStateId('RS');
    if (rsStateId) {
      cities.push(
        { id: uuidv4(), name: 'Porto Alegre', stateId: rsStateId, countryId: brazilId, isCapital: true, population: 1488252, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Caxias do Sul', stateId: rsStateId, countryId: brazilId, isCapital: false, population: 517451, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Pelotas', stateId: rsStateId, countryId: brazilId, isCapital: false, population: 343651, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // SANTA CATARINA (SC) - 3 principais cidades
    const scStateId = getStateId('SC');
    if (scStateId) {
      cities.push(
        { id: uuidv4(), name: 'Florianópolis', stateId: scStateId, countryId: brazilId, isCapital: true, population: 508826, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Joinville', stateId: scStateId, countryId: brazilId, isCapital: false, population: 597658, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Blumenau', stateId: scStateId, countryId: brazilId, isCapital: false, population: 361855, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // GOIÁS (GO) - 3 principais cidades
    const goStateId = getStateId('GO');
    if (goStateId) {
      cities.push(
        { id: uuidv4(), name: 'Goiânia', stateId: goStateId, countryId: brazilId, isCapital: true, population: 1555626, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Aparecida de Goiânia', stateId: goStateId, countryId: brazilId, isCapital: false, population: 542090, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'Anápolis', stateId: goStateId, countryId: brazilId, isCapital: false, population: 391772, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // US cities (sample)
    const caUSStateId = getUSStateId('CA');
    if (caUSStateId) {
      cities.push(
        { id: uuidv4(), name: 'Los Angeles', stateId: caUSStateId, countryId: usaId, isCapital: false, population: 3898747, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'San Francisco', stateId: caUSStateId, countryId: usaId, isCapital: false, population: 884363, isActive: true, createdAt: now, updatedAt: now },
        { id: uuidv4(), name: 'San Diego', stateId: caUSStateId, countryId: usaId, isCapital: false, population: 1423851, isActive: true, createdAt: now, updatedAt: now }
      );
    }

    // Insert cities
    await queryInterface.bulkInsert('cities', cities, {
      ignoreDuplicates: true,
    });

    console.log(`✅ ${cities.length} default cities created successfully`);
  },

  async down(queryInterface) {
    // Remove all cities 
    await queryInterface.bulkDelete('cities', {});

    console.log('✅ All cities removed successfully');
  }
};