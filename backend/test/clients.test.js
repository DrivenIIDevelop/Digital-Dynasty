const request = require('supertest');
const app = require('../app');
const { connectToMongo, disconnectFromMongo } = require('../db');
const Client = require('../models/Client');

describe('Test client API endpoints', () => {
    beforeAll(async () => {
        await connectToMongo();
    });

    test('Should create a new client', async () => {
        const response = await request(app)
            .post('/clients')
            .send({
                name: 'New Client',
                email: 'newclient@example.com',
                phone: '9876543210'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name', 'New Client');
    });

    test('Should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/clients')
            .send({
                // Missing required fields
            });
        expect(response.statusCode).toBe(400);
    });

    test('Should return 404 if client is not found', async () => {
        const response = await request(app)
            .get('/clients/610b999b8e295702808278d2');
        expect(response.statusCode).toBe(404);
    });

    test('Should get a client by ID', async () => {
        // Insert a client into the database
        const client = await new Client({
            name: 'Test Client',
            email: 'testclient@example.com',
            phone: '1234567890'
        }).save();
        const response = await request(app)
            .get(`/clients/${client._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', client._id.toString());
        expect(response.body).toHaveProperty('name', 'Test Client');
    });

    test('Should update a client by ID', async () => {
        // Insert a client into the database
        const client = await new Client({
            name: 'Old Client',
            email: 'oldclient@example.com',
            phone: '1234567890'
        }).save();
        const response = await request(app)
            .put(`/clients/${client._id}`)
            .send({ name: 'Updated Client' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', client._id.toString());
        expect(response.body).toHaveProperty('name', 'Updated Client');
    });

    test('Should delete a client by ID', async () => {
        // Insert a client into the database
        const client = await new Client({
            name: 'Client to delete',
            email: 'deleteme@example.com',
            phone: '1234567890'
        }).save();
        const response = await request(app)
            .delete(`/clients/${client._id}`);
        expect(response.statusCode).toBe(204);
        // Check if the client is deleted from the database
        const deletedClient = await Client.findById(client._id);
        expect(deletedClient).toBeNull();
    });

    afterAll(async () => {
        // Delete all records from the Client collection
        await Client.deleteMany({});
        await disconnectFromMongo();
    });
});
