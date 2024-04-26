const request =  require('supertest');
const app = require('../../app');
const { connectToMongo, disconnectFromMongo } = require('../../db');

describe('Test user management - updating user', () => {
    beforeAll(async() => {
        await connectToMongo();
    });

    test('Should update and return an updated user', (done) => {
        request(app)
            .post('/user/profile/662a76b212d26eb1e9589b94')
            .send({
                username: 'costa_silva',
                firstName: 'Costa',
                lastName: 'Silva',
                country: 'Spain',
                address: '50 Main str',
                zipcode: '1577',
                phone: '5902200054'
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('username', 'costa_silva');
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
    });
});