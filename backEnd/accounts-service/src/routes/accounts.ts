import { Router, Request, Response } from "express";
import accountsControler from "../controllers/accounts";
import { accountSchema, loginSchema } from "../models/account";
import Joi from 'joi';

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any){
    const{error} = schema.validate(req.body);
    if (error == null) {
        return next()
    }
    const {details} = error;
    const message = details.map(item => item.message).join(',');

    console.log(message)
    res.status(422).end()
}

function validateAccount(req: Request, res: Response, next: any){
    return validateSchema(accountSchema, req, res, next)
}

function validateLogin(req: Request, res: Response, next: any){
    return validateSchema(loginSchema, req, res, next)
}

const router = Router();

router.get('/accounts/', accountsControler.getAccounts);

router.get('/accounts/:id', accountsControler.getAccount);

router.post('/accounts/', validateAccount, accountsControler.addAccount)

router.patch('/accounts/:id', validateAccount, accountsControler.setAccount)

router.post('/accounts/login/', validateLogin, accountsControler.loginAccount)

router.post('/accounts/logout/', accountsControler.logoutAccount)

export default router;