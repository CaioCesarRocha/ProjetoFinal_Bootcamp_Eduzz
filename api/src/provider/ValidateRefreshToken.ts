import knex from '../database/connection';
import GenerateToken from './GenerateToken';


class ValidateRefreshToken {
    async execute(refresh_Token: string){
        const id = refresh_Token;
        const refreshToken = await knex('refresh_tokens').where('user_id', id).first();

        if(!refreshToken){ 
            throw new Error('refresh token inválido')
        }

        const generateToken = new GenerateToken();
        const jwt = generateToken.execute(refreshToken.user_id);

        return {jwt};
    }
}


export default ValidateRefreshToken;