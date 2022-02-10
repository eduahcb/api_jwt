import express from 'express'
import request from 'supertest'

import App from '../../app'
import { startConnection, closeConnection } from '../../config'

import Factory from '../../helpers/factory'
import startFactory from '../../utils/factories'

import truncate from '../../helpers/truncate'

describe('POST /users', () => {
  let app: express.Application

  let factory: Factory

  beforeEach(async () => {
    await startConnection()

    app = new App().init()

    factory = startFactory()

    await truncate()
  })

  afterEach(async () => {
    await truncate()
    await closeConnection()
  })

  test('should realize the login', async () => {
    const userFactory = await factory.create('user')

    const result = await request(app).post('/api/v1/login').send({
      email: userFactory.Email,
      password: '123',
    })

    expect(result.statusCode).toBe(204)
  })

  test('should return unauthorized status', async () => {
    const userFactory = await factory.create('user')

    const result = await request(app).post('/api/v1/login').send({
      email: userFactory.Email,
      password: '1234',
    })

    expect(result.statusCode).toBe(401)
  })
})