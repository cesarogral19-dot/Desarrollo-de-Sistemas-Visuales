const request = require('supertest')
const app = require('../src/app')
const connectDB = require('../src/config/db')

beforeAll(async () => {
  process.env.NODE_ENV = 'test'
  await connectDB()
})

afterAll(async () => {
  await require('../src/config/db').close()
})

describe('Auth endpoints', () => {
  test('register -> creates user and sets cookie', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Tester', email: 'tester@example.com', password: 'secret1' })
      .expect(200)

    expect(res.body.user).toHaveProperty('email', 'tester@example.com')
  })

  test('login -> returns cookie and user', async () => {
    await request(app).post('/api/auth/register').send({ name: 'Login', email: 'login@example.com', password: 'secret1' })
    const res = await request(app).post('/api/auth/login').send({ email: 'login@example.com', password: 'secret1' }).expect(200)
    expect(res.headers['set-cookie']).toBeDefined()
    expect(res.body.user.email).toBe('login@example.com')
  })

  test('me -> requires cookie', async () => {
    const agent = request.agent(app)
    await agent.post('/api/auth/register').send({ name: 'Me', email: 'me@example.com', password: 'secret1' })
    await agent.post('/api/auth/login').send({ email: 'me@example.com', password: 'secret1' })
    const meRes = await agent.get('/api/auth/me').expect(200)
    expect(meRes.body.user.email).toBe('me@example.com')
  })
})
