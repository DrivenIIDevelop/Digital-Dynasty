const request = require('supertest');
const app = require('../../app');
const { connectToMongo, disconnectFromMongo } = require('../../db');

describe('Test user management - retrieving a user', () => {
    beforeAll(async() => {
        await connectToMongo();
    });

    test('Should retrieve and return a user', (done) => {
        request(app)
            .post('/user/profile/662a76b212d26eb1e9589b94')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('_id', '662a76b212d26eb1e9589b94');
                done();
            })
    });

    test('Should return a 404 if no user exists for the given user', (done) => {
        request(app)
            .post('/user/profile/662a76b212d26eb1e9589b93')
            .expect(404, done);
    });

    afterAll(async() => {
        await disconnectFromMongo();
    })
});