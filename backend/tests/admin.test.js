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

        // Create ADMIN user
        const adminHash = await bcrypt.hash('AdminPass123!', 10);
        User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            passwordHash: adminHash,
            role: 'ADMIN'
        });

        // Login as client
        const clientLogin = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'client@example.com',
                password: 'ClientPass123!'
            });
        clientToken = clientLogin.body.data.token;


    });
});