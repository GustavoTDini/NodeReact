"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./../src/app"));
describe('Testando rotas do accounts', () => {
    it('POST /accounts/ - Deve retornar status 201', async () => {
        const payload = {
            id: 1,
            name: 'Gustavo',
            email: 'e-mail',
            password: '12345',
            status: 100,
        };
        const resultado = await (0, supertest_1.default)(app_1.default)
            .post('/accounts/')
            .send(payload);
        expect(resultado.status).toEqual(201);
    });
});
