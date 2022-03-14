import knex from '../database/connection';
import DatabaseError from '../models/errors/database.error.model';

import dayjs from 'dayjs';

class GenerateRefreshToken {

    async execute(userId: string){
        const user_id = userId;

        const expiresIn = dayjs().add(15, 'second').unix();

        const newRefreshToken = { expiresIn, user_id}

        try{
            const generateRefreshToken = await knex('refresh_tokens').insert(newRefreshToken).returning('id');
            
            return generateRefreshToken;
        }catch(error){
            throw new DatabaseError('Erro ao inserir o refresh token', error);
        }
        
    }
}

export default GenerateRefreshToken;