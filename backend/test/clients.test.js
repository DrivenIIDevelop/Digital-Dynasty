const request = require('supertest');
const app = require('../app');
const Client = require('../models/Client');

describe('Client API Endpoints', () => {
  beforeEach(async () => {
    // add some sample clients into the database before test
    await Client.create([
      { name: 'Client 1', email: 'client1@example.com', phone: '1234567890' },
      { name: 'Client 2', email: 'client2@example.com', phone: '0987654321' },
    ]);
  });

  afterEach(async () => {
    // clean up database after test
    await Client.deleteMany();
  });

  test('GET /clients - Success', async () => {
    // Send a GET request to /clients
    const response = await request(app).get('/clients');

    // xxpect status code 200
    expect(response.statusCode).toBe(200);

    // expect response body to be an array
    expect(Array.isArray(response.body)).toBe(true);

    // expect response body to have the inserted clients
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Client 1' }),
        expect.objectContaining({ name: 'Client 2' }),
      ])
    );
  });

  test('GET /clients - No Clients Found', async () => {
    // clear the created clients from database
    await Client.deleteMany();

    // send a GET request to /clients
    const response = await request(app).get('/clients');

    // expect status code 404
    expect(response.statusCode).toBe(404);

    // expect response body to contain a message indicating that no clients were found
    expect(response.body).toEqual({ message: 'No clients found' });
  });

  test('GET /clients/:client_id - Success', async () => {
    // Get the ID of the first client in the database
    const clients = await Client.find();
    const clientId = clients[0]._id;

    // Send a GET request to /clients/:client_id
    const response = await request(app).get(`/clients/${clientId}`);

    // Expect status code 200
    expect(response.statusCode).toBe(200);

    // Expect response body to contain the correct client details
    expect(response.body).toEqual(expect.objectContaining({ name: 'Client 1' }));
  });

  test('GET /clients/:client_id - Client Not Found', async () => {
    // Send a GET request to /clients with an invalid client ID
    const response = await request(app).get('/clients/invalid-id');

    // Expect status code 404
    expect(response.statusCode).toBe(404);

    // Expect response body to contain a message indicating client not found
    expect(response.body).toEqual({ message: 'Client not found' });
  });

  test('POST /clients - Success', async () => {
    // Send a POST request to /clients with valid client data
    const response = await request(app)
      .post('/clients')
      .send({ name: 'New Client', email: 'newclient@example.com', phone: '9876543210' });

    // Expect status code 201
    expect(response.statusCode).toBe(201);

    // Expect response body to contain the newly created client
    expect(response.body).toEqual(expect.objectContaining({ name: 'New Client' }));
  });

  test('POST /clients - Missing Required Fields', async () => {
    // Send a POST request to /clients without required fields
    const response = await request(app)
      .post('/clients')
      .send({});

    // Expect status code 400
    expect(response.statusCode).toBe(400);

    // Expect response body to contain a message indicating missing required fields
    expect(response.body).toEqual({ message: 'Name, email, and phone are required' });
  });

  // Add more test cases for POST /clients endpoint

  test('PUT /clients/:client_id - Success', async () => {
    // Get the ID of the first client in the database
    const clients = await Client.find();
    const clientId = clients[0]._id;

    // Send a PUT request to /clients/:client_id with updated data
    const response = await request(app)
      .put(`/clients/${clientId}`)
      .send({ name: 'Updated Client' });

    // Expect status code 200
    expect(response.statusCode).toBe(200);

    // Expect response body to contain the updated client details
    expect(response.body).toEqual(expect.objectContaining({ name: 'Updated Client' }));
  });

  // Add more test cases for PUT /clients/:client_id endpoint

  test('DELETE /clients/:client_id - Success', async () => {
    // Get the ID of the first client in the database
    const clients = await Client.find();
    const clientId = clients[0]._id;

    // Send a DELETE request to /clients/:client_id
    const response = await request(app).delete(`/clients/${clientId}`);

    // Expect status code 204
    expect(response.statusCode).toBe(204);

    // Expect client to be deleted from the database
    const deletedClient = await Client.findById(clientId);
    expect(deletedClient).toBeNull();
  });

  // Add more test cases for DELETE /clients/:client_id endpoint
});
