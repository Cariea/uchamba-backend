// for testing
import app from '../../app'
import supertest from 'supertest'
import { TEST_PASSWORD, TEST_EMAIL } from '../../config'

// VARIABLES PARA LAS PETICIONES EN LOS TEST
// LAS CARRERAS DE LA UCAB SON 9, POR LO TANTO EL ID DE LA ÚLTIMA CARRERA ES 9
const namePost = 'Manejo de apuntadores'
const namePut = 'Manejo de cadenas'
let idGetPutDelete = ''

describe('POST /hard-skills', () => {
  test('should respond with a 200 status code', async () => {
    // Obtener el token de autenticación
    const authResponse = await supertest(app)
      .post('/auth/login')
      .send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      })

    // Almacenar el token en una variable
    const token: string = authResponse.body.token

    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .post('/hard-skills')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: namePost
      })
    idGetPutDelete = response.body.hardSkillId

    // Verificar que la respuesta tenga un estado de 201
    expect(response.statusCode).toBe(200)
  })
})

describe('GET hard-skills/:hardSkillId', () => {
  test('should respond with a 200 status code', async () => {
    // Obtener el token de autenticación
    const authResponse = await supertest(app)
      .post('/auth/login')
      .send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      })

    // Almacenar el token en una variable
    const token: string = authResponse.body.token

    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get(`/hard-skills/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('GET hard-skills/all', () => {
  test('should respond with a 200 status code', async () => {
    // Obtener el token de autenticación
    const authResponse = await supertest(app)
      .post('/auth/login')
      .send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      })

    // Almacenar el token en una variable
    const token: string = authResponse.body.token

    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get('/hard-skills/all')
      .set('Authorization', `Bearer ${token}`)
      .send()
    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })

  test('should respond with an array', async () => {
    // Obtener el token de autenticación
    const authResponse = await supertest(app)
      .post('/auth/login')
      .send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      })

    // Almacenar el token en una variable
    const token: string = authResponse.body.token

    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get('/hard-skills/all')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta sea de tipo Array
    expect(response.body).toBeInstanceOf(Array)
  })
})

describe('GET hard-skills/', () => {
  test('should respond with a 200 status code', async () => {
    // Obtener el token de autenticación
    const authResponse = await supertest(app)
      .post('/auth/login')
      .send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      })

    // Almacenar el token en una variable
    const token: string = authResponse.body.token

    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get('/hard-skills')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('UPDATE hard-skills/:hardSkillId', () => {
  test('should respond with a 200 status code', async () => {
    // Obtener el token de autenticación
    const authResponse = await supertest(app)
      .post('/auth/login')
      .send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      })

    // Almacenar el token en una variable
    const token: string = authResponse.body.token

    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .put(`/hard-skills/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: namePut
      })

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('DELETE hard-skills/:hardSkillId', () => {
  test('should respond with a 200 status code', async () => {
    // Obtener el token de autenticación
    const authResponse = await supertest(app)
      .post('/auth/login')
      .send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      })

    // Almacenar el token en una variable
    const token: string = authResponse.body.token

    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .delete(`/hard-skills/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})
