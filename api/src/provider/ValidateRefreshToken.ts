import knex from '../database/connection';
import GenerateToken from './GenerateToken';

import dayjs from 'dayjs';
import GenerateRefreshToken from './GenerateRefreshToken';


class ValidateRefreshToken {
    async execute(refresh_Token: any){
        const id = refresh_Token;
        
        const refreshToken = await knex('refresh_tokens').where('id', id).first();
       
        if(!refreshToken){ 
            throw new Error('refresh token inválido');
        }
        //verifica se a data atual vem dps do token (= expirado)
        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

        if(refreshTokenExpired){
            await knex('refresh_tokens').where('user_id', refreshToken.user_id ).del()//deleta os tokens expirados daquele id;
            return ('expired')
        }

        const generateToken = new GenerateToken();
        const newAccessToken = await generateToken.execute(refreshToken.user_id);

        await knex('refresh_tokens').where('user_id', refreshToken.user_id ).del()
        const generateRefreshToken = new GenerateRefreshToken()
        const newRefreshToken = await generateRefreshToken.execute(refreshToken.user_id)
   
        const newTokens = {newAccessToken, newRefreshToken}

        return (newTokens);
    }
}


export default ValidateRefreshToken;