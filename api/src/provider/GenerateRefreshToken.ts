import knex from '../database/connection';
import DatabaseError from '../models/errors/database.error.model';

import dayjs from 'dayjs';


//FUNÇÃO PARA GERAR O REFRESH TOKEN, PASSANDO SEU TEMPO E INSERINDO O TOKEN GERADO NO BANCO
class GenerateRefreshToken {

    async execute(userId: string){
        const user_id = userId;

        const expiresIn = dayjs().add(300, 'second').unix();

        const newRefreshToken = { expiresIn, user_id}

        try{
            let generateRefreshToken = await knex('refresh_tokens').insert(newRefreshToken).returning('id');
            generateRefreshToken = generateRefreshToken[0].id
            
            return generateRefreshToken;
        }catch(error){
            throw new DatabaseError('Erro ao inserir o refresh token', error);
        }
        
    }
}

export default GenerateRefreshToken;