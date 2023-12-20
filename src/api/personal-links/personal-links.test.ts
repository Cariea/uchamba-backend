// for testing
import app from '../../app'
import supertest from 'supertest'
import { TEST_PASSWORD, TEST_EMAIL } from '../../config'

// VARIABLES PARA LAS PETICIONES EN LOS TEST
// objeto de variables para mandar el body de la petición POST
const testObjectPost = {
  name: 'youtube',
  url: 'https://www.youtube.com/watch?v=w2C6RhQBYlg&list=RDVRUjdlCynU0&index=5'
}
// objeto de variables para mandar el body de la petición PUT
const testObjectPut = {
  name: 'facebook',
  url: 'https://web.whatsapp.com/'
}
// variable para almacenar el id de la carrera que se crea en la petición POST y usarlo en las peticiones GET-PUT-DELETE
let idGetPutDelete = ''
// variable para almacenar el token de autorización
let token = ''

describe('POST personal-links', () => {
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
      .post('/personal-links')
      .set('Authorization', `Bearer ${token}`)
      .send(testObjectPost)
    idGetPutDelete = response.body.link_id

    // Verificar que la respuesta tenga un estado de 201
    expect(response.statusCode).toBe(200)
  })
})

describe('GET personal-links/:linkId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get(`/personal-links/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('UPDATE personal-links/:linkId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .put(`/personal-links/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testObjectPut)

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('DELETE personal-links/:linkId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .delete(`/personal-links/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})
