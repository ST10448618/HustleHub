// backend/tests/admin.test.js
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const bcrypt = require('bcrypt');

describe('Admin Routes API', () => {
    let clientToken;
    let adminToken;

    beforeEach(async () => {
        // Clear users
        User.deleteAll();

        // Create regular CLIENT user
        const clientHash = await bcrypt.hash('ClientPass123!', 10);
        User.create({
            name: 'Client User',
            email: 'client@example.com',
            passwordHash: clientHash,
            role: 'CLIENT'
        });

    });
});