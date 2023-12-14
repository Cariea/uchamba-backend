// for testing
import app from '../../app'
import supertest from 'supertest'
import { TEST_PASSWORD, TEST_EMAIL } from '../../config'

// VARIABLES PARA LAS PETICIONES EN LOS TEST
// LA CANTIDAD DE USUARIOS QUE TENEMOS HASTA EL MOMENTO ES 8, POR LO TANTO ESE ES EL ÚLTIMO ID
// objeto de variables para mandar el body de la petición PUT
const testObject = {
  aboutMe: 'Acabo de graduarme',
  phoneNumber: '4121320792',
  residenceAddress: 'La Lucha'
}
// variable para mandar el id del usuario por parámetros en las peticiones GET-PUT
const idGetPut = '5'

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
      .get(`/users/${idGetPut}`)
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
      .put(`/users/${idGetPut}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testObject)

    // Verificar que la respuesta tenga un estado de 200
    expect(response.statusCode).toBe(200)
  })
})
