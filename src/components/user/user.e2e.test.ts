import express from 'express'
import request from 'supertest'

import App from '@src/app'
import { DBConnection } from '@src/config'

import Factory from '@src/helpers/factory'
import startFactory from '@src/utils/factories'

import truncate from '@src/helpers/truncate'

describe('users routes', () => {
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

  beforeAll(async () => {
    connection = new DBConnection()
    await connection.start()
    app = new App().init()
  })

  afterAll(async () => {
    await connection.close()
  })

  describe('POST /users', () => {
    beforeEach(async () => {
      factory = startFactory()
      await truncate()
    })

    afterEach(async () => {
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

  describe('GET /users', () => {
    beforeEach(async () => {
      factory = startFactory()
      await truncate()
    })

    afterEach(async () => {
      await truncate()
    })

    test('should return no users', async () => {
      const result = await request(app).get('/api/v1/users').send({})

      expect(result.statusCode).toBe(200)
      expect(result.body).toStrictEqual([])
    })

    test('should return one user', async () => {
      await factory.create('user')

      const result = await request(app).get('/api/v1/users').send({})

      expect(result.statusCode).toBe(200)
      expect(result.body[0]).toHaveProperty('id')
      expect(result.body[0]).toHaveProperty('name')
      expect(result.body[0]).toHaveProperty('email')
      expect(result.body[0]).toHaveProperty('createdAt')
    })
  })

  describe('GET /users/:id', () => {
    beforeEach(async () => {
      factory = startFactory()

      await truncate()
    })

    afterEach(async () => {
      await truncate()
    })

    test('should return not found', async () => {
      const id = '41ebb87d-293b-405c-ab19-f97ecd1373d5'

      const result = await request(app).get(`/api/v1/users/${id}`).send({})

      expect(result.statusCode).toBe(404)
    })

    test('should return not found', async () => {
      const user = await factory.create('user')

      const result = await request(app).get(`/api/v1/users/${user.Id}`).send({})

      expect(result.statusCode).toBe(200)
    })
  })

  describe('DELETE /users/:id', () => {
    beforeEach(async () => {
      factory = startFactory()

      await truncate()
    })

    afterEach(async () => {
      await truncate()
    })

    test('should return not found', async () => {
      const userFactory = await factory.create('user')

      const token = await shouldMakeLogin(userFactory.Email, '123')

      const id = '41ebb87d-293b-405c-ab19-f97ecd1373d5'

      const result = await request(app)
        .delete(`/api/v1/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({})

      expect(result.statusCode).toBe(404)
    })

    test('should delete a user', async () => {
      const userFactory = await factory.create('user')

      const token = await shouldMakeLogin(userFactory.Email, '123')

      const result = await request(app)
        .delete(`/api/v1/users/${userFactory.Id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({})

      expect(result.statusCode).toBe(204)
    })
  })
})
