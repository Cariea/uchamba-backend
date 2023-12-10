// for testing
import app from '../app'
import supertest from 'supertest'
import { TEST_PASSWORD, TEST_EMAIL } from '../config'

// VARIABLES PARA LAS PETICIONES EN LOS TEST
// LA CANTIDAD DE USUARIOS QUE TENEMOS HASTA EL MOMENTO ES 8, POR LO TANTO ESE ES EL ÚLTIMO ID
const idPut = '5'
const aboutMePut = 'Acabo de graduarme'
const phoneNumberPut = '4121320792'
const residenceAddressPut = 'Moreno De Mendoza'
const idDelete = '8'

describe('GET users/all', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud
    const response = await supertest(app)
      .get('/users/all')
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })

  test('should respond with an array', async () => {
    // Enviar la solicitud
    const response = await supertest(app)
      .get('/users/all')
      .send()

    // Verificar que la respuesta sea de tipo Array
    expect(response.body).toBeInstanceOf(Array)
  })
})

describe('GET users/:userId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud
    const response = await supertest(app)
      .get('/users/7')
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('GET users/', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud
    const response = await supertest(app)
      .get('/users')
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('UPDATE users/:userId', () => {
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
      .put(`/users/${idPut}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        aboutMe: aboutMePut,
        phoneNumber: phoneNumberPut,
        residenceAddress: residenceAddressPut
      })

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('DELETE users/:userId', () => {
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
      .delete(`/users/${idDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})
