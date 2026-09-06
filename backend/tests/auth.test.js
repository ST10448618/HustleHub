// backend/tests/auth.test.js
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Authentication API', () => {
    // Clean up before each test
    beforeEach(() => {
        User.deleteAll();
    });

    describe('POST /api/v1/auth/register', () => {
        it('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'Test123456!'
                });
            
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User registered successfully');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data).toHaveProperty('email', 'test@example.com');
            expect(response.body.data).not.toHaveProperty('passwordHash');
            expect(response.body.data).toHaveProperty('role', 'CLIENT');
        });

        it('should reject duplicate email', async () => {
            // Register first user
            await request(app)
                .post('/api/v1/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'Test123456!'
                });
            
            // Try to register with same email
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    name: 'Another User',
                    email: 'test@example.com',
                    password: 'Test123456!'
                });
            
            expect(response.status).toBe(409);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Email already registered');
        });

    });
});