import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';
import ValidateRefreshToken from "../provider/ValidateRefreshToken";


async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {

    try{     
        const authorizationHeader = req.headers['authorization'];
        const refreshToken_id = req.headers['refresh_token'];

        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais nao informadas');
        }
        
        const [authenticationType, token] = authorizationHeader.split(' ');
        
        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de authenticação inválido');
        }
        
        const secretKey:string = process.env.SECRETKEY!;
       
        JWT.verify(token, secretKey, async function(err, decoded) {
            if (err) {  // Manage different errors here (Expired, untrusted...)
                const validateRefreshToken = new ValidateRefreshToken();
                const newTokens = await validateRefreshToken.execute(refreshToken_id)
                
                return res.json(newTokens)               
            }
            req.auth = decoded // If no error, token info is returned in 'decoded'
            next()
        }); 

    }catch(error){
        throw new ForbiddenError('Erro ao buscar o usuário', error);
    }
}


export default bearerAuthenticationMiddleware;