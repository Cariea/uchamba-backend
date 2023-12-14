// for testing
import app from '../../app'
import supertest from 'supertest'
import { TEST_PASSWORD, TEST_EMAIL } from '../../config'

// VARIABLES PARA LAS PETICIONES EN LOS TEST
// LAS CARRERAS DE LA UCAB SON 9, POR LO TANTO EL ID DE LA ÚLTIMA CARRERA ES 9
const namePost = 'OLAMAMAMA'
const namePut = 'Mecanica'
let idPutDelete = ''

describe('GET careers/all', () => {
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
      .get('/careers/all')
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
      .get('/careers/all')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta sea de tipo Array
    expect(response.body).toBeInstanceOf(Array)
  })
})

describe('GET careers/:careerId', () => {
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
      .get('/careers/8')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('GET careers/', () => {
  test('careers/ should respond with a 200 status code', async () => {
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
      .get('/careers')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('POST careers/', () => {
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
      .post('/careers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: namePost
      })
    idPutDelete = response.body.ucareerId

    // Verificar que la respuesta tenga un estado de 201
    expect(response.statusCode).toBe(201)
  })
})

describe('UPDATE careers/:careerId', () => {
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
      .put(`/careers/${idPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: namePut
      })

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('DELETE careers/:careerId', () => {
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
      .delete(`/careers/${idPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})
