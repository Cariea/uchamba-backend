// for testing
import app from '../../app'
import supertest from 'supertest'
import { TEST_PASSWORD, TEST_EMAIL } from '../../config'

// VARIABLES PARA LAS PETICIONES EN LOS TEST
// constante para mandar en el body de la petición POST
const namePost = 'Comunicaión asertiva'
// constante para mandar en el body de la petición PUT
const namePut = 'Carisma'
// variable para almacenar el id de la carrera que se crea en la petición POST y usarlo en las peticiones GET-PUT-DELETE
let idGetPutDelete = ''
// variable para almacenar el token de autorización
let token = ''

describe('POST soft-skills', () => {
  test('should respond with a 200 status code', async () => {
    // Obtener el token de autenticación
    const authResponse = await supertest(app)
      .post('/auth/login')
      .send({
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      })

    // Almacenar el token en una variable
    token = authResponse.body.token

    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .post('/soft-skills')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: namePost
      })
    idGetPutDelete = response.body.softSkillId

    // Verificar que la respuesta tenga un estado de 201
    expect(response.statusCode).toBe(200)
  })
})

describe('GET soft-skills/:softSkillId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get(`/soft-skills/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('UPDATE soft-skills/:softSkillId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .put(`/soft-skills/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: namePut
      })

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('DELETE soft-skills/:softSkillId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .delete(`/soft-skills/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('GET soft-skills/all', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get('/soft-skills/all')
      .set('Authorization', `Bearer ${token}`)
      .send()
    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })

  test('should respond with an array', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get('/soft-skills/all')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta sea de tipo Array
    expect(response.body).toBeInstanceOf(Array)
  })
})

describe('GET soft-skills', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get('/soft-skills')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})
