import express from 'express'
import request from 'supertest'

import App from '../../app'
import { DBConnection } from '../../config'

import Factory from '../../helpers/factory'
import startFactory from '../../utils/factories'

import truncate from '../../helpers/truncate'

describe('POST /logout', () => {
  let app: express.Application
  let connection: DBConnection
  let factory: Factory

  const shouldMakeLogin = async (email: string, password: string) => {
    // const userFactory = await factory.create('user')

    const result = await request(app).post('/api/v1/login').send({
      email,
      password,
    })

    return result.headers.authorization
  }

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

  test('should realize the logout', async () => {
    const userFactory = await factory.create('user')

    const token = await shouldMakeLogin(userFactory.Email, '123')

    const result = await request(app)
      .get('/api/v1/logout')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(result.statusCode).toBe(204)
  })

  test('should return unauthorized status', async () => {
    const userFactory = await factory.create('user')

    const token = await shouldMakeLogin(userFactory.Email, '123')

    const result = await request(app)
      .get('/api/v1/logout')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(result.statusCode).toBe(204)

    const result2 = await request(app)
      .get('/api/v1/logout')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(result2.body).toStrictEqual({
      message: 'Invalid token by logout',
      statusCode: 401,
    })
  })
})
