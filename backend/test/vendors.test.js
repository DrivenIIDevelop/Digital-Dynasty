const request = require('supertest');
const app = require('../app');
const { connectToMongo, disconnectFromMongo } = require('../db');
const Vendor = require('../models/vendor'); 

describe('Test vendor API endpoints', () => {
    beforeAll(async () => {
        await connectToMongo();
    });

    test('Should create a new vendor', async () => {
        const response = await request(app)
            .post('/vendors')
            .send({
                name: 'New Vendor',
                email: 'newvendor@example.com',
                phone: '9876543210'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name', 'New Vendor');
    });

    test('Should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/vendors')
            .send({
                // Missing required fields
            });
        expect(response.statusCode).toBe(400);
    });

    test('Should return 404 if vendor is not found', async () => {
        const response = await request(app)
            .get('/vendors/610b999b8e295702808278d2');
        expect(response.statusCode).toBe(404);
    });

    test('Should get a vendor by ID', async () => {
        // Insert a vendor into the database
        const vendor = await new Vendor({
            name: 'Test Vendor',
            email: 'testvendor@example.com',
            phone: '1234567890'
        }).save();
        const response = await request(app)
            .get(`/vendors/${vendor._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', vendor._id.toString());
        expect(response.body).toHaveProperty('name', 'Test Vendor');
    });

    test('Should update a vendor by ID', async () => {
        // Insert a vendor into the database
        const vendor = await new Vendor({
            name: 'Old Vendor',
            email: 'oldvendor@example.com',
            phone: '1234567890'
        }).save();
        const response = await request(app)
            .put(`/vendors/${vendor._id}`)
            .send({ name: 'Updated Vendor' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', vendor._id.toString());
        expect(response.body).toHaveProperty('name', 'Updated Vendor');
    });

    test('Should delete a vendor by ID', async () => {
        // insert a vendor into the database
        const vendor = await new Vendor({
            name: 'MDIHub',
            email: 'MDIHub@gmail.com',
            phone: '1234567890'
        }).save();
        const response = await request(app)
            .delete(`/vendors/${vendor._id}`);
        expect(response.statusCode).toBe(204);
        // Check if vendor is deleted from database
        const deletedVendor = await Vendor.findById(vendor._id);
        expect(deletedVendor).toBeNull();
    });

    afterAll(async () => {
        // Delete all records from the Vendor collection
        await Vendor.deleteMany({});
        await disconnectFromMongo();
    });
});
