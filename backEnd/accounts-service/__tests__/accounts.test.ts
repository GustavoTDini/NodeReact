import request from "supertest";
import app from './../src/app'

describe('Testando rotas do accounts', () =>{

    it('GET /accounts/ - Deve retornar status 200', async () =>{
        const resultado = await request(app)
            .get('/accounts/');

        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

    it('POST /accounts/ - Deve retornar status 201', async () =>{
        const payload = {
            id: 1,
            name: 'Gustavo',
            email: 'e.mail@email.com',
            password: '123456',
        };

        const resultado = await request(app)
            .post('/accounts/')
            .send(payload);

        expect(resultado.status).toEqual(201);
        expect(resultado.body).toEqual(payload);
    })

    it('POST /accounts/ - Deve retornar status 422', async () =>{
        const payload = {
            id: 1,
            street: 1,
        };

        const resultado = await request(app)
            .post('/accounts/')
            .send(payload);

        expect(resultado.status).toEqual(422);
    })

    it('PATCH /accounts/:id - Deve retornar status 200', async () => {
        const payload = {
            name: 'Gustavo Dini',
            email: 'e.mail@email.com',
            password: '123456',
        };

        const resultado = await request(app)
            .patch('/accounts/1')
            .send(payload);

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toEqual(1);
    })

    it('PATCH /accounts/:id - Deve retornar status 404', async () => {
        const payload = {
            name: 'Gustavo Dini',
            email: 'e.mail@email.com',
            password: '123456',
        };

        const resultado = await request(app)
            .patch('/accounts/-1')
            .send(payload);

        expect(resultado.status).toEqual(404);
    })

    it('PATCH /accounts/:id - Deve retornar status 400', async () => {
        const payload = {
            name: 'Gustavo Dini',
            email: 'e.mail@email.com',
            password: '123456',
        };

        const resultado = await request(app)
            .patch('/accounts/abc')
            .send(payload);

        expect(resultado.status).toEqual(400);
    })

    it('GET /accounts/:id - Deve retornar status 200', async () =>{
        const resultado = await request(app)
            .get('/accounts/1');

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toEqual(1);
    })

    it('GET /accounts/:id - Deve retornar status 404', async () =>{
        const resultado = await request(app)
            .get('/accounts/-1');

        expect(resultado.status).toEqual(404);
    })

    it('GET /accounts/:id - Deve retornar status 400', async () =>{
        const resultado = await request(app)
            .get('/accounts/abc')

        expect(resultado.status).toEqual(400);
    })
})