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

describe('Requests API', () => {
  test('POST /api/requests requires auth', async () => {
    await request(app).post('/api/requests').send({ title: 'x', description: 'long enough description', amount: 100 }).expect(401)
  })

  test('Authenticated user can create a request', async () => {
    const agent = request.agent(app)
    await agent.post('/api/auth/register').send({ name: 'ReqUser', email: 'req@example.com', password: 'secret1' })
    await agent.post('/api/auth/login').send({ email: 'req@example.com', password: 'secret1' })
    const res = await agent.post('/api/requests').send({ title: 'Compra', description: 'Descripción válida larga', amount: 120 }).expect(201)
    expect(res.body.title).toBe('Compra')
  })

  test('Validation prevents bad amount', async () => {
    const agent = request.agent(app)
    await agent.post('/api/auth/register').send({ name: 'V', email: 'v@example.com', password: 'secret1' })
    await agent.post('/api/auth/login').send({ email: 'v@example.com', password: 'secret1' })
    await agent.post('/api/requests').send({ title: 't', description: 'short', amount: -10 }).expect(400)
  })

  test('PDF export returns application/pdf', async () => {
    const agent = request.agent(app)
    await agent.post('/api/auth/register').send({ name: 'Pdf', email: 'pdf@example.com', password: 'secret1' })
    await agent.post('/api/auth/login').send({ email: 'pdf@example.com', password: 'secret1' })
    const res = await agent.get('/api/pdf/export').expect(200)
    expect(res.headers['content-type']).toMatch(/application\/pdf/)
  })
})
