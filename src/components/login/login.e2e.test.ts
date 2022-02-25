import express from 'express'
import request from 'supertest'

import App from '@src/app'
import { DBConnection } from '@src/config'

import Factory from '@src/helpers/factory'
import startFactory from '@src/utils/factories'

import truncate from '@src/helpers/truncate'

describe('POST /login', () => {
  let app: express.Application
  let connection: DBConnection
  let factory: Factory

  beforeEach(async () => {
    connection = new DBConnection()

    await connection.start()

    app = new App().init()

    factory = startFactory()

    await truncate()
  })

  afterEach(async () => {
    await truncate()
    await connection.close()
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
