import knex from '../database/connection';
import DatabaseError from '../models/errors/database.error.model';

import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class GenerateToken {
    async execute(userId: string){

        const jwtPayload = { subject: userId};             
        const secretKey:string = process.env.SECRETKEY!; //o sinal ! diz ao TypeScript que, embora pareça ser nulo, ele pode confiar em você que não é.
        const jwt = JWT.sign(jwtPayload, secretKey, {expiresIn: "20s"});

        return jwt;    
    }
}

export default GenerateToken;