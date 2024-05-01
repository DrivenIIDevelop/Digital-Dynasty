const request = require('supertest');
const app = require('../app');
const { connectToMongo, disconnectFromMongo } = require('../db');
const Payment = require('../models/Payment');

describe('Test payment API endpoints', () => {
    beforeAll(async () => {
        await connectToMongo();
    });

    test('Should create a new payment', async () => {
        const response = await request(app)
            .post('/payments')
            .send({
                client_id: '61234abc56789def12345678',
                payment_date: '2024-04-25',
                amount: 100.00,
                method: 'credit_card'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('client_id', '61234abc56789def12345678');
        expect(response.body).toHaveProperty('payment_date');
        expect(response.body).toHaveProperty('amount');
        expect(response.body).toHaveProperty('method', 'credit_card');
    });
    

    test('Should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/payments')
            .send({
                // Missing required fields
            });
        expect(response.statusCode).toBe(400);
    });

    test('Should return 404 if payment is not found', async () => {
        const response = await request(app)
            .get('/payments/610b999b8e295702808278d2');
        expect(response.statusCode).toBe(404);
    });

    test('Should get a payment by ID', async () => {
        const payment = await new Payment({
            client_id: '61234abc56789def12345678',
            payment_date: '2024-04-25',
            amount: 100.00,
            method: 'credit_card'
        }).save();
        const response = await request(app)
            .get(`/payments/${payment._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', payment._id.toString());
        expect(response.body).toHaveProperty('client_id', '61234abc56789def12345678');
        expect(response.body).toHaveProperty('payment_date');
        expect(response.body).toHaveProperty('amount');
        expect(response.body).toHaveProperty('method', 'credit_card');
    });

    test('Should update a payment by ID', async () => {
        const payment = await new Payment({
            client_id: '61234abc56789def12345678',
            payment_date: '2024-04-25',
            amount: 100.00,
            method: 'credit_card'
        }).save();
        const response = await request(app)
            .put(`/payments/${payment._id}`)
            .send({ amount: 200.00 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', payment._id.toString());
        expect(response.body).toHaveProperty('client_id', '61234abc56789def12345678');
        expect(response.body).toHaveProperty('payment_date');
        expect(response.body).toHaveProperty('amount');
        expect(response.body).toHaveProperty('method', 'credit_card');
    });

    test('Should delete a payment by ID', async () => {
        const payment = await new Payment({
            client_id: '61234abc56789def12345678',
            payment_date: '2024-04-25',
            amount: 100.00,
            method: 'credit_card'
        }).save();
        const response = await request(app)
            .delete(`/payments/${payment._id}`);
        expect(response.statusCode).toBe(204);
        // Check if payment is deleted from database
        const deletedPayment = await Payment.findById(payment._id);
        expect(deletedPayment).toBeNull();
    });

    afterAll(async () => {
        // Delete all records from the Payment collection
        await Payment.deleteMany({});
        await disconnectFromMongo();
    });
});
