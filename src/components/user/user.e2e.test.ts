import express from 'express'
import request from 'supertest'

import App from '../../app'
import { startConnection } from '../../config'

import Factory from '../../helpers/factory'
import startFactory from '../../utils/factories'

import truncate from '../../helpers/truncate'

describe('POST /users', () => {
  let app: express.Application

  let factory: Factory

  beforeAll(async () => {
    await startConnection()

    app = new App().init()

    factory = startFactory()
  })

  beforeEach(async () => {
    await truncate()
  })

  afterAll(async () => {
    await truncate()
  })

  test('should return a bad request', async () => {
    const userFactory = factory.build('user', {
      name: '',
      password: '',
      email: '',
    })

    const result = await request(app).post('/api/v1/users').send(userFactory)

    expect(result.statusCode).toBe(400)
  })

  test('should create a new user', async () => {
    const userFactory = factory.build('user')

    const result = await request(app).post('/api/v1/users').send(userFactory)

    expect(result.statusCode).toBe(201)
  })
})
