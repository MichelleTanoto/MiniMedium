const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
// supertest: provideshigh level abstraction for testing HTTP.
const api = supertest(app)

test('posts are returned as json', async () => {
  await api
    .get('/posts')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are four notes', async () => {
    const response = await api.get('/posts')
  
    expect(response.body.length).toBe(4)
  })

afterAll(() => {
  mongoose.connection.close()
})