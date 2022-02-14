import {Request, Response} from 'express';
import knex from '../database/connection';
import DatabaseError from '../models/errors/database.error.model';

import crypto from 'crypto'; //gerar um hash aleatorio de dados
import { StatusCodes } from 'http-status-codes';
import JWT from 'jsonwebtoken';


const algorithm = 'aes-256-ctr';
const secret = process.env.SECRET

let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
let iv = crypto.randomBytes(16);



class UserController {

    async create (req: Request, res: Response){
        
        const {
            username,
            email,
            admin
        } = req.body;

        let password = req.body.password

        console.log(algorithm)

        const cipher = crypto.createCipheriv(String(algorithm), key, iv);
        let encrypted = cipher.update(password);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        password = iv.toString('hex') + ':' + encrypted.toString('hex');

        const user = { username, email, password, admin}
        console.log(user);

        /*try{
            const newUser = await knex('users').insert(user).returning('id');
            const userId = newUser[0].id;
            return res.json({
                userId: userId,
                ...user,
            });        
        }catch(error){
            throw new DatabaseError('Erro ao inserir o usuário', error);
        }*/
    }

    
}

export default UserController;