import request from "supertest";
import app from './../src/app'

describe('Testando rotas de autenticação', () =>{
    it('POST /accounts/login - Deve retornar status 200', async () =>{
        const newAccount = {
            id: 1,
            name: 'Gustavo',
            email: 'e.mail@email.com',
            password: '123456',
        };

        await request(app)
            .post('/accounts/')
            .send(newAccount);

        const payload = {
            email: 'e.mail@email.com',
            password: '123456',
        };
        
        const resultado = await request(app)
            .post('/accounts/login/')
            .send(payload);

        expect(resultado.status).toEqual(200);
        expect(resultado.body.auth).toBeTruthy();
        expect(resultado.body.token).toBeTruthy();
    })

    it('POST /accounts/login - Deve retornar status 422', async () =>{
        const payload = {
            email: 'e.mail@email.com',
            password: 'abc',
        };
        
        const resultado = await request(app)
            .post('/accounts/login/')
            .send(payload);

        expect(resultado.status).toEqual(422);
    })

    it('POST /accounts/login - Deve retornar status 401', async () =>{
        const payload = {
            email: 'e.mail@email.com',
            password: '123456789',
        };
        
        const resultado = await request(app)
            .post('/accounts/login/')
            .send(payload);

        expect(resultado.status).toEqual(401);
    })

    it('POST /accounts/logout - Deve retornar status 200', async () =>{
        const resultado = await request(app)
            .post('/accounts/logout/')

        expect(resultado.status).toEqual(200);
        expect(resultado.body.auth).toBeFalsy();
        expect(resultado.body.token).toBeFalsy();
    })
})