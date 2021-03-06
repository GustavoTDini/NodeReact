import Joi from 'joi';

const accountSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    name: Joi.string()
        .min(3)
        .max(150)
        .required(),
    email: Joi.string()
        .email()
        .required()
        .min(8)
        .max(150),
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(150)
        .required(),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    domain: Joi.string()
        .min(6)
        .max(150)
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .min(8)
        .max(150),
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(150)
        .required()
});

const updateSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150),
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(150),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400)
});

export {accountSchema, loginSchema, updateSchema};