import supertest from "supertest";
import chai from "chai";
import { faker } from "@faker-js/faker";

const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

let cookie
let userId
let productId

describe('Registro, Login and Current', ()=>{
    const mockUser = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: '123',
        age: faker.random.numeric(2)
    }
    it('Debe registrar un usuario', async ()=>{
        const {status} = await requester.post('/api/users/register').send(mockUser)
        expect(status).to.be.eql(302)

    })
    it('Debe loguear un usuario y devolver una cookie', async ()=>{
        const result = await requester.post('/session/login').send({
            email: mockUser.email,
            password: mockUser.password
        })
        // COOKIE_NAME= COOKIE_VALUE
        const cookieResult = result.headers['set-cookie'][0]

        expect(cookieResult).to.be.ok

        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1]
        }
        expect(cookie.name).to.be.ok.and.eql('auth')
        expect(cookie.value).to.be.ok

    })
   it('Enviar cookie para ver el contenido del user', async() =>{
        const {_body} = await requester.get('/api/users/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
        expect(_body.email).to.be.eql(mockUser.email)
    })
})

describe('Products controller', () => {
      it('Debe devolver la lista de productos', async () => {
        const res = await requester.get('/api/products/products');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.payload).to.be.an('array');
      });
     it('Debe crear un nuevo producto', async () => {
        const product = {
        title: 'Test product',
        description: 'This is a test product',
        price: 100,
        code: faker.random.numeric(5),
        stock: 10,
        category: 'Test',
        thumbnails: ['https://example.com/image.jpg']
                };
        const res = await requester.post('/api/products/').send(product).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(res.status).to.be.eql(200)
        expect(res.body).to.be.an('object');
        expect(res.body).to.has.property('owner')

        productId = res.body._id; 

    });
    it('Debe borrar el producto creado', async () => {
        const res = await requester.delete(`/api/products/${productId}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
});


describe('Carts controller', () => {
    it('Debe crear un nuevo cart', async () => {
        const res = await requester.post('/api/carts');
        expect(res.status).to.be.eql(200);
        expect(res.body).to.have.property('_id');
    });
    it('Debe devolver un 404 para un id inválido', async () => {
        const res = await requester.get('/carts/invalid-id');
        expect(res.status).to.equal(404);
    });
    it('Debe devolver todos los carts', async () => {
        const res = await requester.get('/api/carts');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

})