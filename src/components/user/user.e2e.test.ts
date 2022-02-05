import express from 'express'
import request from 'supertest'

import App from '../../app'
import { startConnection } from '../../config'

describe('POST /users', () => {
  let app: express.Application

  beforeAll(async () => {
    await startConnection()

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

  test('should create a new user', async () => {
    const result = await request(app).post('/api/v1/users').send({
      name: 'Eduardo',
      email: 'test@test.com',
      password: '23232',
    })

    expect(result.statusCode).toBe(201)
  })
})
