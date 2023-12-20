// for testing
import app from '../../app'
import supertest from 'supertest'
import { TEST_PASSWORD, TEST_EMAIL } from '../../config'

// VARIABLES PARA LAS PETICIONES EN LOS TEST
// constante para mandar en el body de la petición POST
const proficientLevelPost = 'A1'
// constante para mandar en el body de la petición PUT
const proficientLevelPut = 'B2'
// variable para almacenar el id de la carrera que se crea en la petición POST y usarlo en las peticiones GET-PUT-DELETE
let idGetPutDelete = ''
// variable para almacenar el token de autorización
let token = ''
// constante para mandar el id del lenguaje por parametros en la petición POST
const languageIdparam = '14'

describe('POST user-languages/language/:languageId', () => {
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
      .post(`/user-languages/language/${languageIdparam}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        proficientLevel: proficientLevelPost
      })
    idGetPutDelete = response.body.languageId

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('GET user-languages/:languageId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .get(`/user-languages/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('UPDATE user-languages/language/:languageId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .put(`/user-languages/language/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        proficientLevel: proficientLevelPut
      })

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('DELETE user-languages/language/:languageId', () => {
  test('should respond with a 200 status code', async () => {
    // Enviar la solicitud con el token de autenticación
    const response = await supertest(app)
      .delete(`/user-languages/language/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})
