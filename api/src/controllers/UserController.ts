import {Request, Response} from 'express';
import knex from '../database/connection';
import DatabaseError from '../models/errors/database.error.model';

import crypto from 'crypto'; //gerar um hash aleatorio de dados
import { StatusCodes } from 'http-status-codes';


const algorithm = 'aes-256-ctr';
const secret = process.env.SECRET

let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
let iv = crypto.randomBytes(16);


class UserController {

    //cria o usuário no banco ja com senha criptografada
    async create (req: Request, res: Response){      
        const {
            username,
            email,
            admin
        } = req.body;

        let password = req.body.password

        const cipher = crypto.createCipheriv(String(algorithm), key, iv);
        let encrypted = cipher.update(password);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        password = iv.toString('hex') + ':' + encrypted.toString('hex');

        const user = { username, email, password, admin}

        try{
            const newUser = await knex('users').insert(user).returning('id');
            const userId = newUser[0].id;
            return res.json({
                userId: userId,
                ...user,
            });        
        }catch(error){
            throw new DatabaseError('Erro ao inserir o usuário', error);
        }
    }


    async login (req: Request, res: Response){
        const {
            email,
            password
        } = req.body;

        try{                 
            const user = await knex('users').where('email', email).first()

            if(!user){
                return res.status(StatusCodes.BAD_REQUEST).json({wrongPass: true})
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
                const userLogged = {id: user.id, username: user.username, email: user.email, admin: user.admin}
                return res.status(StatusCodes.OK).json(user)
            }
            else{
                return res.status(StatusCodes.BAD_REQUEST).json({wrongPass: true})
            }  
        } 
        catch(error){
            throw new DatabaseError('Erro ao buscar o usuário', error);
        }
    }



 


}

export default UserController;