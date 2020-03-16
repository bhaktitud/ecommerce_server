const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


//dummy data to check whether the test working or not
let dummyData = {
    email : 'hasangundul@mail.com',
    password : 'hasan12345'
}

//dummy wrong password
const wrongPass = 'helo'

describe('User routes' , () => {
    //delete all tested data everytime you run the test file
    // afterEach((done) => {
    //     queryInterface.bulkDelete('Users', {})
    //     .then(_ => {
    //         done()
    //     }).catch((err) => {
    //         done(err)
    //     });
    // })
    //test register route
    describe('success POST /register', () => {
        test('sending object (email, id) with status code 201 ', (done) => {
            
            request(app)
            .post('/register')
            .send(dummyData)
            .end((err, res) => {
                // console.log(res);
                expect(err).toBe(null)
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('email', dummyData.email)
                expect(res.body).toHaveProperty('id', expect.any(Number))
                //done() must be included to break the process
                done()
            })
        })
    
    })

    // describe('error POST /register', () => {

    //     test('sending error with status 401 due to error in validation ', (done) => {
    //         //replacing data.password with the wrong one
    //         const wrongPassFormat = { ...dummyData, password : wrongPass }

    //         request(app)
    //         .post('/register')
    //         .send(wrongPassFormat)
    //         .end((err, res) => {
    //             expect(err).toBe(null)
    //             expect(res.status).toBe(400)
    //             expect(res.body).toHaveProperty('message', 'Bad Request')
    //             expect(res.body).toHaveProperty('errors', expect.any(Array))
    //             expect(res.body.errors).toContain('minimum password length is 5 characters')
    //             expect(res.body.errors.length).toBeGreaterThan(0)
    //             done()
    //         })
    //     })

    //     test('sending error with status 401 due to missing email value ', (done) => {
    //         //replacing data.password with the wrong one
    //         const emptyEmailFormat = { ...dummyData }
    //         delete emptyEmailFormat.email

    //         request(app)
    //         .post('/register')
    //         .send(emptyEmailFormat)
    //         .end((err, res) => {
    //             expect(err).toBe(null)
    //             expect(res.status).toBe(400)
    //             expect(res.body).toHaveProperty('message', 'Bad Request')
    //             expect(res.body).toHaveProperty('errors', expect.any(Array))
    //             expect(res.body.errors).toContain('email is required')
    //             expect(res.body.errors.length).toBeGreaterThan(0)
    //             done()
    //         })
    //     })
    // })

    describe('Success POST /login', () => {
        test('sending access token with status code 200', (done) => {

            // console.log(dummyData);
            
            request(app)
            .post('/login')
            .send(dummyData)
            .end((err, res) => {
                
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('access_token', expect.any(String))
                done()
            })
        })
    })

    // describe('Error POST /login', () => {
    //     test('sending error with status code 401', (done) => {
    //         request(app)
    //         .post('/login')
    //         .send(dummyData)
    //         .end((err, res) => {
                
    //             done()
    //         })
    //     })
    // })


})