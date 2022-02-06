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
