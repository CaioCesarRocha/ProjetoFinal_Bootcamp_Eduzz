import { NextFunction, Request, Response } from "express";
import knex from '../database/connection';
import DatabaseError from '../models/errors/database.error.model';
import ForbiddenError from "../models/errors/forbidden.error.model";

import crypto from 'crypto'; //gerar um hash aleatorio de dados
//import { StatusCodes } from 'http-status-codes';


const algorithm = 'aes-256-ctr';
const secret = process.env.SECRET

let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);


async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    const {
        email,
        password
    } = req.body;

    console.log("BASIC AUTENTICATION", email, password)

    try{                 
        const user = await knex('users').where('email', email).first()

        if(!user){
            return res.json({wrongPass: true})
        }

        let cryptoPassword = user.password;

        let textParts = cryptoPassword.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        cryptoPassword = decrypted.toString();

        if(cryptoPassword === password){
            const userLogged = {uuid: user.id, username: user.username, email: user.email, admin: user.admin}
            req.user = userLogged;
            next();
        }
        else{
           return res.json({wrongPass: true})
        }  
    } 
    catch(error){
        throw new DatabaseError('Erro ao buscar o usuário', error);
    }
}

export default basicAuthenticationMiddleware;