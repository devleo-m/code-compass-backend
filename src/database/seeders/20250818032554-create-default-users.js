'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // Get roles and geography IDs
    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM roles WHERE name IN ('admin', 'student')`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const countries = await queryInterface.sequelize.query(
      `SELECT id, code FROM countries WHERE code = 'BR'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const states = await queryInterface.sequelize.query(
      `SELECT id, code FROM states WHERE code IN ('SP', 'RJ') AND "countryId" = (SELECT id FROM countries WHERE code = 'BR')`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const cities = await queryInterface.sequelize.query(
      `SELECT c.id, c.name, s.code as state_code 
       FROM cities c 
       JOIN states s ON c."stateId" = s.id 
       WHERE c.name IN ('São Paulo', 'Rio de Janeiro')`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const adminRoleId = roles.find(r => r.name === 'admin')?.id;
    const studentRoleId = roles.find(r => r.name === 'student')?.id;
    const brazilId = countries.find(c => c.code === 'BR')?.id;
    const spStateId = states.find(s => s.code === 'SP')?.id;
    const rjStateId = states.find(s => s.code === 'RJ')?.id;
    const spCityId = cities.find(c => c.name === 'São Paulo')?.id;
    const rjCityId = cities.find(c => c.name === 'Rio de Janeiro')?.id;

    if (!adminRoleId || !studentRoleId) {
      throw new Error('Roles (admin, student) must exist before creating users');
    }

    // Hash passwords
    const adminPassword = await bcrypt.hash('Admin@123456', 12);
    const studentPassword = await bcrypt.hash('Student@123456', 12);

    // Default users data
    const users = [
      // Admin user
      {
        id: uuidv4(),
        firstName: 'Leonardo',
        lastName: 'Administrador',
        email: 'admin@codecompass.com.br',
        password: adminPassword,
        phone: '+5511999999999',
        birthDate: new Date('1990-01-15'),
        roleId: adminRoleId,
        countryId: brazilId,
        stateId: spStateId,
        cityId: spCityId,
        emailVerified: true,
        emailVerifiedAt: now,
        lastLoginAt: now,
        preferences: JSON.stringify({
          theme: 'dark',
          language: 'pt-BR',
          notifications: {
            email: true,
            push: true,
            sms: false,
          },
        }),
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      // Test student user
      {
        id: uuidv4(),
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao.silva@example.com',
        password: studentPassword,
        phone: '+5521888888888',
        birthDate: new Date('1995-05-20'),
        roleId: studentRoleId,
        countryId: brazilId,
        stateId: rjStateId,
        cityId: rjCityId,
        emailVerified: true,
        emailVerifiedAt: now,
        preferences: JSON.stringify({
          theme: 'light',
          language: 'pt-BR',
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
        }),
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      // Another student user
      {
        id: uuidv4(),
        firstName: 'Maria',
        lastName: 'Santos',
        email: 'maria.santos@example.com',
        password: studentPassword,
        phone: '+5511777777777',
        birthDate: new Date('1998-08-10'),
        roleId: studentRoleId,
        countryId: brazilId,
        stateId: spStateId,
        cityId: spCityId,
        emailVerified: false,
        preferences: JSON.stringify({
          theme: 'light',
          language: 'pt-BR',
          notifications: {
            email: true,
            push: true,
            sms: true,
          },
        }),
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      // Demo student user (inactive)
      {
        id: uuidv4(),
        firstName: 'Pedro',
        lastName: 'Demo',
        email: 'pedro.demo@example.com',
        password: studentPassword,
        roleId: studentRoleId,
        countryId: brazilId,
        emailVerified: false,
        preferences: JSON.stringify({}),
        isActive: false,
        createdAt: now,
        updatedAt: now,
      },
    ];

    // Insert users
    await queryInterface.bulkInsert('users', users, {
      ignoreDuplicates: true,
    });

    console.log('✅ Default users created successfully');
    console.log('📧 Admin: admin@codecompass.com.br / Admin@123456');
    console.log('👨‍🎓 Student: joao.silva@example.com / Student@123456');
  },

  async down(queryInterface) {
    // Remove only the default users
    await queryInterface.bulkDelete('users', {
      email: [
        'admin@codecompass.com.br',
        'joao.silva@example.com',
        'maria.santos@example.com',
        'pedro.demo@example.com',
      ],
    });

    console.log('✅ Default users removed successfully');
  }
};