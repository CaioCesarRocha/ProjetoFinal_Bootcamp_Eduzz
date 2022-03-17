import express from 'express';
import {celebrate, Joi} from 'celebrate';
import UserController from '../controllers/UserController';

const userRoutes = express.Router();

const userController = new UserController();


userRoutes.get('/user', userController.login)

//ROTA PARA CRIAÇÃO DO USUÁRIO
userRoutes.post(
    '/user',
    celebrate({  //validação dos campos no back
        body: Joi.object().keys({
            username: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            admin: Joi.boolean().required(),
        })
    },{
        abortEarly: false, //valida todos de uma vez (nao trava no primeiro)
    }),
    userController.create
);


export default userRoutes;