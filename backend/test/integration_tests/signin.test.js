const request = require('supertest');
const app =  require('../../app');
const { connectToMongo, disconnectFromMongo } = require('../../db');


describe('Test authentication user signin', () => {
    beforeAll(async () => {
        await connectToMongo();
    });

    test('Should login the user and generate a token if the user credentials are valid', (done) => {
        request(app)
            .post('/auth/login')
            .send({
                username: 'john_doe',
                password: 'password123'
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('token');
                done();
            });
    });

    test('Should return 401 if username or password is not provided', (done) => {
        request(app)
            .post('/auth/login')
            .send({
                username: 'john_doe'
            })
            .expect(401, done);
    });

    test('Should return 404 if there is no user with provided username', (done) => {
        request(app)
            .post('/auth/login')
            .send({
                username: 'johnd_doe',
                password: 'password123'
            })
            .expect(404, done);
    });

    test('Should return 401 if password do not match', (done) => {
        request(app)
            .post('/auth/login')
            .send({
                username: 'john_doe',
                password: 'password12345'
            })
            .expect(401, done);
    });

    afterAll(async () => {
        await disconnectFromMongo();
    });
});