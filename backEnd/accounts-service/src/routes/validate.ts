import { Request, Response } from "express";
import { accountSchema, loginSchema, updateSchema } from "../models/accountsSchema";
import Joi from "joi";
import { access } from "fs";
import auth from "../auth";

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

function validateUpdate(req: Request, res: Response, next: any){
    return validateSchema(updateSchema, req, res, next)
}

function validateAuth(req: Request, res: Response, next: any){
    try {
        const token = req.headers['x-access-token'] as string;
        if (!token){
            res.status(401).end();
        }
        const payload = auth.verify(token);
        if (!payload){
            res.status(401).end();
        }
        res.locals.payload = payload;
        next();
    } catch (error) {
        console.log(`Validate Auth: ${error}`);
        res.status(400).end();
    }
}

export {validateAccount, validateLogin, validateUpdate, validateAuth};