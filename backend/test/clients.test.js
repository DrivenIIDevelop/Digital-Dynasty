const request = require('supertest');
const dotenv = require('dotenv');
const app = require('../../app');
const { connectToMongo, disconnectFromMongo } = require('../../db');
const Client = require('../../models/Client.model');

dotenv.config();

describe('Test authentication client signup', () => {
    beforeAll(async () => {
        await connectToMongo();
    });

    test('Should create a new client', (done) => {
        request(app)
            .post('/clients/signup')
            .send({
                name: 'Jane Doe',
                email: 'jane@example.com',
                phone: '1234567890'
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('name', 'Jane Doe');
                done();
            });
    });

    test('Should return 400 if client email already exists', (done) => {
        request(app)
            .post('/clients/signup')
            .send({
                name: 'Jane Doe',
                email: 'jane@example.com',
                phone: '1234567890'
            })
            .expect(400, done);
    });

    test('Should return 422 if any required fields are missing', (done) => {
        request(app)
            .post('/clients/signup')
            .send({
                name: 'Jane Doe',
                email: 'jane@example.com'
            })
            .expect(422, done);
    });

    test('Should return 422 if email is not in the correct format', (done) => {
        request(app)
            .post('/clients/signup')
            .send({
                name: 'Jane Doe',
                email: 'janeexamplecom',
                phone: '1234567890'
            })
            .expect(422, done);
    });

    test('Should return 400 if phone is not in the correct format', (done) => {
        request(app)
            .post('/clients/signup')
            .send({
                name: 'Jane Doe',
                email: 'jane@example.com',
                phone: 'invalidphoneformat'
            })
            .expect(400, done);
    });

    afterAll(async () => {
        // Delete all records from the Client collection
        await Client.deleteMany({});
        await disconnectFromMongo();
    });
});
