const request = require('supertest');
const dotenv = require('dotenv');
const app = require('../../app');
const { connectToMongo, disconnectFromMongo } = require('../../db');
const Client = require('../../models/Client.model');

dotenv.config();

describe('Test client routes', () => {
    beforeAll(async () => {
        await connectToMongo();
    });

    test('Should create a new client', (done) => {
        request(app)
            .post('/clients')
            .send({
                name: 'Client D',
                email: 'clientD@example.com',
                phone: '123-456-7890'
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('client_id');
                expect(res.body).toHaveProperty('name', 'Client D');
                done();
            });
    });

    test('Should return 400 if required fields are missing', (done) => {
        request(app)
            .post('/clients')
            .send({
                email: 'clientE@example.com',
                phone: '123-456-7890'
            })
            .expect(400, done);
    });

    test('Should return 404 if client does not exist', (done) => {
        request(app)
            .get('/clients/100')
            .expect(404, done);
    });

    test('Should return the details of a client', (done) => {
        request(app)
            .get('/clients/1')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('client_id', 1);
                expect(res.body).toHaveProperty('name', 'Client A');
                expect(res.body).toHaveProperty('email', 'clientA@example.com');
                expect(res.body).toHaveProperty('phone', '123-456-7890');
                done();
            });
    });

    test('Should update the details of a client', (done) => {
        request(app)
            .put('/clients/1')
            .send({
                name: 'Updated Client A',
                email: 'updatedclientA@example.com',
                phone: '987-654-3210'
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('client_id', 1);
                expect(res.body).toHaveProperty('name', 'Updated Client A');
                expect(res.body).toHaveProperty('email', 'updatedclientA@example.com');
                expect(res.body).toHaveProperty('phone', '987-654-3210');
                done();
            });
    });

    test('Should delete a client', (done) => {
        request(app)
            .delete('/clients/1')
            .expect(204, done);
    });

    afterAll(async () => {
        // Clean up - Delete all records from the Client collection
        await Client.deleteMany({});
        await disconnectFromMongo();
    });
});
