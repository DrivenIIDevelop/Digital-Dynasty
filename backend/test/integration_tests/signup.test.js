const request = require('supertest');
const app = require('../../app');
const { connectToMongo, disconnectFromMongo } = require('../../db');
const User = require('../../models/User.model');


describe('Test authentication user signup', () => {
    beforeAll(async () => {
        await connectToMongo();
    });

    test('Should create a new user', (done) => {
        request(app)
            .post('/auth/signup')
            .send({
                username: 'john_doe',
                email: 'john@example.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password123',
                country: 'USA',
                address: '123 Main St',
                zipcode: '12345',
                phone: '1234567890'
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('username', 'john_doe');
                done();
            });
    });

    test('Should return 400 if username already exists', (done) => {
        request(app)
            .post('/auth/signup')
            .send({
                username: 'john_doe',
                email: 'john@example.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password123',
                country: 'USA',
                address: '123 Main St',
                zipcode: '12345',
                phone: '1234567890'
            })
            .expect(400, done);
    });

    test('Should return 422 if any required fields are missing', (done) => {
        request(app)
            .post('/auth/signup')
            .send({
                username: 'john_doe',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password123',
                country: 'USA',
                address: '123 Main St',
                zipcode: '12345',
                phone: '1234567890'
            })
            .expect(422, done);
    });

    test('Should return 422 if email is not in the correct format', (done) => {
        request(app)
            .post('/auth/signup')
            .send({
                username: 'john_doe',
                email: 'johnexamplecom',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password123',
                country: 'USA',
                address: '123 Main St',
                zipcode: '12345',
                phone: '1234567890'
            })
            .expect(422, done);
    });

    test('Should return 400 if phone is not in the correct format', (done) => {
        request(app)
            .post('/auth/signup')
            .send({
                username: 'john_doe',
                email: 'john@example.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password123',
                country: 'USA',
                address: '123 Main St',
                zipcode: '12345',
                phone: 'invalidphoneformat'
            })
            .expect(400, done);
    });

    afterAll(async () => {
        // Delete all records from the User collection
        await User.deleteMany({});
        await disconnectFromMongo();
    });
});
