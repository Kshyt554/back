const request = require('supertest');
const app = require('../index'); 

describe('Shopping List API', () => {
  it('should create a new shopping list', async () => {
    const res = await request(app)
      .post('/shoppingList/create')
      .send({
        name: 'Weekly Groceries',
        ownerId: '123456',
        members: ['123457']
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Weekly Groceries');
  });
});
