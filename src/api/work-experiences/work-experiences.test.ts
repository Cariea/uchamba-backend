// for testing
import app from '../../app'
import supertest from 'supertest'
import { TEST_PASSWORD, TEST_EMAIL } from '../../config'

// VARIABLES PARA LAS PETICIONES EN LOS TEST
// objeto de variables para mandar el body de la petición POST
const testObjectPost = {
  organizationName: 'Utech',
  jobTitle: 'programador',
  address: 'Alta Vista',
  entryDate: '2020-10-23',
  departureDate: '2005-04-03',
  description: 'Trabajo de desarrollador backend'
}
// objeto de variables para mandar el body de la petición PUT
const testObjectPut = {
  organizationName: 'Utech',
  jobTitle: 'administrador',
  address: 'Alta Vista',
  entryDate: '2022-09-15',
  departureDate: '2005-04-03',
  description: 'Trabajo como administrador de la empresa'
}
// variable para almacenar el id de la carrera que se crea en la petición POST y usarlo en las peticiones GET-PUT-DELETE
let idGetPutDelete = ''
// variable para almacenar el token de autorización
let token = ''

describe('POST work-experiences', () => {
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
      .post('/work-experiences')
      .set('Authorization', `Bearer ${token}`)
      .send(testObjectPost)
    idGetPutDelete = response.body.workExpId

    // Verificar que la respuesta tenga un estado de 201
    expect(response.statusCode).toBe(201)
  })
})

describe('GET work-experiences/:workExpId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get(`/work-experiences/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('UPDATE work-experiences/:workExpId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .put(`/work-experiences/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testObjectPut)

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('DELETE work-experiences/:workExpId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .delete(`/work-experiences/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})
