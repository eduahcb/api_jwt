import express from 'express'
import request from 'supertest'

import App from '../../app'

describe('POST /users', () => {
  let app: express.Application

  beforeAll(async () => {
    app = new App().init()
  })

  test('should return a bad request', async () => {
    const result = await request(app).post('/api/v1/users').send({
      name: '',
      email: '',
      password: '',
    })

    expect(result.statusCode).toBe(400)
  })
})
