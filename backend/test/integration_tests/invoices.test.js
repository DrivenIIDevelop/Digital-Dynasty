const request = require('supertest');
const app =  require('../../app');
const { connectToMongo, disconnectFromMongo } = require('../../db');
const Invoice = require('../../models/Client');

describe('Test invoice management', () => {
    beforeAll(async() => {
        await connectToMongo();
    });

    test('Should create and return a new invoice', (done) => {
        request(app)
            .post('/invoices')
            .send({
                "user_id": "662a76b212d26eb1e9589b94",
                "client_id": "6628cf692488ca35bc223c45",
                "invoice_date": "2024-04-25",
                "amount": "350.00",
                "status": "paid"
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('_id');
                done();
            })
    });

    test('Should return 400 if one of the any of the required field is missing', (done) => {
        request(app)
            .post('/invoices')
            .send({
                "client_id": "6628cf692488ca35bc223c45",
                "invoice_date": "2024-04-25",
                "amount": "350.00",
                "status": "paid"
            })
            .expect(400, done)
    });

    afterAll(async() => {
        await Invoice.deleteMany({});
        await disconnectFromMongo();
    });
});