// for testing
import app from '../../app'
import supertest from 'supertest'
import { TEST_PASSWORD, TEST_EMAIL } from '../../config'

// VARIABLES PARA LAS PETICIONES EN LOS TEST
// LAS CARRERAS DE LA UCAB SON 9, POR LO TANTO EL ID DE LA ÚLTIMA CARRERA ES 9
const testObjectPost = {
  name: 'Electrónica',
  universityName: 'UNEXPO',
  degree: 'pregrado',
  graduationDate: '2023-06-08'
}
const testObjectPut = {
  name: 'Mecánica',
  universityName: 'UNEXPO',
  degree: 'pregrado',
  graduationDate: '2023-10-14'
}
let idGetPutDelete = ''

describe('POST foreign-studies/', () => {
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
      .post('/foreign-studies')
      .set('Authorization', `Bearer ${token}`)
      .send(testObjectPost)
    idGetPutDelete = response.body.foreign_study_id

    // Verificar que la respuesta tenga un estado de 201
    expect(response.statusCode).toBe(200)
  })
})

describe('GET foreign-studies/:foreignStudyId', () => {
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
      .get(`/foreign-studies/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('UPDATE foreign-studies/:foreignStudyId', () => {
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
      .put(`/foreign-studies/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testObjectPut)

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})

describe('DELETE foreign-studies/:foreignStudyId', () => {
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
      .delete(`/foreign-studies/${idGetPutDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})
