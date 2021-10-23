const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const removeAllUsers = async () => {
    await User.deleteMany({})
}

beforeAll(removeAllUsers)
afterAll(removeAllUsers)

const testUser = {
    name: 'Ertan',
    email: 'ertanturan@outlook.com',
    password: 'MyPass1982731892!'
}

test('Should signup a new user', async () => {
    await request(app).post('/users').send(testUser).expect(201)
})

test("Should login existing user", async () => {
    await request(app).post('/users/login').send(testUser).expect(200)
})

test("Should not login non-existing user",async ()=>{
    await request(app).post('/users/login').send({
        name:'Andrew',
        email:'some@email.com',
        password:'lkjqashuqij123817@'
    }).expect(400)
})